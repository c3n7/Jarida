import { JournalEntry } from "@/store/journalSlice";
import { FlatList } from "react-native-gesture-handler";
import JournalCard from "./JournalCard";
import { StyleSheet } from "react-native";

export default function JournalsFlatList({
  journals,
}: {
  journals: Array<JournalEntry>;
}) {
  return (
    <FlatList
      data={journals}
      renderItem={(itemData) => (
        <JournalCard journal={itemData.item} style={styles.journalCard} />
      )}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  journalCard: {
    marginBottom: 8,
    marginHorizontal: 8,
  },
  list: {
    marginBottom: 130,
  },
});
