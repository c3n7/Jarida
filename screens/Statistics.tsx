import Loading from "@/components/ui/Loading";
import ThemeColors from "@/constants/ThemeColors";
import { fetchCategories, fetchJournals } from "@/store/journalSlice";
import { store, useAppSelector } from "@/store/store";
import { useEffect, useMemo } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

export default function Statistics() {
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

  return (
    <View style={styles.screen}>
      {isLoading && <Loading size={"large"} />}
      <View style={styles.rowStats}>
        <Stat
          label="Categories"
          value={`${categories.length}`}
          style={styles.statHalf}
        />
        <Stat
          label="Journals"
          value={`${journals.length}`}
          style={styles.statHalf}
        />
      </View>
      <View style={styles.colStats}>
        <Stat
          label="Newest Journal"
          value={`${journals.at(0)?.title ?? "-"}`}
          footer={`${journals.at(0)?.date ?? "-"}`}
        />
        <Stat
          label="Oldest Journal"
          value={`${journals.at(-1)?.title ?? "-"}`}
          footer={`${journals.at(-1)?.date ?? "-"}`}
        />
      </View>
    </View>
  );
}

function Stat({
  label,
  value,
  footer,
  style,
}: {
  label: string;
  value: string;
  footer?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.stat, style]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
      {footer && <Text style={styles.statFooter}>{footer}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingVertical: 8,
  },
  colStats: {
    paddingHorizontal: 8,
  },
  rowStats: {
    flexDirection: "row",
    paddingLeft: 8,
  },
  statHalf: {
    flex: 1,
    marginRight: 8,
  },
  stat: {
    padding: 8,
    marginBottom: 8,
    backgroundColor: ThemeColors.base100,
    elevation: 2,
    borderRadius: 8,
    borderColor: ThemeColors.primary200,
    borderWidth: 2,
  },
  statLabel: {
    fontWeight: "bold",
  },
  statValue: {
    marginTop: 20,
    marginBottom: 15,
    fontSize: 20,
  },
  statFooter: {
    marginTop: 5,
  },
});
