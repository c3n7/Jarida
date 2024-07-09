import { Pressable, StyleSheet } from "react-native";

export default function HeaderIcon({
  children,
  onPress = () => {},
}: {
  children: React.ReactNode;
  onPress?: Function;
}) {
  return (
    <Pressable style={styles.headerIcon} onPress={() => onPress()}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    marginRight: 12,
  },
});
