import { JournalEntry } from "@/store/journalSlice";
import { StackNavigatorParamList } from "@/types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useMemo } from "react";
import { Text, View } from "react-native";

type Props = NativeStackScreenProps<StackNavigatorParamList, "ShowJournal">;
interface PageProps extends Props {
  journal?: JournalEntry;
}

type ShowJournalParams = {
  journal: JournalEntry;
};

export type ShowJournalPageProps = PageProps;

export default function ShowJournal({ navigation, route }: Props) {
  const journal = useMemo(() => route?.params?.journal, [route]);
  // useLayoutEffect(() => {
  //   console.log(journal);
  //   if (!journal) return;

  //   // navigation.setOptions({ title: route.title });
  // }, [navigation, journal]);

  // if (!journal) {
  //   return;
  // }

  return (
    <View>
      <Text>{JSON.stringify(journal)}</Text>
    </View>
  );
}
