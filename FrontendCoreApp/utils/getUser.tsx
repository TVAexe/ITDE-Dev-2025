import {  useGetUserInfoQuery  } from "@/services";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserId = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if(!userId) {
        console.warn("User ID not found in AsyncStorage");
        return null;
    }
    return userId;
};
