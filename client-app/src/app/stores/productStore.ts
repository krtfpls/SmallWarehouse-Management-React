import { makeAutoObservable, reaction, runInAction } from "mobx";
import agentAxios from "../api/agentAxios";
import { IProducts } from "../models/Products";
import { configure } from "mobx";
import * as Yup from 'yup';
import { Pagination, PagingParams } from "../models/pagination";

configure({
    enforceActions: "never",
})

export default class ProductStore {
    ProductRegistry = new Map<string, IProducts>();
    selectedProduct: IProducts = {
            id: '',
            name: '',
            serialNumber: '',
            quantity: 1,
            priceNetto: 1,
            minLimit: 1,
            description: '',
            category: '',
    };

    editMode= false;
    loading = false;
    loadingInitial = true;
    pagination: Pagination | null = null;
    pagingParam = new PagingParams();
    predicate = new Map().set('all', true);

validationSchema = Yup.object({
        name: Yup.string().required('Nazwa jest wymagana, max 50 znaków').max(50, 'Maksymalnie 50 znaków'),
        quantity: Yup.number().positive('Tylko dodatnie!').integer().required('Ilość jest wymagana')
        .when(
             'serialNumber', {
                is: (serial:string) => serial != null,
                then: Yup.number().min(1).max(1, 'Jeżeli podano numer seryjny ilość może wynosić tylko 1').required(),
                otherwise: Yup.number().min(1).max(10000, 'Maksymalna ilość: 10000').required(),
            }
        ),
        serialNumber: Yup.string().max(50 ,'Maksymalnie 50 znaków').nullable(),
        priceNetto: Yup.number().positive().nullable().max(50000,  'Maksymalna kwota: 50000'),
        minLimit: Yup.number().positive().nullable().max(1000, 'Maksymalna wartość: 1000'),
        description: Yup.string().nullable().max(300,  'Maksymalnie 300 znaków'),
        category: Yup.string().required()
    });

    constructor() {
        makeAutoObservable(this)

        reaction(
            () => this.predicate.keys(),
            () => {
                this.pagingParam = new PagingParams();
                this.ProductRegistry.clear();
                this.loadProducts();
            }
        )
    }
    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParam.pageNumber.toString());
        params.append('pageSize', this.pagingParam.pageSize.toString());

        this.predicate.forEach((value, key) => {
                params.append(key, value);
        })

        return params;
    }
    
    setPagingParams = (pagingParam: PagingParams) => {
        this.pagingParam= pagingParam;
    }

    get getProducts() {
        
        return Array.from(this.ProductRegistry.values());
    }

    get getValidationSchema(){
        return this.validationSchema;
    }

    setPredicate = (predicate: string, value: string ) => {
        const resetPredicate=()=> {
            this.predicate.clear();
        }
             switch (predicate) {
            case 'all':
                resetPredicate();
                this.predicate.set('all', true);
                break;
            case 'categoryName':
                resetPredicate();
                this.predicate.set('categoryName', value)
                break;
    }
}

    loadProducts = async () => {
        this.loadingInitial= true;
        try {
            const result= await agentAxios.Products.list(this.axiosParams);
            result.data.forEach(element => {
                this.setProduct(element);
            });
            this.setPagination(result.pagination);
        } catch (error){
            console.log(error);

        } finally {
            this.setLoadingInitial(false);
        }
    }

    setPagination = (pagination: Pagination) => {
        this.pagination= pagination;
    }

    loadProduct = async (id: string) => {
        let item = this.getProduct(id);
        if (item) {
            this.selectedProduct=item;
            return item;
        } else {
            this.loadingInitial=true;
            try {
                item= await agentAxios.Products.details(id);
                this.selectedProduct=item;
                return item;
            } catch (error){
                console.log(error);
            } finally {
                this.setLoadingInitial(false);
            }
        }
    }

    private setProduct = (item: IProducts) => {
        this.ProductRegistry.set(item.id, item);
    }

    private getProduct = (id: string) => {
        return this.ProductRegistry.get(id);
    }

    setLoadingInitial= (state:boolean) =>{
        this.loadingInitial=state;
    }

    createProduct = async ( item: IProducts) => {
        this.loading= true;
        try{
            await agentAxios.Products.create(item);
            runInAction(() => {
                this.ProductRegistry.set(item.id, item);
                this.selectedProduct=item;
                this.editMode = false;
            })
        }
        catch (error){
            console.log(error);
        }
        finally {
                this.loading= false;
        }
    }

    updateProduct = async (item: IProducts) =>{
        this.loading=true;
        try {
            await agentAxios.Products.update(item);
            runInAction(() => {
              this.ProductRegistry.set(item.id, item);
              this.selectedProduct= item;
              this.editMode= false;
            })
        }
        catch (error){
            console.log(error);
        }
        finally {
            this.loading= false;
        }
    }

    deleteProduct = async (id: string) => {
        this.loading = true;
        try{
            await agentAxios.Products.delete(id);
            runInAction(() => {
                this.ProductRegistry.delete(id);
            })
        }
        catch (error){
            console.log(error);
        }
        finally{
            this.loading=false;
        }
    }

    clearSelectedItem =async () => {
        this.selectedProduct= {
            id: '',
            name: '',
            serialNumber: '',
            quantity: 1,
            priceNetto: 1,
            minLimit: 1,
            description: '',
            category: '',
    };
    }

    setSelectedProduct =async (item:IProducts) => {
        this.selectedProduct= item;
    }

    clearAllProductStore= () =>{
        this.clearSelectedItem();
        this.ProductRegistry.clear();
    }
}