import { JournalEntry } from "@/store/journalSlice";
import { NavigatorScreenParams } from "@react-navigation/native";

export type DrawerNavigatorParamList = {
  ListJournals: undefined;
};

export type StackNavigatorParamList = {
  DrawerScreens: NavigatorScreenParams<DrawerNavigatorParamList>;
  EditJournal: { journal?: JournalEntry };
  ShowJournal: { journal: JournalEntry };
};
