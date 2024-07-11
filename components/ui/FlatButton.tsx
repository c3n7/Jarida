import ThemeColors from "@/constants/ThemeColors";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

export default function FlatButton({
  children,
  onPress,
  style,
  loading,
  loadingColor = ThemeColors.baseContent,
  containerStyle,
}: {
  children: React.ReactNode;
  onPress?: PressableProps["onPress"];
  style?: StyleProp<TextStyle>;
  loading?: boolean;
  loadingColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable
        style={styles.pressable}
        android_ripple={{ color: ThemeColors.base200 }}
        onPress={onPress}
      >
        {loading && (
          <ActivityIndicator style={styles.loadingIcon} color={loadingColor} />
        )}

        <Text style={[styles.text, style]}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    width: "100%",
    flexDirection: "row",
    borderRadius: 4,
  },
  pressable: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  text: {
    color: ThemeColors.primary500,
    textAlign: "center",
  },
  loadingIcon: {
    marginRight: 8,
  },
});
