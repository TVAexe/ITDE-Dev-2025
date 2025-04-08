import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Logout() {

    const handleLogout = async () => {
        await AsyncStorage.removeItem('userInfo');
        setTimeout(() => {
            router.replace('/login');
        }, 1000);
    }

    useEffect(() => {
        handleLogout();
    }, []);

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <Text style={styles.text}>Logging out...</Text>
        </View>
    );
}   

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
