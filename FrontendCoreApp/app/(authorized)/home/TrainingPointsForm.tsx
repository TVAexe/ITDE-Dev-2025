import { Stack } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";

interface Answers {
  [key: number]: number;
}

export default function TrainingPointsForm() {
  const [answers, setAnswers] = useState<Answers>({});

  const questions = [
    {id: 1, question: "Ý thức chấp hành văn bản chỉ đạo ngành, của cơ quan chỉ đạo cấp trên được thực hiện trong HV", type: "number", max: 7},
    {id: 2, question: "Ý thức chấp hành các nội quy, quy chế và các quy định khác được áp dụng trong HV", type: "number", max: 18},
    {id: 3, question: "Ý thức và hiệu quả tham gia các hoạt động rèn luyện về chính trị, xã hội, văn hóa, văn nghệ, thể thao", type: "number", max: 6},
    {id: 4, question: "Tham gia tuyên truyền, phòng chống tội phạm và các tệ nạn xã hội", type: "number", max: 5},
    {id: 5, question: "Ý thức chấp hành và tham gia tuyên truyền các chủ trương của Đảng, chính sách, pháp luật của Nhà nước trong cộng đồng", type: "number", max: 15},
    {id: 6, question: "Ý thức tham gia các hoạt động xã hội có thành tích được ghi nhận, biểu dương, khen thưởng", type: "number", max: 5},
    {id: 7, question: "Có tinh thần chia sẻ, giúp đỡ người thân, người có khó khăn, hoạn nạn", type: "number", max: 5},
    {id: 8, question: "Ý thức, tinh thần, thái độ, uy tín và hiệu quả công việc của người học được phân công quản lý lớp, tổ chức Đảng, Đoàn TN, Hội SV và các tổ chức khác trong HV", type: "number", max: 3},
    {id: 9, question: "Kỹ năng tổ chức, quản lý lớp, quản lý tổ chức Đảng, Đoàn TN, Hội SV và các tổ chức khác trong HV", type: "number", max: 3},
    {id: 10, question: "Người học đạt được các thành tích đặc biệt trong học tập, rèn luyện", type: "number", max: 2},
  ];

  const handleInputChange = (id: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value ? parseInt(value) || 0 : 0, 
    }));
  };

  const handleSubmit = () => {
    let totalScore = 0;
    let isInvalid = false;

    questions.forEach(({ id, max }) => {
      const answer = answers[id];

      if (answer === undefined || answer < 0 || answer > max || isNaN(answer)) {
        isInvalid = true;
      } else {
        totalScore += answer;
      }
    });

    if (isInvalid) {
      console.log("Điểm không hợp lệ"); 
    } else {
      console.log(totalScore);
    }
  };

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
      {questions.map((question) => (
        <View key={question.id} style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 8 }}>
            {question.question}
          </Text>
          {question.type === "number" && (
            <TextInput
              style={{
                height: 44,
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 8,
                paddingHorizontal: 12,
                fontSize: 16,
                backgroundColor: "#fff",
              }}
              keyboardType="numeric"
              placeholder={`Nhập điểm không quá ${question.max}`}
              placeholderTextColor="#999"
              onChangeText={(value) => handleInputChange(question.id, value)}
            />
          )}
        </View>
      ))}

      <TouchableOpacity
        style={{
          backgroundColor: "white",
          padding: 12,
          borderRadius: 8,
          marginTop: 16,
          borderWidth: 1,
          borderColor: "#ddd",
        }}
        onPress={handleSubmit}
      >
        <Text style={{ textAlign: "center" }}>Gửi</Text>
      </TouchableOpacity>
    </ScrollView>
    </View>
    
  );
}
