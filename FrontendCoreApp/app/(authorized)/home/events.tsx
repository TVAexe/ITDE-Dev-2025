import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Stack } from "expo-router";
import { View, ScrollView, ActivityIndicator, Text, StyleSheet } from "react-native";
import EventInfo from "@/components/EventInfo";
import { useGetEventsQuery, useGetRegisteredEventsQuery } from "@/services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingIndicator from "@/components/LoadingIndicator";
import { getUserId } from "@/utils/getUser";
const Tab = createMaterialTopTabNavigator();

function AllRecords() {
    const { data: eventsData, isLoading } = useGetEventsQuery();
    if (isLoading) return <LoadingIndicator />

    return (
        <ScrollView style={{ flex: 1, padding: 10 }}>
            <EventInfo data={eventsData.data} />
        </ScrollView>
    );
}

function RegisteredRecords() {
    const [studentId, setStudentId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const id = await getUserId();
            setStudentId(id);
        };
        fetchUser();
    }, []);

    const { data: registeredEventsData, refetch: refetchRegisteredEvents, isLoading } = useGetRegisteredEventsQuery(studentId || "", {
        skip: !studentId,
    });
    

    const mappedEvents = registeredEventsData?.data?.map((event: any) => ({
        name: event.name,
        startTime: event.startTime,
        endTime: event.endTime,
        location: event.location,
      }));

    if (isLoading) return <LoadingIndicator />

    return (
        <ScrollView style={{ flex: 1, padding: 10 }}>
            <EventInfo data={mappedEvents} />
        </ScrollView>
    );
}

export default function Events() {
    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen options={{ title: "Sự kiện", headerStyle: { backgroundColor: "#007398" }, headerTintColor: '#fff' }} />
            <Tab.Navigator
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
                    tabBarIndicatorStyle: { backgroundColor: "blue" },
                    tabBarStyle: { backgroundColor: "#e4ecf9" },
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
