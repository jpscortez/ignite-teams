import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupGetAll } from "./groupGetAll";

export async function groupCreate(newGroup: string) {

    try {
        const storedGroups = await groupGetAll();

        const grouoAlreadyExists = storedGroups.includes(newGroup);

        if (grouoAlreadyExists) {
            throw new AppError('Já existe um grupo com esse nome.');
        }

        const stroage = JSON.stringify([...storedGroups,newGroup]);
        await AsyncStorage.setItem(GROUP_COLLECTION, stroage);

    } catch (error) {
        throw error;
    }
}