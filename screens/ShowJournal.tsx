import HeaderIcon from "@/components/ui/HeaderIcon";
import ThemeColors from "@/constants/ThemeColors";
import { store, useAppSelector } from "@/store/store";
import { StackNavigatorParamList } from "@/types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useMemo } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CategoryFilter from "@/components/screens/journals/CategoryFilter";
import FlatButton from "@/components/ui/FlatButton";
import Button from "@/components/ui/Button";
import { deleteJournal, fetchJournals } from "@/store/journalSlice";

type Props = NativeStackScreenProps<StackNavigatorParamList, "ShowJournal">;

export default function ShowJournal({ route, navigation }: Props) {
  const journalId = useMemo(() => route?.params?.journalId!, [route]);
  const journal = useAppSelector(
    (state) =>
      state.journals.journals.find((journal) => journal.id === journalId)!
  );

  useLayoutEffect(() => {
    const title =
      journal.title.length > 25
        ? journal.title.substring(0, 25) + "..."
        : journal.title;
    navigation.setOptions({
      title: title,
      headerRight: ({ tintColor }) => (
        <HeaderIcon
          onPress={() => navigation.navigate("EditJournal", { journalId })}
        >
          <Ionicons name="open-outline" size={24} color={tintColor} />
        </HeaderIcon>
      ),
    });
  }, [journal, navigation]);

  const token = useAppSelector((state) => state.auth.token!);
  const isDeleting = useAppSelector(
    (state) => state.journals.deleteJournalStatus === "pending"
  );
  async function deleteThisJournal() {
    store
      .dispatch(deleteJournal({ id: journal.id, token }))
      .unwrap()
      .then(() => {
        store.dispatch(fetchJournals({ token }));
        navigation.goBack();
      });
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{journal.title}</Text>
      <Text style={styles.date}>
        {new Date(journal.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </Text>

      <View style={styles.categories}>
        {journal.categories?.map((category, index) => (
          <CategoryFilter key={`${category}-${index}`} style={styles.category}>
            {category}
          </CategoryFilter>
        ))}
      </View>

      <Text style={styles.content}>{journal.content}</Text>

      <View style={styles.actions}>
        <FlatButton
          style={styles.deleteAction}
          onPress={() => {
            Alert.alert(
              `Delete ${journal.title}?`,
              "This operation is irreversible.",
              [
                {
                  text: "Back",
                  onPress: () => {},
                },
                {
                  text: "Delete",
                  onPress: () => deleteThisJournal(),
                  style: "destructive",
                },
              ]
            );
          }}
          loadingColor={ThemeColors.error}
          loading={isDeleting}
          containerStyle={styles.action}
        >
          Delete
        </FlatButton>

        <Button
          onPress={() => navigation.navigate("EditJournal", { journalId })}
          containerStyle={styles.action}
        >
          Edit
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    color: ThemeColors.gray600,
    marginBottom: 2,
  },
  content: {
    textAlign: "justify",
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  category: {
    marginRight: 8,
    marginBottom: 8,
  },
  actions: {
    marginTop: 8,
    flexDirection: "row",
  },
  action: {
    flex: 1,
  },
  deleteAction: {
    color: ThemeColors.error,
  },
});
