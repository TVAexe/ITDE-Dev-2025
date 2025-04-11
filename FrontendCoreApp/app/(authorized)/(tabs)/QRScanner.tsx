import { View } from "react-native";
import * as Location from 'expo-location';

const getLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission to access location was denied');
    return;
  }

  const location = await Location.getCurrentPositionAsync({});
  console.log("Latitude:", location.coords.latitude);
  console.log("Longitude:", location.coords.longitude);
};


export default function QRScanner() {
    getLocation();

    return <View></View>;
} 
