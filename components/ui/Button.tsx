import ThemeColors from "@/constants/ThemeColors";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Button({
  children,
  onPress,
  loading,
}: {
  children: React.ReactNode;
  onPress?: PressableProps["onPress"];
  loading?: boolean;
}) {
  return (
    <View style={[styles.container, loading && styles.loading]}>
      <Pressable
        style={styles.pressable}
        android_ripple={{ color: ThemeColors.primary300 }}
        onPress={onPress}
        disabled={loading}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeColors.primary500,
    width: "100%",
    flexDirection: "row",
    borderRadius: 4,
  },
  loading: {
    backgroundColor: ThemeColors.gray500,
  },
  text: {
    color: "white",
    textAlign: "center",
    width: "100%",
  },
  pressable: {
    width: "100%",
    paddingVertical: 8,
  },
});
