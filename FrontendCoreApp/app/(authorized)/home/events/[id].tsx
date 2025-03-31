import { View, Text, Button, ActivityIndicator } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { 
    useCheckinEventMutation, 
    useGetCheckinCountQuery, 
    useGetEventByIdQuery, 
    useGetRegisteredEventsQuery, 
    useRegisterEventMutation 
} from "@/services";
import { getUser } from "@/utils/getUser";
import { useEffect, useState } from "react";
import { formatTime } from "@/utils/formatDate";
export default function EventDetails() {
    const { id } = useLocalSearchParams();
    const { data: event, isLoading: isLoadingEvent } = useGetEventByIdQuery(id as string);
    const [userId, setUserId] = useState<string | null>(null);
    const [registerEvent, { isLoading: isRegistering }] = useRegisterEventMutation();
    const [checkinEvent, { isLoading: isChecking }] = useCheckinEventMutation();

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser();
            setUserId(user.id);
        };
        fetchUser();
    }, []);

    const { data: registeredEvents, isLoading: isLoadingRegisteredEvents, refetch: refetchRegisteredEvents } = useGetRegisteredEventsQuery(userId || "", {
        skip: !userId,
    });

    const registeredEventIds = new Set(registeredEvents?.map((e: any) => e.id));
    const isRegistered = registeredEventIds.has(id);

    const { data: checkinData, isFetching: isLoadingCheckin, refetch } = useGetCheckinCountQuery(
        { studentId: userId || "", eventId: id as string },
        { skip: !userId || !isRegistered } 
    );

    const checkinCnt = checkinData?.checkinCount ?? 0;

    const handleRegister = async () => {
        if (!userId) {
            console.error("No userId found, cannot register!");
            return;
        }
        await registerEvent({ studentId: userId, eventId: id as string }).unwrap();
        refetchRegisteredEvents();
    };

    const handleCheckinFirstTime = async () => {
        if (!userId) {
            console.error("No userId found, cannot check in!");
            return;
        }
        if (checkinCnt === 0) {
            await checkinEvent({ studentId: userId, eventId: id as string }).unwrap();
            refetch(); 
        } else {
            console.log("You have already checked in");
        }
    };

    const handleCheckinSecondTime = async () => {
        if (!userId) {
            console.error("No userId found, cannot check in!");
            return;
        }
        if (checkinCnt === 1) {
            await checkinEvent({ studentId: userId, eventId: id as string }).unwrap();
            refetch(); 
        } else {
            console.log("You have already checked in twice");
        }
    };

    if (isLoadingEvent || isLoadingRegisteredEvents || isLoadingCheckin) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text>Loading event details...</Text>
            </View>
        );
    }

    return (
        <View>
            <Stack.Screen options={{ title: "Event Details" }} />
            <Text>{event?.name}</Text>
            <Text>{event?.description}</Text>
            <Text>{event?.location}</Text>
            <Text>{event?.start_time}</Text>
            <Text>{event?.end_time}</Text>
            <Text>{event?.status}</Text>

            {!isRegistered && (
                <Button title="Register" onPress={handleRegister} disabled={isRegistering} />
            )}
            {isRegistered && checkinCnt === 0 && (
                <Button title={`Check in first time (${formatTime(event.start_time)} - ${formatTime(new Date(new Date(event.start_time).getTime() + 15 * 60 * 1000).toISOString())})`} onPress={handleCheckinFirstTime} disabled={isChecking} />
            )}
            {isRegistered && checkinCnt === 1 && (
                <Button title={`Check in second time (${formatTime(new Date(new Date(event.start_time).getTime() - 15 * 60 * 1000).toISOString())} - ${formatTime(event.start_time)})`} onPress={handleCheckinSecondTime} disabled={isChecking} />
            )}
            {isRegistered && checkinCnt === 2 && <Text>Check in successfully</Text>}
        </View>
    );
}
