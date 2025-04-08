import * as React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface PasswordInputProps {
  label: string;
  placeholder: string;
  isLast?: boolean;
}

export default function PasswordInput({
  label,
  placeholder,
  isLast = false,
}: PasswordInputProps) {
  return (
    <View style={[styles.container, isLast ? null : styles.marginBottom]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        secureTextEntry
        placeholder={placeholder}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  marginBottom: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 16,
    fontFamily: "Inter",
  },
  input: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e5e7eb",
    fontFamily: "Inter",
  },
});