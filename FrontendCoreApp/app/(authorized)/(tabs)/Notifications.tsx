import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to generate random notifications
const generateRandomNotifications = () => {
  const notifications = [
    "You have a new message from John",
    "Your password has been updated successfully",
    "New comment on your post",
    "Your account has been logged in from a new device",
    "You have a new friend request",
    "Your order #12345 is on its way",
    "Reminder: Meeting at 3 PM today",
    "Your profile picture has been updated",
    "You have 3 unread notifications",
    "A new version of the app is available for update",
  ];

  const randomNumber = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
  const randomNotifications = [];

  for (let i = 0; i < randomNumber; i++) {
    const randomIndex = Math.floor(Math.random() * notifications.length);
    randomNotifications.push(notifications[randomIndex]);
  }

  return randomNotifications;
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const fetchToken = async () => {

      const randomNotifications = generateRandomNotifications();
      setNotifications(randomNotifications);
    };

    fetchToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.notificationCard}>
            <Text style={styles.notification}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  notificationCard: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  notification: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
});
