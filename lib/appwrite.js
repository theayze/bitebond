import { Account, Client, ID } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.fyp.bitebond',
    projectId: '666190b6000d516078cd',
    databaseId: '6661ba4c00026c31860a',
    userCollectionId: '6661baab00273144ede3',
    postsCollectionId: '6661bb8100382da78543',
    storageId: '6661e6b5000b4762ca16',
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
    ;

const account = new Account(client);

export const createUser = () => {
    // Register User
    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
        .then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        });
}
