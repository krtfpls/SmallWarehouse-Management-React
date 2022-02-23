import { useContext } from "react";
import { createContext } from "react";
import CategoryItemStore from "./categoryItemStore";
import CommonStore from "./commonStore";
import ContractorStore from "./ContractorStore";
import DocumentStore from "./documentStore";
import ModalStore from "./modalStore";
import ProductStore from "./productStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";

interface IStore {
    ProductStore: ProductStore,
    categoryItemStore: CategoryItemStore,
    documentStore: DocumentStore,
    contractorStore: ContractorStore,
    commonStore: CommonStore,
    userStore: UserStore,
    modalStore: ModalStore,
    profileStore: ProfileStore
}

export const store: IStore = {
    ProductStore: new ProductStore(),
    categoryItemStore: new CategoryItemStore(),
    documentStore: new DocumentStore(),
    contractorStore: new ContractorStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}