import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Stack } from "expo-router";
import { View, ScrollView, ActivityIndicator, Text, StyleSheet } from "react-native";
import EventInfo from "@/components/EventInfo";
import { useGetEventsQuery, useGetRegisteredEventsQuery } from "@/services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingIndicator from "@/components/LoadingIndicator";
const Tab = createMaterialTopTabNavigator();

function AllRecords() {
    const { data: eventsData, isLoading } = useGetEventsQuery();

    if (isLoading) return <LoadingIndicator />

    
    return (
        <ScrollView style={{ flex: 1, padding: 10 }}>
            <EventInfo data={eventsData} />
        </ScrollView>
    );
}

function RegisteredRecords() {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = await AsyncStorage.getItem("userInfo");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUserId(parsedUser?.id || null);
            }
        };
        fetchUser();
    }, []);

    const { data: registeredEventsData, refetch: refetchRegisteredEvents, isLoading } = useGetRegisteredEventsQuery(userId || "", {
        skip: !userId,
    });

    if (isLoading) return <LoadingIndicator />

    return (
        <ScrollView style={{ flex: 1, padding: 10 }}>
            <EventInfo data={registeredEventsData} />
        </ScrollView>
    );
}

export default function Events() {
    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen options={{ title: "Sự kiện" }} />
            <Tab.Navigator
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
                    tabBarIndicatorStyle: { backgroundColor: "blue" },
                }}
            >
                <Tab.Screen name="Tất cả" component={AllRecords} />
                <Tab.Screen name="Đã đăng ký" component={RegisteredRecords} />
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        fontSize: 16,
        color: "#007AFF",
    },
});
