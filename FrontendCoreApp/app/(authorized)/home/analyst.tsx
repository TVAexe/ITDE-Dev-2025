import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import TableInfo from "@/components/TableInfo";
import { useGetTrainingPointsQuery } from "@/services/trainingpoints.service";
import { useGetSemesterByStudentIdQuery } from "@/services/semester.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { skipToken } from "@reduxjs/toolkit/query";
import { Dropdown } from "react-native-element-dropdown";
import ScoreInfo from "@/components/ScoreInfo";
import LoadingIndicator from "@/components/LoadingIndicator";

export default function Analyst() {
    const [user, setUser] = useState<{ id: string } | null>(null);
    const [semesterId, setSemesterId] = useState<string | null>(null);
    

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await AsyncStorage.getItem("userInfo");
            if (userData) {
                setUser(JSON.parse(userData));
            }
        };
        fetchUser();
    }, []);

    const { data: semesterData, isLoading: isSemesterLoading } = useGetSemesterByStudentIdQuery(
        user?.id ? user.id : skipToken
    );

    const semesterOptions = semesterData
        ? semesterData.map((semester: any) => ({
              label: semester.name, 
              value: semester.id,
          }))
        : [];

    useEffect(() => {
        if (!semesterId && semesterOptions.length > 0) {
            setSemesterId(semesterOptions[0].value);
        }
    }, [semesterOptions]);


    const { data: trainingPointsData, isLoading } = useGetTrainingPointsQuery(
        user?.id && semesterId ? { studentId: user.id, semesterId } : skipToken
    );

    if (!user) return <Text>Đang tải thông tin sinh viên...</Text>;

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Kết quả rèn luyện" }} />

            {isSemesterLoading ? (
                <LoadingIndicator />
            ) : (
                <Dropdown
                    style={styles.dropdown}
                    labelField="label"
                    valueField="value"
                    value={semesterId}
                    onChange={(item) => setSemesterId(item.value)}
                    data={semesterOptions}
                />
            )}

            {isLoading ? (
                <LoadingIndicator />
            ) : trainingPointsData && trainingPointsData.length > 0 ? (
                <>
                    <ScoreInfo data={trainingPointsData[0].scores} title="Điểm chi tiết" />
                </>
            ) : (
                <Text>Không có dữ liệu điểm rèn luyện</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 10,
    },
});
