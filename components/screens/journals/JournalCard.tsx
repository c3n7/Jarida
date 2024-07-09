import ThemeColors from "@/constants/ThemeColors";
import { JournalEntry } from "@/store/journalSlice";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

export default function JournalCard({
  journal,
  style,
}: {
  journal: JournalEntry;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{journal.title}</Text>
      <Text style={styles.date}>
        {new Date(journal.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </Text>
      <View>
        <Text style={styles.content}>
          {journal.content.substring(0, 300)}
          {journal.content.length > 300 && "..."}
        </Text>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryBadge}>Reflections</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeColors.base100,
    padding: 12,
    elevation: 4,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    color: ThemeColors.gray600,
    marginBottom: 6,
  },
  content: {
    textAlign: "justify",
  },
  categoryContainer: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: ThemeColors.primary200,
    color: ThemeColors.baseContent,
    borderRadius: 120,
  },
});
