import { Link } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

interface MenuItemProps {
  title: string;
}

export default function MenuItem({title }: MenuItemProps) {
  return (
    <TouchableOpacity style={{ padding: 16, backgroundColor: 'white', borderRadius: 8 }}>
        <Link href="/(authorized)/home/TrainingPointsForm" asChild>
            <View style={{ padding: 16, backgroundColor: 'white', borderRadius: 8 }}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>{title}</Text>
            </View>
        </Link>
        
    </TouchableOpacity>
    
  );
}
