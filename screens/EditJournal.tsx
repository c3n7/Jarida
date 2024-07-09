import { Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";

type Props = NativeStackScreenProps<ParamListBase, "EditJournal">;

export default function EditJournal({}: Props) {
  return (
    <View>
      <Text>Add Journals Here</Text>
    </View>
  );
}
