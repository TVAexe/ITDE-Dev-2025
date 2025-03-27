import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import MenuItem from "@/components/MenuItem";
import { Stack } from "expo-router";
export default function HomeForm() {
  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Chấm điểm rèn luyện",
          headerStyle: { backgroundColor: "#fff" },
        }}
      />
      <ScrollView style={{ padding: 20 }}>
        <MenuItem title="Điểm rèn luyện học kì I năm học 2024-2025" />
      </ScrollView>
    </View>
    
  );
}
