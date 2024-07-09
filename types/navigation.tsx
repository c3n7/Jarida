import { NavigatorScreenParams } from "@react-navigation/native";

export type DrawerNavigatorParamList = {
  ListJournals: undefined;
};

export type StackNavigatorParamList = {
  DrawerScreens: NavigatorScreenParams<DrawerNavigatorParamList>;
  EditJournal: { journalId: number };
  ShowJournal: { journalId: number };
};
