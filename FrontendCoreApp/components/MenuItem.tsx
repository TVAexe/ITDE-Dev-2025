import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

interface MenuItemProps {
  semesterId: string;
  title: string;
}

export default function MenuItem({semesterId , title }: MenuItemProps) {
  return (
  <TouchableOpacity style={{ padding: 16, backgroundColor: 'white', borderRadius: 8 }} onPress={() => router.push(`/(authorized)/home/form/${semesterId}`)}>

            <View style={{ padding: 16, backgroundColor: 'white', borderRadius: 8 }}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>{title}</Text>
            </View>
        
    </TouchableOpacity>
    
  );
}
