import { rtdb } from "./firebase";
import { ref, get, set, push, remove } from "firebase/database";

export const getCollectionData = async (path: string) => {
    try {
        const dbRef = ref(rtdb, path);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            // If it's an object (RTDB standard for collections), convert to array
            if (typeof data === 'object' && data !== null) {
                return Object.entries(data).map(([id, value]) => ({
                    id,
                    ...(value as object)
                }));
            }
            return data;
        }
        return [];
    } catch (error) {
        console.error(`Error fetching RTDB path ${path}:`, error);
        return [];
    }
};

export const saveData = async (path: string, data: any[]) => {
    try {
        const dbRef = ref(rtdb, path);
        // In RTDB, we can just set the whole path to the new array/object
        // To keep it clean and array-like:
        await set(dbRef, data);
        return true;
    } catch (error) {
        console.error(`Error saving RTDB path ${path}:`, error);
        return false;
    }
};
