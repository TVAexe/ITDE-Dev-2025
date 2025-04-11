import { View, Text, StyleSheet } from 'react-native';

interface ScoreInfoProps {
  data?: Record<string, any>;
  title?: string;
}

export default function ScoreInfo({ data = {}, title }: ScoreInfoProps) {
  const fieldsToDisplay = ['event_score', 'club_score', 'nckh_score', 'self_score', 'academic_score', 'totalScore'];
  
  const fieldLabels: Record<string, string> = {
    event_score: 'Điểm sự kiện',
    club_score: 'Điểm CLB',
    nckh_score: 'Điểm NCKH',
    self_score: 'Điểm tự chấm',
    academic_score: 'Điểm học tập',
    totalScore: 'Tổng điểm',
  };

  const filteredEntries = Object.entries(data || {}).filter(([key]) => fieldsToDisplay.includes(key));

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      {filteredEntries.length > 0 ? (
        filteredEntries.map(([key, value]) => (
          <View key={key} style={styles.row}>
            <Text style={styles.label}>{fieldLabels[key] || key}</Text>
            <Text style={styles.value}>{String(value)}</Text>
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
  eventCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  eventDetails: {
    gap: 4,
  },
  eventDetail: {
    fontSize: 14,
    color: '#666',
  },
});
