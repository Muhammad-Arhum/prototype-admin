import { rtdb } from "./firebase";
import { ref, get, set, push, remove } from "firebase/database";

export const generateId = (count: number) => {
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `${randomStr}${count}`;
};

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

        // If items have IDs, save as an object keyed by those IDs
        if (data.length > 0 && data[0].id) {
            const dataToSet = data.reduce((acc, item) => {
                const { id, ...rest } = item;
                acc[id] = rest;
                return acc;
            }, {} as any);
            await set(dbRef, dataToSet);
        } else {
            // Fallback for simple arrays
            await set(dbRef, data);
        }
        return true;
    } catch (error) {
        console.error(`Error saving RTDB path ${path}:`, error);
        return false;
    }
};

export const getItemData = async (path: string, id: string) => {
    try {
        const dbRef = ref(rtdb, `${path}/${id}`);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            return { id, ...snapshot.val() };
        }
        return null;
    } catch (error) {
        console.error(`Error fetching item ${path}/${id}:`, error);
        return null;
    }
};
