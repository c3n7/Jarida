import { StackNavigatorParamList } from "@/types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { Text, View } from "react-native";

type Props = NativeStackScreenProps<
  StackNavigatorParamList,
  "SelectCategories"
>;

export default function SelectCategories({ navigation, route }: Props) {
  const currentCategories = useMemo(
    () => route.params.currentCategories ?? [],
    [route]
  );

  return (
    <View>
      <Text>{JSON.stringify(currentCategories)}</Text>
      <Text>Select Category</Text>
    </View>
  );
}
