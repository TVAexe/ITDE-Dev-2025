import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import MenuItem from "@/components/MenuItem";
import { Stack } from "expo-router";
import { useGetTraingingPointsFormQuery } from "@/services/trainingpoints.service";
export default function HomeForm() {
  const [form, setForm] = useState<any>(null);
  const { data: formData, isLoading: isLoadingForm } = useGetTraingingPointsFormQuery();


  useEffect(() => {
    if (formData) {
      setForm(formData);
    }
  }, [formData]);

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
        {form?.map((item: any) => (
          <MenuItem key={item.semester_id} semesterId={item.semester_id} title={`Form tự đánh giá điểm rèn luyện ${item.semester_id}`} />
        ))}
      </ScrollView>
    </View>
    
  );
}
