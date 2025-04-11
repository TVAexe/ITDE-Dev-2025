import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { 
    useCheckinEventMutation, 
    useGetCheckinCountQuery, 
    useGetEventByIdQuery, 
    useGetRegisteredEventsQuery, 
    useRegisterEventMutation,
    useCheckoutEventMutation
} from "@/services";
import { formatTime } from "@/utils/formatDate";
import { ActivityIndicator, Button } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import { useAppSelector } from "@/store/hooks";


export default function EventDetails() {
    const { id } = useLocalSearchParams();
    const { data: event, isLoading: isLoadingEvent } = useGetEventByIdQuery({eventId : id});
    const studentId = useAppSelector((state) => state.user.studentId)

    const [registerEvent, { isLoading: isRegistering }] = useRegisterEventMutation();
    const [checkinEvent, { isLoading: isChecking }] = useCheckinEventMutation();
    const [checkoutEvent, { isLoading: isCheckingOut }] = useCheckoutEventMutation();


    const { data: registeredEvents, isLoading: isLoadingRegisteredEvents, refetch: refetchRegisteredEvents } = useGetRegisteredEventsQuery({studentId}, {
        skip: !studentId,
    });

    

    const registeredEventIds = new Set(registeredEvents?.data.map((e: any) => e.id));
    const isRegistered = registeredEventIds.has(id);

    const { data: checkinData, isFetching: isLoadingCheckin, refetch } = useGetCheckinCountQuery(
        { studentId: studentId || "", eventId: id as string },
        { skip: !studentId || !isRegistered }
    );

    const checkinCnt = checkinData?.data.checkinCount ?? 0;

    const handleRegister = async () => {
        if (!studentId) return;
        await registerEvent({ studentId, eventId: id as string }).unwrap();
        refetchRegisteredEvents();
    };

    const handleCheckinFirstTime = async () => {
        if (!studentId || checkinCnt !== 0) return;
        router.push(`/home/events/camera/${id}`);
        // await checkinEvent({ studentId: userId, eventId: id as string }).unwrap();
        // refetch();
    };

    const handleCheckinSecondTime = async () => {
        if (!studentId || checkinCnt !== 1) return;
        await checkoutEvent({ studentId: studentId, eventId: id as string }).unwrap();
        refetch();
    };

    if (isLoadingEvent || isLoadingRegisteredEvents || isLoadingCheckin) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text>Loading event details...</Text>
            </View>
        );
    }

    if(!event){
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text>Loading event details...</Text>
            </View>
        );
    }

    console.log(event);

    // event description là một html để định dạng tùy ý
    const source = {
        html: event?.data.description
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen options={{ title: "Event Details", headerStyle: { backgroundColor: "#007398" }, headerTintColor: '#fff' }} />

            <Text style={styles.title}>{event?.name}</Text>
            <Text style={styles.description}>{event?.data.description}</Text>
            <Text style={styles.location}>📍 {event?.data.location}</Text>
            <Text style={styles.date}>⏰ {formatTime(event?.data.startTime)} - {formatTime(event?.data.endTime)}</Text>
            <RenderHTML source={source} />


            {!isRegistered && (
                <Button 
                    mode="contained" 
                    onPress={handleRegister} 
                    disabled={isRegistering} 
                    loading={isRegistering} 
                    style={styles.button}
                >
                    Register
                </Button>
            )}

            {isRegistered && checkinCnt === 0 && (
                <Button 
                    mode="contained" 
                    onPress={handleCheckinFirstTime} 
                    disabled={isChecking} 
                    loading={isChecking} 
                    style={styles.button}
                >
                    Check in first time ({formatTime(event.start_time)} - {formatTime(new Date(new Date(event.start_time).getTime() + 15 * 60 * 1000).toISOString())})
                </Button>
            )}

            {isRegistered && checkinCnt === 1 && (
                <Button 
                    mode="contained" 
                    onPress={handleCheckinSecondTime} 
                    disabled={isCheckingOut} 
                    loading={isCheckingOut} 
                    style={styles.button}
                >
                    Check in second time ({formatTime(new Date(new Date(event.start_time).getTime() - 15 * 60 * 1000).toISOString())} - {formatTime(event.start_time)})
                </Button>
            )}

            {isRegistered && checkinCnt === 2 && (
                <Text style={styles.successText}>✅ Check in successfully</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 15,
        color: "#333",
    },
    location: {
        fontSize: 14,
        color: "#555",
        marginBottom: 5,
    },
    date: {
        fontSize: 14,
        marginBottom: 10,
        color: "#333",
    },
    status: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#007AFF",
    },
    button: {
        marginVertical: 10,
    },
    successText: {
        fontSize: 16,
        color: "green",
        textAlign: "center",
        marginTop: 20,
    },
});
