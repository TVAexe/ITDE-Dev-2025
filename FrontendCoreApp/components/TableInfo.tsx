import { View, Text, StyleSheet } from 'react-native';
import { formatDate } from '@/utils/formatDate';
interface TableInfoProps {
  data?: {
    id?: string;
    name?: string;
    gender?: string;
    address?: string;
    birthDate?: string;
    classId?: string;
    email?: string;
  };
  title?: string;
}

export default function TableInfo({ data = {}, title }: TableInfoProps) {
  
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.row}>
        <Text style={styles.label}>Mã SV</Text>
        <Text style={styles.value}>{data.id || '---'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Họ tên</Text>
        <Text style={styles.value}>{data.name || '---'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Giới tính</Text>
        <Text style={styles.value}>{data.gender == '1' ? 'Nữ' : 'Nam'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Địa chỉ</Text>
        <Text style={styles.value}>{data.address || '---'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Ngày sinh</Text>
        <Text style={styles.value}>{formatDate(data.birthDate || '') || '---'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Mã số lớp</Text>
        <Text style={styles.value}>{data.classId || '---'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{data.email || '---'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

