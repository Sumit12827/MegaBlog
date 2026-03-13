import conf from '../conf.js';
import {Client , Account , ID} from "appwrite";


export class Authservice{
    client  = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);

    }

    async createAccount({email , password , name}) {
        try {
            const userAccount = await this.account.create(ID.unique() , email , password , name);
            if(userAccount){
                //calls an another method
                return this.login({email , password});

            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email , password}) {
        try {
            return await this.account.createEmailSession(email,password);
        }catch (error){
            throw error;
        }
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
            console.log("appweite logout error" , error);
        }
    }


   
}

const authService = new AuthService();
export default authService;
