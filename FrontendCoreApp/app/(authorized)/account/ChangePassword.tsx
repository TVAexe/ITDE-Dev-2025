import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PasswordInput from "@/components/PasswordInput";
import PasswordRequirement from "@/components/PasswordRequirement";
import { Stack } from "expo-router";

const ChangePassword: React.FC = () => {
  return (
    <View style={styles.container}>

        <Stack.Screen
        options={{
          headerShown: true,
          title: "Đổi mật khẩu",
          headerStyle: {
            backgroundColor: '#007398'
          },
          headerTintColor: '#fff'
        }}
      />

      <View style={styles.contentWrapper}>
        <View style={styles.headerSection}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.nameText}>Ninh Hải Nam</Text>
        </View>

        <View style={styles.inputSection}>
          <PasswordInput
            label="Mật khẩu mới"
            placeholder="Value"
          />
          <PasswordInput
            label="Nhập lại mật khẩu"
            placeholder="Value"
            isLast={true}
          />
        </View>

        <View style={styles.requirementsSection}>
          <Text style={styles.requirementsTitle}>Yêu cầu mật khẩu</Text>
          <View style={styles.requirementsList}>
            <PasswordRequirement text="Mật khẩu ít nhất có 8 kí tự" />
            <PasswordRequirement text="Mật khẩu có ít nhất 1 chữ hoa" />
            <PasswordRequirement text="Mật khẩu có ít nhất 1 số" />
            <PasswordRequirement text="Mật khẩu ít nhất có 1 kí tự đặc biệt" />
          </View>
        </View>

        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.buttonText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contentWrapper: {
    maxWidth: 390,
    marginLeft: "auto",
    marginRight: "auto",
    paddingHorizontal: 16,
    paddingVertical: 32,
    width: "100%",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 8,
    fontFamily: "Inter",
  },
  nameText: {
    fontSize: 24,
    marginBottom: 32,
    fontFamily: "Inter",
  },
  inputSection: {
    marginBottom: 32,
    padding: 1.5,
  },
  requirementsSection: {
    marginBottom: 32,
  },
  requirementsTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 16,
    fontFamily: "Inter",
  },
  requirementsList: {
    gap: 8,
  },
  confirmButton: {
    width: "100%",
    backgroundColor: "#0EA5E9",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "500",
    fontFamily: "Inter",
  },
});

export default ChangePassword;
