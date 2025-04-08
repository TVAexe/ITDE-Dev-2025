import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

interface PasswordRequirementProps {
  text: string;
}

export default function PasswordRequirement({ text }: PasswordRequirementProps) {
  return (
    <View style={styles.container}>
      <View style={styles.bullet} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 9999,
    backgroundColor: "#000000",
    marginRight: 8,
  },
  text: {
    fontFamily: "Inter",
    color: "#000000",
  },
});
