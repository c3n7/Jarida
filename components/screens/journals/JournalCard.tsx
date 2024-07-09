import ThemeColors from "@/constants/ThemeColors";
import { JournalEntry } from "@/store/journalSlice";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { ListJournalsNavigationProp } from "@/screens/ListJournals";

export default function JournalCard({
  journal,
  style,
  navigation,
}: {
  journal: JournalEntry;
  style?: StyleProp<ViewStyle>;
  navigation: ListJournalsNavigationProp;
}) {
  return (
    <Pressable
      style={[styles.container, style]}
      onPress={() => navigation.navigate("ShowJournal", { journal })}
    >
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
    </Pressable>
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
