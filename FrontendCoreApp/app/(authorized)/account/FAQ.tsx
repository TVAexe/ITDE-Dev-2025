import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Stack } from "expo-router";

const FAQ_DATA = [
  { id: "1", question: "What is Viral Pitch?", answer: "Viral Pitch is a platform for influencers and brands." },
  { id: "2", question: "How to apply for a campaign?", answer: "Go to the campaign page and click 'Apply'." },
  { id: "3", question: "How to know status of a campaign?", answer: "Check the 'My Campaigns' section for updates." },
  { id: "4", question: "How to know status of a campaign?", answer: "Check the 'My Campaigns' section for updates." },
  { id: "5", question: "How to apply for a campaign?", answer: "Go to the campaign page and click 'Apply'." },
  { id: "6", question: "How to know status of a campaign?", answer: "Check the 'My Campaigns' section for updates." }
];

const FAQItem = ({ item }: { item: any }) => {
  const [expanded, setExpanded] = useState(false);
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);

  const toggleExpand = () => {
    setExpanded(!expanded);
    height.value = withTiming(expanded ? 0 : 60, { duration: 300 });
    opacity.value = withTiming(expanded ? 0 : 1, { duration: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: opacity.value,
  }));

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.questionContainer} onPress={toggleExpand}>
        <Text style={styles.questionText}>{item.question}</Text>
        <AntDesign name={expanded ? "minus" : "plus"} size={18} color="black" />
      </TouchableOpacity>
      <Animated.View style={[styles.answerContainer, animatedStyle]}>
        <Text style={styles.answerText}>{item.answer}</Text>
      </Animated.View>
    </View>
  );
};

export default function FAQ() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "FAQ", headerStyle: { backgroundColor: "#007398" }, headerTintColor: '#fff' }} />
      <Text style={styles.title}>FAQ</Text>
      <FlatList
        data={FAQ_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FAQItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e4ecf9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "500",
  },
  answerContainer: {
    overflow: "hidden",
  },
  answerText: {
    fontSize: 14,
    color: "#555",
    paddingVertical: 5,
  },
});
