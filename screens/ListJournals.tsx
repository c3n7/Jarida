import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "react-native";

type Props = NativeStackScreenProps<ParamListBase, "ListJournals">;

export default function ListJournals({}: Props) {
  return <Text>Journals List</Text>;
}
