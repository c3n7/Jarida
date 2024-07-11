import { CompositeScreenProps } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import CategoryFilter from "@/components/screens/journals/CategoryFilter";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { store, useAppSelector } from "@/store/store";
import { useEffect, useMemo, useState } from "react";
import { Category, fetchCategories, fetchJournals } from "@/store/journalSlice";
import JournalsFlatList from "@/components/screens/journals/JournalsFlatList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  DrawerNavigatorParamList,
  StackNavigatorParamList,
} from "@/types/navigation";
import Loading from "@/components/ui/Loading";
import SearchInput from "@/components/ui/SearchInput";

interface CategorySelection {
  category: Category;
  checked: boolean;
}

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
  const categories = useAppSelector((state) => state.journals.categories);
  const categoriesStatus = useAppSelector(
    (state) => state.journals.categoriesStatus
  );

  const isLoading = useMemo<boolean>(
    () => journalsStatus === "pending" || categoriesStatus === "pending",
    [journalsStatus, categoriesStatus]
  );

  useEffect(() => {
    if (["loading", "fulfilled"].includes(journalsStatus)) {
      return;
    }

    store.dispatch(fetchJournals({ token }));
  }, [token, journalsStatus]);

  useEffect(() => {
    if (["loading", "fulfilled"].includes(categoriesStatus)) {
      return;
    }

    store.dispatch(fetchCategories({ token }));
  }, [token, categoriesStatus]);

  const [query, setQuery] = useState<string>("");
  const [categoryFilter, setCategoryFitler] = useState<Array<string>>([]);

  const journalsFiltered = useMemo(() => {
    return journals
      .filter((journal) =>
        query ? journal.title.toLowerCase().includes(query.toLowerCase()) : true
      )
      .filter(
        (journal) =>
          categoryFilter.length === 0 ||
          journal.categories?.some((category) =>
            categoryFilter.includes(category)
          )
      );
  }, [journals, query, categoryFilter]);

  return (
    <View>
      <View style={styles.input}>
        <SearchInput value={query} onChange={setQuery} />
      </View>
      <View style={styles.filterBadges}>
        {categories.map((category) => (
          <CategoryFilter
            key={category.id}
            style={styles.badge}
            checked={categoryFilter.includes(category.name)}
            onPress={() => {
              setCategoryFitler((current) =>
                current.includes(category.name)
                  ? current.filter((name) => name != category.name)
                  : [...current, category.name]
              );
            }}
          >
            {category.name}
          </CategoryFilter>
        ))}
      </View>

      {isLoading && <Loading size={"large"} />}
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
