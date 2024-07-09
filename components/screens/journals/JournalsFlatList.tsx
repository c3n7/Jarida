import { JournalEntry } from "@/store/journalSlice";
import { FlatList } from "react-native-gesture-handler";
import JournalCard from "./JournalCard";
import { StyleSheet } from "react-native";
import { ListJournalsNavigationProp } from "@/screens/ListJournals";

export default function JournalsFlatList({
  journals,
  navigation,
}: {
  journals: Array<JournalEntry>;
  navigation: ListJournalsNavigationProp;
}) {
  return (
    <FlatList
      data={journals}
      renderItem={(itemData) => (
        <JournalCard
          journal={itemData.item}
          style={styles.journalCard}
          navigation={navigation}
        />
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
