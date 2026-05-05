/**
 * Configuration for Appwrite services.
 * Ensures all required environment variables are present and provides fallback values.
 */

const getEnv = (key) => {
    const value = import.meta.env[key];
    if (value === undefined || value === null) {
        console.warn(`Environment variable ${key} is missing. Please check your .env file.`);
        return '';
    }
    return String(value);
};

const conf = {
    appWriteUrl: getEnv('VITE_APPWRITE_URL'),
    appWriteProjectId: getEnv('VITE_APPWRITE_PROJECT_ID'),
    appWriteDatabaseId: getEnv('VITE_APPWRITE_DATABASE_ID'),
    appWriteCollectionId: getEnv('VITE_APPWRITE_COLLECTION_ID'),
    appWriteBucketId: getEnv('VITE_APPWRITE_BUCKET_ID'),
};

export default conf;