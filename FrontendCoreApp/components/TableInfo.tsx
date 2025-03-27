import { View, Text, StyleSheet } from 'react-native';

interface TableInfoProps {
  data?: Record<string, any>;
  title?: string;
}

export default function TableInfo({ data = {}, title }: TableInfoProps) {
  const entries = Object.entries(data || {});

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      {entries.length > 0 ? (
        entries.map(([key, value]) => (
          <View key={key} style={styles.row}>
            <Text style={styles.label}>{key}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>Không có dữ liệu</Text>
      )}
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
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
});