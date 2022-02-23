import { makeAutoObservable, runInAction } from "mobx";
import agentAxios from "../api/agentAxios";
import { Profile } from "../models/profile";

export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile = false;

    constructor() {
        makeAutoObservable(this)
    }
    
   

    loadProfile = async (username: string) => {
        this.loadingProfile=true;
        try{
            const profile = await agentAxios.Profiles.get(username);
                runInAction(() => {
 
                    this.profile= profile;
                    this.loadingProfile=false;
                    
                })
        } catch (error){
            console.log(error);
            runInAction(() => this.loadingProfile=false);
        }
    }
}