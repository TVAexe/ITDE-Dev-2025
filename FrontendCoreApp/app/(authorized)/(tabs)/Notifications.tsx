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
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Thông báo</Text>
            </View>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.notificationCard}>
            <Text style={styles.notification}>{item}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#007398',
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  notificationCard: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  notification: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginLeft: 20,
    marginRight: 20,
  },
});
