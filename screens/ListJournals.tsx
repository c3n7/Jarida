import JournalCard from "@/components/screens/journals/JournalCard";
import InputText from "@/components/ui/InputText";
import { ParamListBase } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CategoryFilter from "@/components/screens/journals/CategoryFilter";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { store, useAppSelector } from "@/store/store";
import { useEffect, useMemo, useState } from "react";
import { fetchJournals } from "@/store/journalSlice";
import JournalsFlatList from "@/components/screens/journals/JournalsFlatList";

type Props = DrawerScreenProps<ParamListBase, "ListJournals">;

export default function ListJournals({}: Props) {
  const token = useAppSelector((state) => state.auth.token!);
  const journals = useAppSelector((state) => state.journals.journals);
  const journalsStatus = useAppSelector(
    (state) => state.journals.journalsStatus
  );

  useEffect(() => {
    if (["loading", "fulfilled"].includes(journalsStatus)) {
      return;
    }

    store.dispatch(fetchJournals({ token }));
  }, [token]);

  const [query, setQuery] = useState<string>("");
  const journalsFiltered = useMemo(
    () =>
      journals.filter((journal) =>
        query ? journal.title.toLowerCase().includes(query.toLowerCase()) : true
      ),
    [query, journals]
  );

  return (
    <View>
      <View style={styles.input}>
        <InputText
          placeholder="Type to search..."
          leftSection={({ color }) => (
            <Ionicons name="search" size={19} color={color} />
          )}
          containerStyle={styles.searchInput}
          value={query}
          onChange={setQuery}
        />
      </View>
      <View style={styles.filterBadges}>
        <CategoryFilter style={styles.badge} checked>
          Reflections
        </CategoryFilter>
        <CategoryFilter style={styles.badge}>Introspections</CategoryFilter>
        <CategoryFilter style={styles.badge}>Meditations</CategoryFilter>
        <CategoryFilter style={styles.badge}>Mantras</CategoryFilter>
        <CategoryFilter style={styles.badge}>Ideas</CategoryFilter>
      </View>

      <JournalsFlatList journals={journalsFiltered} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 8,
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  filterBadges: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 8,
  },
  badge: {
    marginRight: 8,
    marginBottom: 8,
  },
  searchInput: {
    borderRadius: 18,
  },
});
