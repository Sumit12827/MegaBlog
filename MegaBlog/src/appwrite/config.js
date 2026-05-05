import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

/**
 * Service class for managing blog posts and file uploads using Appwrite.
 */
export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        if (conf.appWriteUrl && conf.appWriteProjectId) {
            this.client
                .setEndpoint(conf.appWriteUrl)
                .setProject(conf.appWriteProjectId);
        } else {
            console.error("Appwrite Service: Endpoint or Project ID is missing in configuration.");
        }
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    /**
     * Create a new blog post document.
     * @param {Object} params - Post data.
     * @returns {Promise<Object>} - The created post document.
     */
    async createPost({ title, slug, content, featuredImage, status, userID }) {
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
            );
        } catch (error) {
            console.error("Appwrite service :: createPost :: error", error);
            throw error;
        }
    }

    /**
     * Update an existing blog post document.
     * @param {string} slug - The document ID (slug).
     * @param {Object} params - Updated post data.
     * @returns {Promise<Object>} - The updated post document.
     */
    async updatePost(slug, { title, content, featuredImage, status }) {
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
            );
        } catch (error) {
            console.error("Appwrite service :: updatePost :: error", error);
            throw error;
        }
    }

    /**
     * Delete a blog post document.
     * @param {string} slug - The document ID (slug).
     * @returns {Promise<boolean>} - True on success.
     */
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.error("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    /**
     * Retrieve a single blog post by its slug.
     * @param {string} slug - The document ID (slug).
     * @returns {Promise<Object|boolean>} - The post document or false on failure.
     */
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            );
        } catch (error) {
            console.error("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    /**
     * List multiple blog posts based on queries.
     * @param {Array} queries - Appwrite Query array.
     * @returns {Promise<Object|boolean>} - Object containing documents list or false.
     */
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries
            );
        } catch (error) {
            console.error("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    // --- File Management ---

    /**
     * Upload a file to the Appwrite bucket.
     * @param {File} file - The file object to upload.
     * @returns {Promise<Object|boolean>} - The uploaded file object or false.
     */
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    /**
     * Delete a file from the Appwrite bucket.
     * @param {string} fileId - The file ID to delete.
     * @returns {Promise<boolean>} - True on success.
     */
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.error("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    /**
     * Get a preview URL for a file.
     * @param {string} fileId - The file ID.
     * @returns {string} - The file preview URL.
     */
    getFilePreview(fileId) {
        if (!fileId) return "";
        try {
            return this.bucket.getFilePreview(
                conf.appWriteBucketId,
                fileId
            );
        } catch (error) {
            console.error("Appwrite service :: getFilePreview :: error", error);
            return "";
        }
    }
}

const service = new Service();
export default service;







