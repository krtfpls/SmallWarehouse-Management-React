import { makeAutoObservable, runInAction } from "mobx";
//import { setTimeout } from "timers";
import { history } from "../..";
import agentAxios from "../api/agentAxios";
import { EmailValues, RegisterValues, User, UserFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;
    refreshTokenTimeout: any;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user= await agentAxios.Account.login(creds);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
            this.user=user;
            runInAction(() => this.user= user);
            history.push('/Products');
            store.modalStore.closeModal();
        } catch (error){
            throw error;
        }
    }

    logout= () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user=null;
        history.push("/");
    }

    getUser = async() => {
        try {
            const user = await agentAxios.Account.current();
            store.commonStore.setToken(user.token);
            runInAction(() => this.user=user);
            this.startRefreshTokenTimer(user);
        } catch (error) {
            console.log(error);
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            await agentAxios.Account.register(creds);
           runInAction(() => {
            store.modalStore.closeModal();
            history.push(`/account/registerSuccess?email=${creds.email}`);
           }
           )
        } catch (error){
            throw error;
        }
    }

    
    forgotPassword = async (email: string) => {
        const values: EmailValues= {token: '', email: email};
        try{
           await agentAxios.Account.forgotPassword(values)
           runInAction(() => {
            store.modalStore.closeModal();
            history.push(`/account/PasswordSuccess?email=${email}`);
           })
           
        } catch (error){
            throw error;
        }
    }

    resetPassword = async (postValues: EmailValues, password: string) => {
        const values: RegisterValues= {token: postValues.token, email: postValues.email, password: password};
        try{
           await agentAxios.Account.resetPassword(values)
           runInAction(() => {
            store.modalStore.closeModal();
            history.push(`/account/PasswordSuccess?email=${postValues.email}`);
           })
           
        } catch (error){
            throw error;
        }
    }

    refreshToken = async() => {
        this.stopRefreshTokenTimer();
        try {
            const user = await agentAxios.Account.refreshToken();
            runInAction(() => this.user = user);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
        } catch (error){
            console.log(error);
        }
    }

    private startRefreshTokenTimer(user: User){
        const jwtToken = JSON.parse(atob(user.token.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (10 * 1000);
        this.refreshTokenTimeout = window.setTimeout(this.refreshToken, timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}