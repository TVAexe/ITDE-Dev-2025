import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function Notifications() {
    const token = AsyncStorage.getItem('token');
    return (
        <View>
            <Text>Notifications</Text>
        </View>
    )
}
