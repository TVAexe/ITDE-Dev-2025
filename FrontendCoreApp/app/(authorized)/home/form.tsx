import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import MenuItem from "@/components/MenuItem";
import { Stack } from "expo-router";
import { useGetTraingingPointsFormQuery } from "@/services/trainingpoints.service";
import LoadingIndicator from "@/components/LoadingIndicator";


export default function HomeForm() {
  const { data: formData, isLoading, isError } = useGetTraingingPointsFormQuery();

  if(isLoading) return <LoadingIndicator />

  if(isError) return <View>Không thể load form</View>
  return (

    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Chấm điểm rèn luyện",
          headerStyle: { backgroundColor: "#007398" },
          headerTintColor: '#fff',
        }}
      />
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
          <MenuItem semesterId={formData.data.semesterId} title={formData.data.title} endTime={formData.data.endTime}></MenuItem>
        </ScrollView>
      )}
  </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#007AFF",
  },
});

