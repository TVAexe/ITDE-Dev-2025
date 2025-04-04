import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileCard from '@/components/ProfileCard';
import { getUser } from '@/utils/getUser';


const ProfileScreen = () => {

  const [studentName, setStudentName] = useState<string | null>(null);
  const [studentId, setStudentId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setStudentName(user.name);  
      setStudentId(user.id);
    };
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tài khoản</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.profileCard}>
          <Image
            source={require('@/assets/images/adaptive-icon.png')}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{studentName}</Text>
            <Text style={styles.studentId}>{studentId}</Text>
          </View>
        </TouchableOpacity>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <ProfileCard 
            icon={<Ionicons name="person-outline" size={22} color="#dc2626" />}
            title="Thông tin tài khoản"
            href="/(authorized)/account/StudentInfo"
          />
          <ProfileCard 
            icon={<Ionicons name="key-outline" size={22} color="#dc2626" />}
            title="Đổi mật khẩu"
            href="/(authorized)/account/ChangePassword"
          />
          <ProfileCard 
            icon={<Ionicons name="school-outline" size={22} color="#dc2626" />}
            title="Sinh viên cần biết"
            href="/(authorized)/account/FAQ"
          />
          <ProfileCard 
            icon={<Ionicons name="chatbox-outline" size={22} color="#dc2626" />}
            title="Góp ý"
            href="/(authorized)/account/StudentInfo"
          />
          <ProfileCard 
            icon={<Ionicons name="warning-outline" size={22} color="#dc2626" />}
            title="Báo lỗi"
            href="/(authorized)/account/StudentInfo"
          />
          <ProfileCard 
            icon={<Ionicons name="log-out-outline" size={22} color="#dc2626" />}
            title="Đăng xuất"
            warning={true}
            href="/(authorized)/account/logout"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#dc2626',
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  studentId: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default ProfileScreen;