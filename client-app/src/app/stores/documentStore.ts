import { makeAutoObservable, reaction, runInAction } from "mobx";
import agentAxios from "../api/agentAxios";
import { IDocuments } from "../models/Documents";
import { configure } from "mobx";
import { IProducts } from "../models/Products";
import format from "date-fns/format";
import { Pagination, PagingParams } from "../models/pagination";
import pl from "date-fns/locale/pl";
import { endOfDay } from "date-fns";

configure({
    enforceActions: "never"
})

export default class DocumentStore {
    documentsRegistry = new Map<string, IDocuments>();
    selectedDocument: IDocuments = {
        id: '',
        name: '',
        number: '',
        date: null,
        contractor: {
            id: '',
            name: '',
            info: '',
            street: '',
            streetNumber: '',
            city: '',
            taxNumber: ''
        },
        products: []
    }

    documentItems = new Map<string, IProducts>();
    documentLoadingInitial = true;
    loading = false;
    editMode = false;
    pagination: Pagination | null = null;
    pagingParam = new PagingParams();
    predicate = new Map().set('all', true);

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.predicate.keys(),
            () => {
                this.pagingParam = new PagingParams();
                this.documentsRegistry.clear();
                this.loadAllDocuments();
            }
        )
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParam.pageNumber.toString());
        params.append('pageSize', this.pagingParam.pageSize.toString());

        this.predicate.forEach((value, key) => {
            if (key === 'FromDate' || key === 'ToDate'){
                params.append(key, (value as Date).toISOString());
            } else {
                params.append(key, value);
            }
        })
        return params;
    }

    setPagination = (pagination: Pagination) => {
        this.pagination= pagination;
    }
    
    setPagingParams = (pagingParam: PagingParams) => {
        this.pagingParam= pagingParam;
    }

    setPredicate = (predicate: string, value: string | Date ) => {
        const resetPredicate = () => {
            this.predicate.forEach((value, key) => {
                if (key !== 'FromDate' || key !== 'ToDate') this.predicate.delete(key);
            } )
        }
        switch (predicate) {
            case 'all':
                resetPredicate();
                this.predicate.set('all', true);
                break;
            case 'PZ':
                resetPredicate();
                this.predicate.set('isIncome', true)
                break;
            case 'WZ':
                resetPredicate();
                this.predicate.set('isIncome', false)
                break;
            case 'contractorID':
                resetPredicate();
                this.predicate.set('ContractorID', value)
                break;
            case 'FromDate':
                this.predicate.delete('FromDate');
                this.predicate.set('FromDate', value)
                break;
            case 'ToDate':
                this.predicate.delete('ToDate');
                this.predicate.set('ToDate', value)
        }
    }

    get allDocuments() {
        return Array.from(this.documentsRegistry.values())
    }

    private getDocument = (id: string) => {
        return this.documentsRegistry.get(id);
    }

   get documentsByDate() {
       return Array.from(this.documentsRegistry.values()).sort(
            (a, b) => b.date!.getTime() - a.date!.getTime());
        }

    get groupedDocuments() {
        return Object.entries(
            this.documentsByDate.reduce((docs, doc) => {
            const date = format(doc.date!, 'dd MMM yyyy', {locale: pl});
            docs[date] = docs[date] ? [...docs[date], doc] : [doc];
            return docs;
        }, {} as { [key: string]: IDocuments[]}));
    }

    private setDocument = (document: IDocuments) => {
        document.date= new Date(document.date!);
        this.documentsRegistry.set(document.id, document);
    }

    createDocument = async (_document: IDocuments) => {
        this.loading = true;
        try {
            _document.date= endOfDay(_document.date!); 
            switch (_document.name){
                case 'PZ':
                    await agentAxios.Documents.createInDoc(_document);
                    break;
                case 'WZ':
                    await agentAxios.Documents.createOutDoc(_document);
                    break;
            }
            
            runInAction(() => {
               // this.documentsRegistry.set(_document.id, _document);
                this.clearSelectedDocument();
                this.clearDocumentItems();
                this.documentsRegistry.clear();
                this.editMode = false;
            })
        }
        catch (error) {
            console.log(error);
        }
        finally {
            this.loading = false;
        }
    }

    loadAllDocuments = async () => {
        this.documentLoadingInitial = true;
        this.clearAll();
        try {
            const result= await agentAxios.Documents.list(this.axiosParams);
            result.data.forEach(element => {
                this.setDocument(element);
            });
            this.setPagination(result.pagination);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            this.loading = false;
            this.documentLoadingInitial = false;
        }
    }

    loadDocumentById = async (id: string) => {
        let doc = this.getDocument(id);
        if (doc) {
            this.selectedDocument = doc;
            return doc;
        }
        else {
            this.documentLoadingInitial = true;
            try {
                const doc = await agentAxios.Documents.details(id);
                this.setDocument(doc);
                this.selectedDocument = doc;
                return doc;

            }
            catch (error) {
                console.log(error);
            }
            finally {
                this.setLoadingInitial(false);
            }
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.documentLoadingInitial = state;
    }

    clearSelectedDocument = () => {
        this.selectedDocument = {
            id: '',
            name: '',
            number: '',
            date: null,
            contractor: {
                id: '',
                name: '',
                info: '',
                street: '',
                streetNumber: '',
                city: '',
                taxNumber: ''
            },
            products: []
        }
    }

    setSelectedDocument = (item: IDocuments) => {
        this.selectedDocument = item;
    }

    clearDocumentItems = () => {
        this.documentItems.clear();
    }

    addDocumentItems = (item: IProducts) => {
        this.documentItems.set(item.id, item);
    }
    removeDoumentItems = (id: string) => {
        this.documentItems.delete(id);
    }

    getDocumentItem = (id: string) => {
        return this.documentItems.get(id);
    }

    clearAll = () => {
        this.clearDocumentItems();
        this.clearSelectedDocument();
        this.documentsRegistry.clear();
    }

    get getAllDocumentItems() {
        return Array.from(this.documentItems.values());
    }

}

