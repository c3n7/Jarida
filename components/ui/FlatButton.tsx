import ThemeColors from "@/constants/ThemeColors";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function FlatButton({
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
        android_ripple={{ color: ThemeColors.base200 }}
        onPress={onPress}
      >
        <Text style={styles.text}>{children}</Text>
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
  text: {
    color: ThemeColors.primary500,
    textAlign: "center",
    width: "100%",
  },
  pressable: {
    width: "100%",
  },
});
