import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // hoặc bạn có thể đổi icon lib tùy ý

interface Props {
  semester_id : string,
  title: string;
  end_time : string
}

const FormInfoCard: React.FC<Props> = ({ title, end_time }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.deadlineContainer}>
        <FontAwesome name="calendar" size={16} color="#555" style={styles.icon} />
        <Text style={styles.deadlineText}>{end_time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  deadlineContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 6,
  },
  deadlineText: {
    fontSize: 14,
    color: "#666",
  },
});

export default FormInfoCard;
