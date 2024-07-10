import InputText from "@/components/ui/InputText";
import { CompositeScreenProps } from "@react-navigation/native";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CategoryFilter from "@/components/screens/journals/CategoryFilter";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { store, useAppSelector } from "@/store/store";
import { useEffect, useMemo, useState } from "react";
import { fetchJournals } from "@/store/journalSlice";
import JournalsFlatList from "@/components/screens/journals/JournalsFlatList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  DrawerNavigatorParamList,
  StackNavigatorParamList,
} from "@/types/navigation";
import ThemeColors from "@/constants/ThemeColors";
import Loading from "@/components/ui/Loading";
import SearchInput from "@/components/ui/SearchInput";

type Props = CompositeScreenProps<
  DrawerScreenProps<DrawerNavigatorParamList, "ListJournals">,
  NativeStackScreenProps<StackNavigatorParamList>
>;

export type ListJournalsNavigationProp = Props["navigation"];

export default function ListJournals({ navigation }: Props) {
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
        <SearchInput value={query} onChange={setQuery} />
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

      {journalsStatus === "pending" && <Loading size={"large"} />}
      <JournalsFlatList journals={journalsFiltered} navigation={navigation} />
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
});
