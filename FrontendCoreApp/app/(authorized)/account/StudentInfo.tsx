import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { Link, Stack } from "expo-router";
import TableInfo from "@/components/TableInfo";
import { getUser } from "@/utils/getUser";
import { useEffect, useState } from "react";

export default function StudentInfo() {
    const [user, setUser] = useState(null);
    

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser();
            setUser(user);
        };
        fetchUser();
    }, []);

    if (!user) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Đang tải thông tin sinh viên...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen options={{ title: 'Thông tin sinh viên' }} />
            
            <View style={styles.card}>
                <Text style={styles.title}>Thông tin sinh viên</Text>
                <TableInfo data={user} />
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Đăng ký sinh trắc học</Text>
                <TouchableOpacity style={styles.button}>
                    <Link href="/(authorized)/account/registFace" style={styles.buttonText}>Đăng ký</Link>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#F8F9FA",
        alignItems: "center",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#555",
    },
    card: {
        width: "100%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    section: {
        marginTop: 20,
        width: "100%",
        alignItems: "center",
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#007AFF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});
