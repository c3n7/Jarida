import ThemeColors from "@/constants/ThemeColors";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

export default function CategoryFilter({
  checked,
  children,
  style,
  leftSection,
  onPress = () => {},
}: {
  checked?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  leftSection?: ({ color }: { color: string }) => React.ReactNode;
  onPress?: Function;
}) {
  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.badgeWrapper,
          checked ? styles.checked : styles.unchecked,
        ]}
      >
        <Pressable
          style={styles.pressable}
          android_ripple={{ color: ThemeColors.gray500 }}
          onPress={() => onPress()}
        >
          {leftSection &&
            leftSection({
              color: ThemeColors.baseContent,
            })}

          <Text style={styles.badge}>{children}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  badgeWrapper: {
    borderRadius: 120,
    overflow: "hidden",
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  badge: {
    color: ThemeColors.baseContent,
  },
  checked: {
    backgroundColor: ThemeColors.primary200,
  },
  unchecked: {
    backgroundColor: ThemeColors.gray400,
  },
});
