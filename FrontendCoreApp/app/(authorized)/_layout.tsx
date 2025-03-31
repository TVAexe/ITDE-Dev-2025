import {useAuthSession} from "@/providers/AuthProvider";
import {Redirect, Stack} from 'expo-router';
import {Text} from 'react-native';
import {ReactNode} from "react";
import { useAppSelector } from "@/store/hooks";


export default function RootLayout(): ReactNode {

  // if (!user.token) {
  //   return <Redirect href="/login" />;
  // }

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}