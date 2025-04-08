import AuthProvider from "@/providers/AuthProvider";
import {Slot} from "expo-router";
import {ReactNode} from "react";
import { Provider } from 'react-redux';
import { store } from '../store';
import { Stack } from 'expo-router';

export default function RootLayout(): ReactNode {
  return (
    <Provider store={store}>
        <Stack>
          <Stack.Screen name="(authorized)" options={{ headerShown: false }} />
        </Stack>
    </Provider>
  );
}