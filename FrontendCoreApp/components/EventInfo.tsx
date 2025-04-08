import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { formatDateToWeekday, formatDateShort, formatTime } from "@/utils/formatDate";
interface Event {
  eventId: string;
  name: string;
  startTime: string;
  endTime: string;
  location: string;
}

interface EventInfoProps {
  data?: Event[];
}

export default function EventInfo({ data = [] }: EventInfoProps) {
  console.log(data);
  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        data.map((item, index) => {
          const eventDate = new Date(item.startTime);
          const weekday = formatDateToWeekday(eventDate.toISOString());

          return (
            <View key={index} style={styles.card}>
              <TouchableOpacity onPress={() => router.push(`/home/events/${item.eventId}`)}> 
                <View style={styles.row}>
                  <View style={styles.leftColumn}>
                    <Text style={styles.dayLabel}>{weekday}</Text>
                    <Text style={styles.date}>{formatDateShort(item.startTime)}</Text>
                  </View>
                  <View style={styles.rightColumn}>
                    <Text style={styles.eventTitle}>{item.name}</Text>
                    <View style={styles.infoRow}>
                      <FontAwesome name="map-marker" size={14} color="#666" />
                      <Text style={styles.detail}>{item.location}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <FontAwesome name="calendar" size={14} color="#666" />
                      <Text style={styles.detail}>
                        {formatTime(item.startTime)} - {formatTime(item.endTime)}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        })
      ) : (
        <Text style={styles.emptyText}>Không có dữ liệu</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: "#c1e0ea",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftColumn: {
    alignItems: "center",
    justifyContent: "center",
    width: 60, 
    marginRight: 12,
  },
  rightColumn: {
    flex: 1, 
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e74c3c",
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
  },
});
