import { View, Text, StyleSheet } from "react-native";

import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const ProfileCard = ({ icon, title, color = '#dc2626', warning = false, href }: { icon: any, title: any, color?: string, warning?: boolean, href?: string }) => (
  
    <TouchableOpacity style={styles.profileCard} onPress={() => router.push(href)}>
      <View style={styles.profileCardLeft}>
        <View style={[styles.iconContainer, warning && styles.warningIcon]}>
          {icon}
        </View>
        <Text style={[styles.profileCardText, warning && styles.warningText]}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    profileCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
      justifyContent: 'space-between',
    },
    profileCardLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    profileCardText: {
      fontSize: 16,
      color: '#333',
    },
    warningText: {
      color: '#dc2626',
    },
    warningIcon: {
      backgroundColor: 'rgba(220, 38, 38, 0.1)',
      borderRadius: 16,
    },
  });

export default ProfileCard;

