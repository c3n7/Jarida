import ThemeColors from "@/constants/ThemeColors";
import {
  ActivityIndicator,
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
        {loading && (
          <ActivityIndicator
            style={styles.loadingIcon}
            color={ThemeColors.baseContent}
          />
        )}
        <Text style={[styles.text, loading && styles.loadingText]}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeColors.primary500,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 4,
  },
  loading: {
    backgroundColor: ThemeColors.gray500,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  loadingIcon: {
    marginRight: 8,
  },
  loadingText: {
    color: ThemeColors.baseContent,
  },
  pressable: {
    flexDirection: "row",
    paddingVertical: 8,
  },
});
