import {
  CameraMode,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useRef, useState, useEffect } from "react";
import { Button, Pressable, StyleSheet, Text, View, Alert } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useCheckinEventMutation } from "@/services";
import { getUser } from "@/utils/getUser";
import { router, useLocalSearchParams } from "expo-router";

export default function Camera() {
  const { id } = useLocalSearchParams();
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const ref = useRef<CameraView>(null);
  const [mode, setMode] = useState<CameraMode>("picture");
  const [facing, setFacing] = useState<CameraType>("back");
  const [checkinEvent, {isLoading: isLoadingCheckinEvent}] = useCheckinEventMutation();
  const [userId, setUserId] = useState<string | null>(null);


  useEffect(() => {
    if (!mediaPermission?.granted) {
      requestMediaPermission();
    }
  }, [mediaPermission]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUserId(user.id);
    };
    fetchUser();
  }, []);

  if (!permission) return null;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to use the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }


  const takePicture = async () => {
    if (!ref.current) return;

    try {
      const photo = await ref.current.takePictureAsync({ quality: 1 });

      console.log("Photo taken:", photo?.uri);
      
      if (photo?.uri) {
        await checkinEvent({studentId: userId as string, eventId: id as string, image: photo.uri}).unwrap();
        Alert.alert("Checkin successful");
        router.push(`/home/events/${id}`);
      }
    } catch (error) {
      console.error("Error taking picture:", error);
    }
  };


  const renderCamera = () => (
    <CameraView style={styles.camera} ref={ref} mode={mode} facing={facing}>
      <View style={styles.shutterContainer}>
        <Pressable onPress={takePicture}>
          {({ pressed }) => (
            <View
              style={[
                styles.shutterBtn,
                { opacity: pressed ? 0.5 : 1 },
              ]}
            >
              <View
                style={[
                  styles.shutterBtnInner,
                  { backgroundColor: "white" },
                ]}
              />
            </View>
          )}
        </Pressable>
      </View>
    </CameraView>
  );

  return (
    <View style={styles.container}>
      {renderCamera()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    right: 0, 
    width: "100%",
    alignItems: "center", 
    justifyContent: "center", 
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});

