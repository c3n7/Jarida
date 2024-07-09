import JournalCard from "@/components/screens/journals/JournalCard";
import InputText from "@/components/ui/InputText";
import { ParamListBase } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CategoryFilter from "@/components/screens/journals/CategoryFilter";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { store, useAppSelector } from "@/store/store";
import { useEffect } from "react";
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

  return (
    <View style={styles.screen}>
      <View style={styles.input}>
        <InputText
          placeholder="Type to search..."
          leftSection={({ color }) => (
            <Ionicons name="search" size={19} color={color} />
          )}
          containerStyle={styles.searchInput}
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

      <JournalsFlatList journals={journals} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 8,
  },
  input: {
    marginBottom: 8,
  },
  filterBadges: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  badge: {
    marginRight: 8,
    marginBottom: 8,
  },
  searchInput: {
    borderRadius: 18,
  },
});
