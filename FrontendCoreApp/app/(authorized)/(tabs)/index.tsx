import { useGetUserInfoQuery } from '@/services';
import { useAppSelector } from '@/store/hooks';
import { getUserId } from '@/utils/getUser';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const name = useAppSelector((state) => state.user.name)


  const menuItems = [
    { icon: '📝', title: 'Chấm điểm rèn luyện', href: '../home/form' as const },
    { icon: '📊', title: 'Kết quả rèn luyện', href: '../home/analyst' as const },
    { icon: '🎯', title: 'Sự kiện', href: '../home/events' as const },
    
  ]




  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Chào {name}</Text>
            <Text style={styles.subGreeting}>Chúc bạn một ngày tốt lành!</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Hành chính - Ngoại khóa</Text>
          <View style={styles.menuGrid}>
            {menuItems.map((item, index) => (
              <Link href={item.href} key={index} style={styles.menuItem} asChild>
                <TouchableOpacity key={index} style={styles.menuItem}>
                  <Text style={styles.menuIcon}>{item.icon}</Text>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
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
    padding: 20,
    backgroundColor: '#007398',
    color: '#fff'
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subGreeting: {
    fontSize: 16,
    color: '#fff',
    marginTop: 4,
  },
  eventsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  eventContent: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  eventTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: '#666',
  },
  menuSection: {
    padding: 20,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  careerTitle: {
    marginTop: 24,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '32%',
    backgroundColor: '#c1e0ea',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  menuIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  menuItemText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export default HomeScreen;