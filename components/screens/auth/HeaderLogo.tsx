import ThemeColors from "@/constants/ThemeColors";
import { Image, StyleSheet, Text, View } from "react-native";

export default function HeaderLogo() {
  return (
    <View style={styles.logoContainer}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />
      <Text style={styles.logoText}>Jarida</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderRadius: 200,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 2,
  },
  logoText: {
    fontSize: 18,
    color: ThemeColors.primary500,
    fontWeight: "bold",
  },
});
