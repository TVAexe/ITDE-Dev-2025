import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { RNCamera } from "react-native-camera";

const CameraComponent = () => {
  const cameraRef = useRef<RNCamera>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setPhoto(data.uri);
    }
  };

  return (
    <View style={styles.container}>
      {!photo ? (
        <RNCamera
          ref={cameraRef}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
        />
      ) : (
        <Image source={{ uri: photo }} style={styles.preview} />
      )}
      <TouchableOpacity style={styles.capture} onPress={takePicture}>
        <Text style={styles.text}>📸 Chụp ảnh</Text>
      </TouchableOpacity>
      {photo && (
        <TouchableOpacity style={styles.capture} onPress={() => setPhoto(null)}>
          <Text style={styles.text}>🔄 Chụp lại</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  preview: { width: "100%", height: "80%" },
  capture: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  text: { fontSize: 16, fontWeight: "bold" },
});

export default CameraComponent;
