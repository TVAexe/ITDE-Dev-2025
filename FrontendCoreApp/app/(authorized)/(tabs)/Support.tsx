import { useAppSelector } from "@/store/hooks";
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from "react-native";

export default function CTSVSupport() {
    const user = useAppSelector((state) => state.user);


    const handleEmailPress = () => {
        const email = "hotronguoihoc@hvnh.edu.vn";
        const subject = "Liên hệ phòng CTSV";
        const body = `Kính gửi phòng Công tác sinh viên,\n\nTôi là ${user.name} - MSSV: ${user.studentId},\nEm muốn hỏi về vấn đề...`;
        const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        Linking.openURL(mailtoUrl).catch(() => {
            Alert.alert("Lỗi", "Không thể mở ứng dụng email.");
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Thông báo</Text>
            </View>

            <Text style={styles.description}>
                Nếu bạn cần hỗ trợ về học vụ, hoạt động sinh viên, hay các vấn đề liên quan đến nhà trường, vui lòng liên hệ phòng Công tác sinh viên.
            </Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📨 Gửi Email đến phòng CTSV</Text>
                <TouchableOpacity style={styles.button} onPress={handleEmailPress}>
                    <Text style={styles.buttonText}>Gửi Email</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📞 Thông tin liên hệ</Text>
                <Text>Email: hotronguoihoc@hvnh.edu.vn</Text>
                <Text>Điện thoại: (028) 1234 5678</Text>
                <Text>Giờ làm việc: Thứ 2 - Thứ 6, từ 8h00 đến 17h00</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
    header: {
        backgroundColor: '#007398',
        padding: 16,
        alignItems: 'center',
    },
        headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#2c3e50",
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        color: "#34495e",
        paddingVertical : 15,
        paddingHorizontal : 20
    },
    section: {
        marginBottom: 30,
        paddingHorizontal : 20
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#27ae60",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignSelf: "flex-start",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    footer: {
        paddingTop: 20,
        borderTopWidth: 1,
        borderColor: "#ccc",
    },
});
