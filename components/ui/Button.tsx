import ThemeColors from "@/constants/ThemeColors";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

export default function Button({
  children,
  onPress,
  loading,
  containerStyle,
}: {
  children: React.ReactNode;
  onPress?: PressableProps["onPress"];
  loading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.container, containerStyle, loading && styles.loading]}>
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 8,
  },
});
