import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileCard from '@/components/ProfileCard';


const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tài khoản</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Profile Card */}
        <TouchableOpacity style={styles.profileCard}>
          <Image
            source={require('@/assets/images/adaptive-icon.png')}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Ninh Hải Nam</Text>
            <Text style={styles.studentId}>26A4041649</Text>
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
            href="/(authorized)/account/StudentInfo"
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
            href="/(authorized)/account/StudentInfo"
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