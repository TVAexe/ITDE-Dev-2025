import {useAuthSession} from "@/providers/AuthProvider";
import {ReactNode, useState} from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Stack, router } from 'expo-router';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slices/userSlice';
import apiSlice from '@/services/api';
import { useLoginMutation } from '@/services';
export default function LoginScreen(): ReactNode {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  
  const [loginMutation] = useLoginMutation();

const handleLogin = async () => {
  if (!studentId || !password) {
    Alert.alert('Error', 'Please fill in all fields');
    return;
  }

  setIsLoading(true);
  try {
    const response = await loginMutation({ studentId: studentId, password: password }).unwrap();
    console.log(response);
    dispatch(setUser(response)); 
    router.push('/(authorized)/(tabs)'); 
  } catch (error) {
    Alert.alert('Error', error instanceof Error ? error.message : 'Login failed');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Đăng nhập',
          headerStyle: { backgroundColor: '#fff' },
        }}
      />
      
      <View style={styles.form}>
        <Text style={styles.title}>Chào mừng bạn!</Text>
        <Text style={styles.subtitle}>Đăng nhập để tiếp tục</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mã sinh viên</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập mã sinh viên"
            value={studentId}
            onChangeText={setStudentId}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoComplete="password"
          />
          {/* <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons 
              name={showPassword ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity> */}
        </View>
        
        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#dc2626',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    marginTop: 16,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#dc2626',
    fontSize: 14,
  },
});