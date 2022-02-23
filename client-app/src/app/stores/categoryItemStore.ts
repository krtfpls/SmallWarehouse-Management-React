import { makeAutoObservable } from "mobx";
import { DropdownItemProps, DropdownProps } from "semantic-ui-react";
import agentAxios from "../api/agentAxios";
import { ICategoryItems } from "../models/CategoryItems";

export default class CategoryItemStore {
    categoryItemRegistry = new Map<string, ICategoryItems>();
    loadingCategory = true;
    categoryLoading=false;

    constructor() {
        makeAutoObservable(this)
    }

    get CategoryItems() {
        return Array.from(this.categoryItemRegistry.values());
    }

    get getCategoryOptions(){

            const list = this.CategoryItems.map((item) => {
              return (
                ({
                    'key': item.id,
                    'text': item.name,
                    'value': item.name,
                })
              )
            })
            return list;
    }

    loadCategoryItems = async () => {
        try {
            this.categoryLoading=true;
            const category= await agentAxios.CategoryItems.list();
            category.forEach(element => {
                this.categoryItemRegistry.set(element.id, element);
            });
        } catch (error){
            console.log(error);
            

        } finally {
            this.setLoadingInitial(false);
            this.categoryLoading=false;
        }
    }

    selectCategoryItem= async (id:string) => {
        let item = this.getCategoryItem(id);
            if (item) {
                return item
            }
            else{
                try{
                    item= await agentAxios.CategoryItems.details(id);
                    return item;
                } catch (error){
                    console.log(error);
                }
            }
    }
    getCategoryItem= (id:string) => {
        return this.categoryItemRegistry.get(id);
    }
    setLoadingInitial= (state:boolean) =>{
        this.loadingCategory=state;
    }

    
}