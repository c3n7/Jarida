import JournalCard from "@/components/screens/journals/JournalCard";
import InputText from "@/components/ui/InputText";
import { ParamListBase } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CategoryFilter from "@/components/screens/journals/CategoryFilter";
import { DrawerScreenProps } from "@react-navigation/drawer";

type Props = DrawerScreenProps<ParamListBase, "ListJournals">;

export default function ListJournals({}: Props) {
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

      <JournalCard style={styles.journalCard} />
      <JournalCard style={styles.journalCard} />
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
  journalCard: {
    marginBottom: 8,
  },
});
