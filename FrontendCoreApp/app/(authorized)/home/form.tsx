import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import MenuItem from "@/components/MenuItem";
import { Stack } from "expo-router";
import { useGetTraingingPointsFormQuery } from "@/services/trainingpoints.service";
import LoadingIndicator from "@/components/LoadingIndicator";

export default function HomeForm() {
  const [form, setForm] = useState<any>(null);
  const { data: formData, isLoading } = useGetTraingingPointsFormQuery();

  useEffect(() => {
    if (formData) {
      setForm(formData);
    }
  }, [formData]);

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
      ) : 
      form?.length > 0 ? (
        <ScrollView style={{ padding: 20 }}>
        {form?.map((item: any) => (
          <MenuItem key={item.semester_id} semesterId={item.semester_id} title={`Form tự đánh giá điểm rèn luyện ${item.semester_id}`} />
          ))}
        </ScrollView>
      ) : (
        <View style={{ padding: 20 }}>
          <Text>Không có dữ liệu</Text>
        </View>
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

