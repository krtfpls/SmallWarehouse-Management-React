import { IContractor } from "./Contractor";
import { IProducts } from "./Products"

export interface IDocuments{
    id: string;  
    name: string;  
    number: string;
    date  : Date | null;
    contractor : IContractor;
    products: IProducts[];
}