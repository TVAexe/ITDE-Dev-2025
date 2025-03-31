import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUser = async () => {
    try {
        const user = await AsyncStorage.getItem('userInfo');
        return JSON.parse(user || '{}');
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};

export const setUser = async (user: User) => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
};
