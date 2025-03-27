import React from "react";
import { Stack } from "expo-router";
import { View } from "react-native";
import TableInfo from "@/components/TableInfo";
import { useGetEventsQuery } from "@/services";
export default function Events() {
    const { data: eventsData } = useGetEventsQuery();


    return (
        <View>
            <Stack.Screen options={{ title: "Sự kiện" }} />
            <View style={{ padding: 10 }}>
                <TableInfo data={eventsData} />
            </View>
        </View>
    );
}
