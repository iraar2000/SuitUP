import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";

export const useLoadSaveJsonData = () => {
    const useSaveJson = useCallback(()=>{async (dataName, data) => {
        try{
            await AsyncStorage.setItem(dataName, JSON.stringify(data));
        } catch (error) {
            console.log("LOG: failed to save userData with error: ", error)
        };
    }}, [])

    const useLoadJson = useCallback(()=>{async (dataName) => {
        try {
            const jsonValue = await AsyncStorage.getItem(dataName);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (error) {
            console.log("LOG: failed to load userData with error: ", error)
        };
    }}, [])
    
    return ({useSaveJson, useLoadJson})
}