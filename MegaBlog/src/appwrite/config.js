import conf from '../conf/conf.js';
import {Client , ID , Databases , Storage , Query} from "appwrite";

export class Services{
    client = new Client();
    databases;
    bucket;
    constructor(){
        if (conf.appWriteUrl && conf.appWriteProjectId) {
            this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        }
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title , slug , content , featuredImage , status , userID}){
        try {
           return await this.databases.createDocument(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userID,
            }
           )
        } catch (error) {
            console.log("appwrite create post error" , error);
            throw error;
        }
    }

    async updatePost (slug, {title  , content , featuredImage , status}){

        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("appwrite update post error" , error);
            throw error;
        }
    }

    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("appwrite delete post error" , error);       
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("appwrite get post error" , error);  
            return false;     
        }
    }

    async getPosts(queries = [Query.equal("status" , "active")]){
        try {
           return await this.databases.listDocuments(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            queries,
            

           ) 
        } catch (error) {
            console.log("appwrite get posts error" , error);  
            return false;     
        }

    }

    //upload file services
    async uploadFile(file){
        try {
            const fileUploaded = await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
            return fileUploaded;
        } catch (error) {
            console.log("appwrite upload file error" , error);  
            return false;     
        }
    }

    async deleteFile(fileId){
        try{
             return await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
             )
        } catch (error){
            console.log("appwrite delete file error" , error);
             return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appWriteBucketId,
            fileId
        )
    }
}

const services = new Services();
export default services;





