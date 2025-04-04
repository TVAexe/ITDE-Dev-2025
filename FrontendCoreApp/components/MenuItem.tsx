import { router } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface MenuItemProps {
  semesterId: string;
  title: string;
}

export default function MenuItem({ semesterId, title }: MenuItemProps) {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={() => router.push(`/(authorized)/home/form/${semesterId}`)}
      activeOpacity={0.8}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>Deadline: {semesterId}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
    marginHorizontal: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  innerContainer: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  text: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
