import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import TableInfo from "@/components/TableInfo";
export default function StudentInfo() {
    const studentData = {
        "Tên": "Nguyễn Văn A",
        "MSSV": "20120123",
        "Lớp": "20CTT1",
        "Ngành": "Computer Science",
        "Khoa": "Khoa Công nghệ thông tin",
        "Email": "20120123@student.hcmus.edu.vn",
        "SĐT": "0123456789",
        "Địa chỉ": "227 Nguyễn Văn Cừ, District 5, Ho Chi Minh City"
    }
    return (
        <View>
            <Stack.Screen options={{ title: 'Thông tin sinh viên' }} />
            <TableInfo data={studentData} />
        </View>
    )
}
