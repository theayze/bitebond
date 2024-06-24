import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.fyp.bitebond',
    projectId: '666190b6000d516078cd',
    databaseId: '6661ba4c00026c31860a',
    userCollectionId: '6661baab00273144ede3',
    businessCollectionId: '6679433b00326211ed15',
    postsCollectionId: '6661bb8100382da78543',
    storageId: '6661e6b5000b4762ca16',
};

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    businessCollectionId,
    postsCollectionId,
    storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username, role) => {
    try {
        // Register the user account
        const newAccount = await account.create(ID.unique(), email, password, username);

        if (!newAccount) throw new Error('Account creation failed');

        // Generate avatar URL
        const avatarUrl = avatars.getInitials(username);

        // Sign in to get session
        await signIn(email, password);

        // Determine the collection ID based on the role
        const collectionId = role === 'business' ? businessCollectionId : userCollectionId;

        // Create the user document in the appropriate collection
        const newUser = await databases.createDocument(
            databaseId,
            collectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
                role: role
            }
        );

        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error(error.message);
    }
};

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.error('Error signing in:', error);
        throw new Error(error.message);
    }
};

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw new Error('No current account found');

        // Check both collections for the current user
        const userDocuments = await Promise.all([
            databases.listDocuments(databaseId, userCollectionId, [Query.equal('accountId', currentAccount.$id)]),
            databases.listDocuments(databaseId, businessCollectionId, [Query.equal('accountId', currentAccount.$id)]),
        ]);

        // Find the first document that exists in either collection
        const currentUser = userDocuments
            .map(response => response.documents)
            .flat()
            .find(doc => doc);

        if (!currentUser) throw new Error('No current user found');

        return currentUser;
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw new Error(error.message);
    }
};

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(databaseId, postsCollectionId, [Query.orderDesc('$createdAt')]);
        return posts.documents;
    } catch (error) {
        console.error('Error fetching all posts:', error);
        throw new Error(error.message);
    }
};

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            postsCollectionId,
            [Query.orderDesc('$createdAt'), Query.limit(7)]
        );
        return posts.documents;
    } catch (error) {
        console.error('Error fetching latest posts:', error);
        throw new Error(error.message);
    }
};

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(databaseId, postsCollectionId, [Query.search('title', query)]);
        return posts.documents;
    } catch (error) {
        console.error('Error searching posts:', error);
        throw new Error(error.message);
    }
};

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(databaseId, postsCollectionId, [Query.equal('actor', userId)]);
        return posts.documents;
    } catch (error) {
        console.error('Error fetching user posts:', error);
        throw new Error(error.message);
    }
};

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) {
        console.error('Error signing out:', error);
        throw new Error(error.message);
    }
};

export const getFilePreview = async (fileId, type) => {
    try {
        let fileUrl;
        if (type === 'video') {
            fileUrl = storage.getFileView(storageId, fileId);
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100);
        } else {
            throw new Error('Invalid file type');
        }

        if (!fileUrl) throw new Error('Failed to get file preview');

        return fileUrl;
    } catch (error) {
        console.error('Error getting file preview:', error);
        throw new Error(error.message);
    }
};

export const uploadFile = async (file, type) => {
    if (!file) return;

    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri,
    };

    try {
        const uploadedFile = await storage.createFile(storageId, ID.unique(), asset);

        const fileUrl = await getFilePreview(uploadedFile.$id, type);

        return fileUrl;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error(error.message);
    }
};

export const createPost = async (form) => {
    try {
        const [thumbnailUrl, postUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.post, 'video'),
        ]);

        const newPost = await databases.createDocument(
            databaseId,
            postsCollectionId,
            ID.unique(),
            {
                title: form.title,
                prompt: form.prompt,
                thumbnail: thumbnailUrl,
                post: postUrl,
                actor: form.userId,
            }
        );

        return newPost;
    } catch (error) {
        console.error('Error creating post:', error);
        throw new Error(error.message);
    }
};
