import { router, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 65,
          paddingBottom: 8,
          borderTopWidth: 0,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarIconStyle: { marginBottom: -5 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name="home" size={24} color={focused ? 'red' : 'gray'} />
          ),
          tabBarActiveTintColor: 'red',
        }}
      />
      <Tabs.Screen
        name="Notifications"
        options={{
          tabBarLabel: "Thông báo",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name="notifications" size={24} color={focused ? 'red' : 'gray'} />
          ),
          tabBarActiveTintColor: 'red',
        }}
      />
      <Tabs.Screen
        name="QRScanner"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused, color }) => (
            <View style={{
              width: 55,
              height: 55,
              backgroundColor: 'red',
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}>
              <Ionicons name="qr-code" size={26} color="white" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Support"
        options={{
          tabBarLabel: "Hỗ trợ",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name="help-circle" size={24} color={focused ? 'red' : 'gray'} />
          ),
          tabBarActiveTintColor: 'red',
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          tabBarLabel: "Tài khoản",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name="person" size={24} color={focused ? 'red' : 'gray'} />
          ),
          tabBarActiveTintColor: 'red',
        }}
      />
    </Tabs>
  );
}
