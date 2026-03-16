import conf from '../conf/conf.js';
import {Client , Account , ID} from "appwrite";


export class Authservice{
    client  = new Client();
    account;

    constructor(){
        if (conf.appWriteUrl && conf.appWriteProjectId) {
            this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        }
        this.account = new Account(this.client);

    }

    async createAccount({email , password , name}) {
        const userAccount = await this.account.create(ID.unique() , email , password , name);
        if(userAccount){
            //calls an another method
            return this.login({email , password});

        } else {
            return userAccount;
        }
    }

    async login({email , password}) {
        return await this.account.createSession(email,password);
    }

    async getCurrentUser() {
        try {
            return await this.account.get();

        } catch (error) {
            console.log("appweite get current user error" , error);
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions("current");
        } catch (error) {
            console.log("appwrite logout error" , error);
        }
    }


   
}

const authService = new Authservice();
export default authService;
