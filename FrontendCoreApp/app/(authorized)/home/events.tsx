import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Stack } from "expo-router";
import { View, ScrollView, ActivityIndicator, Text, StyleSheet } from "react-native";
import EventInfo from "@/components/EventInfo";
import { useGetEventsQuery, useGetRegisteredEventsQuery, userApiSlice } from "@/services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingIndicator from "@/components/LoadingIndicator";
import { getUserId } from "@/utils/getUser";
import { useAppSelector } from "@/store/hooks";
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
    const studentId = useAppSelector((state) => state.user?.studentId);
    const {data: registeredEventsData,isLoading} = useGetRegisteredEventsQuery({studentId}, {skip: !studentId});


    if (isLoading) return <LoadingIndicator />;

    return (
        <ScrollView style={{ flex: 1, padding: 10 }}>
            <EventInfo data={registeredEventsData.data} />
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
