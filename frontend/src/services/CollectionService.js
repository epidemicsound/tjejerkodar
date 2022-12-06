import { BASE_URL } from '../player.config';
import fetcher from './fetcher';

// Get all collections:
export const getAllCollections = async () => {
    const userToken = localStorage.getItem('userToken');
    try {
        const data = await fetcher(`${BASE_URL}/collections`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }, 3);
        return data;
    } catch (error) {
        console.log("There's an error in getAllCollections", error);
        return error;
    }
}

// Get collection by id:
export const getOneCollection = async (collectionId) => {
    // HOLD UP!
    // you hit a 🤘 {flag!} 🤘
    // TODO: Log into the developer portal with credentials and
    // change replace the existing playlist ("Collection") with a new one
    // in the "Collection Library".
    // Refresh the page and see your new tracks appear!
    const userToken = localStorage.getItem('userToken');
    try {
        const data = await fetcher(BASE_URL+"/collections/"+collectionId, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }, 3);
        return data;
    } catch (error) {
        console.log("There's an error in getOneCollection", error);
        return error;
    }
}
