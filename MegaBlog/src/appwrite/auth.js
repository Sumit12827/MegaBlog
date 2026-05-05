import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

/**
 * AuthService handles all authentication related operations using Appwrite.
 */
export class AuthService {
    client = new Client();
    account;

    constructor() {
        if (conf.appWriteUrl && conf.appWriteProjectId) {
            this.client
                .setEndpoint(conf.appWriteUrl)
                .setProject(conf.appWriteProjectId);
        } else {
            console.error("AuthService: Appwrite endpoint or project ID is missing in configuration.");
        }
        this.account = new Account(this.client);
    }

    /**
     * Create a new user account and log them in automatically.
     * @param {Object} params - The account details.
     * @param {string} params.email - User email.
     * @param {string} params.password - User password.
     * @param {string} params.name - User name.
     * @returns {Promise<Object|null>} - The session object or null on failure.
     */
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            }
            return userAccount;
        } catch (error) {
            console.error("AuthService :: createAccount :: error", error);
            throw error;
        }
    }

    /**
     * Log in an existing user.
     * @param {Object} params - The login details.
     * @param {string} params.email - User email.
     * @param {string} params.password - User password.
     * @returns {Promise<Object>} - The session object.
     */
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("AuthService :: login :: error", error);
            throw error;
        }
    }

    /**
     * Get the currently logged-in user details.
     * @returns {Promise<Object|null>} - The user object or null if not logged in.
     */
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // This is often not a "hard" error but just indicates no active session
            console.log("AuthService :: getCurrentUser :: no active session", error.message);
        }
        return null;
    }

    /**
     * Log out the current user by deleting their session.
     * @returns {Promise<void>}
     */
    async logout() {
        try {
            await this.account.deleteSession("current");
        } catch (error) {
            console.error("AuthService :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;

