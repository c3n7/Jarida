import ThemeColors from "@/constants/ThemeColors";
import { ActivityIndicator, ActivityIndicatorProps, View } from "react-native";

export default function Loading({
  size,
}: {
  size?: ActivityIndicatorProps["size"];
}) {
  return (
    <View>
      <ActivityIndicator color={ThemeColors.primary500} size={size} />
    </View>
  );
}
