import { makeAutoObservable, runInAction } from "mobx";
import agentAxios from "../api/agentAxios";
import { configure } from "mobx";
import { IContractor } from "../models/Contractor";

configure({
    enforceActions: "never",
})

export default class ContractorStore {
    contractorRegistry = new Map<string, IContractor>();
    selectedContractor: IContractor ={
        id: '',
        name: '',
        info: '',
        street: '',
        streetNumber: '',
        city: '',
        taxNumber: ''};
        
        
    editMode= false;
    loadingContractor = false;
    contractorLoadingInitial = true;
    contractorListModal=false;
    contractorFormModal= false;
    

    constructor() {
        makeAutoObservable(this)
    }
    
    setSelectedContractor=(element:IContractor)=>{
        this.selectedContractor=element;
    }
    
    get getContractors() {
        return Array.from(this.contractorRegistry.values());
    }

    setConstractorListModal= (state:boolean) => {
        this.contractorListModal=state;
    }

    setConstractorFormModal= (state:boolean) => {
        this.contractorFormModal=state;
    }

    loadAllContractors = async () => {
        this.contractorLoadingInitial= true;
        try {
            const items= await agentAxios.Contractors.list();
            items.forEach(element => {
                this.setContractor(element);
            });
        } catch (error){
            console.log(error);

        } finally {
            this.setLoadingContractors(false);
        }
    }

    loadContractor = async (id: string) => {
        let item = this.getContractor(id);
        if (item) {
            this.selectedContractor=item;
            return item;
        } else {
            this.contractorLoadingInitial=true;
            try {
                item= await agentAxios.Contractors.details(id);
                this.selectedContractor=item;
                return item;
            } catch (error){
                console.log(error);
            } finally {
                this.setLoadingContractors(false);
            }
        }
    }

    private setContractor = (item: IContractor) => {
        this.contractorRegistry.set(item.id, item);
    }

    private getContractor = (id: string) => {
        return this.contractorRegistry.get(id);
    }

    setLoadingContractors= (state:boolean) =>{
        this.contractorLoadingInitial=state;
    }

    createContractor = async ( item: IContractor) => {
        this.loadingContractor= true;
        try{
            await agentAxios.Contractors.create(item);
            runInAction(() => {
                this.contractorRegistry.set(item.id, item);
                this.selectedContractor=item;
                this.editMode = false;
            })
        }
        catch (error){
            console.log(error);
        }
        finally {
                this.loadingContractor= false;
        }
    }

    updateContractor = async (item: IContractor) =>{
        this.loadingContractor=true;
        try {
            await agentAxios.Contractors.update(item);
            runInAction(() => {
              this.contractorRegistry.set(item.id, item);
              this.selectedContractor= item;
              this.editMode= false;
            })
        }
        catch (error){
            console.log(error);
        }
        finally {
            this.loadingContractor= false;
        }
    }

    deleteContractor = async (id: string) => {
        this.loadingContractor = true;
        try{
            await agentAxios.Contractors.delete(id);
            runInAction(() => {
                this.contractorRegistry.delete(id);
            })
        }
        catch (error){
            console.log(error);
        }
        finally{
            this.loadingContractor=false;
        }
    }

    clearSelectedContractor = () => {
        this.selectedContractor={
                id: '',
                name: '',
                info: '',
                street: '',
                streetNumber: '',
                city: '',
                taxNumber: ''
        }
    }

    setOptionContractor = () => {

    }
}