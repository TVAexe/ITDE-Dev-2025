import React from "react";
import { Stack } from "expo-router";
import { View } from "react-native";
import TableInfo from "@/components/TableInfo";
import { useGetTrainingPointsQuery } from "@/services";
import { useAppSelector } from "@/store/hooks";
export default function Analyst() {
    const user = useAppSelector((state) => state.user);

    const { data: trainingPointsData } = useGetTrainingPointsQuery({ studentId: user.studentId || "" });


    return (
        <View>
            <Stack.Screen options={{ title: "Kết quả rèn luyện" }} />
            <View style={{ padding: 10 }}>
                <TableInfo data={trainingPointsData} />
            </View>
        </View>
    );
}
