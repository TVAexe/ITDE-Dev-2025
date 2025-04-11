import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileCard from '@/components/ProfileCard';
import { useAppSelector } from '@/store/hooks';

const ProfileScreen = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tài khoản</Text>
      </View>

      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.profileCard}>
        <Image
          source={user.avatar ? { uri: user.avatar } : require('@/assets/images/icon.png')}
          style={styles.avatar}
        />

          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.studentId}>{user.studentId}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.menuSection}>
          <ProfileCard 
            icon={<Ionicons name="person-outline" size={22} style={styles.iconStyle} />}
            title="Thông tin tài khoản"
            href="/(authorized)/account/StudentInfo"
          />
          <ProfileCard 
            icon={<Ionicons name="key-outline" size={22} style={styles.iconStyle} />}
            title="Đổi mật khẩu"
            href="/(authorized)/account/ChangePassword"
          />
          <ProfileCard 
            icon={<Ionicons name="school-outline" size={22} style={styles.iconStyle} />}
            title="Sinh viên cần biết"
            href="/(authorized)/account/FAQ"
          />
          <ProfileCard 
            icon={<Ionicons name="chatbox-outline" size={22} style={styles.iconStyle} />}
            title="Góp ý"
            href="/(authorized)/account/StudentInfo"
          />
          <ProfileCard 
            icon={<Ionicons name="warning-outline" size={22} style={styles.iconStyleWarning} />}
            title="Báo lỗi"
            href="/(authorized)/account/StudentInfo"
            warning={true}
          />
          <ProfileCard 
            icon={<Ionicons name="log-out-outline" size={22} style={styles.iconStyleWarning}/>}
            title="Đăng xuất"
            href="/(authorized)/account/logout"
            warning={true}
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
    backgroundColor: '#007398',
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
  iconStyle: {
    color: '#000', 
  },
  iconStyleWarning :{
    color: '#ff0000'
  }
});

export default ProfileScreen;
