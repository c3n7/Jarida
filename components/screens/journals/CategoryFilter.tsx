import ThemeColors from "@/constants/ThemeColors";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

export default function CategoryFilter({
  checked,
  children,
  style,
}: {
  checked?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.badge, checked ? styles.checked : styles.unchecked]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 120,
  },
  checked: {
    backgroundColor: ThemeColors.primary200,
    color: ThemeColors.baseContent,
  },
  unchecked: {
    backgroundColor: ThemeColors.gray400,
    color: ThemeColors.baseContent,
  },
});
