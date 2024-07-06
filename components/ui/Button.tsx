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
}: {
  children: React.ReactNode;
  onPress?: PressableProps["onPress"];
}) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressable}
        android_ripple={{ color: ThemeColors.primary300 }}
        onPress={onPress}
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
