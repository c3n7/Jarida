import ThemeColors from "@/constants/ThemeColors";
import { Image, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";

type Props = NativeStackScreenProps<ParamListBase, "SignUp">;

export default function AuthWrapperLayout({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.screen}>
      {/* <View style={styles.container}> */}
      <View style={styles.wrapper}></View>
      <View style={styles.greeting}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {children}
      <View style={styles.wrapper}></View>
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    marginTop: 35,
    paddingHorizontal: 16,
    // backgroundColor: "red",
  },
  container: {
    // flex: 1,
    // backgroundColor: ThemeColors.base200,
    width: "100%",
    padding: 16,
    borderRadius: 4,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderRadius: 200,
    marginBottom: 8,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 8,
  },
  logoText: {
    fontSize: 18,
    color: ThemeColors.primary500,
    fontWeight: "bold",
  },
  greeting: {
    marginBottom: 8,
    width: "100%",
  },
  title: {
    fontSize: 18,
    color: ThemeColors.baseContent,
  },
  description: {
    // fontSize: 18,
    color: ThemeColors.baseContent,
  },
  wrapper: {
    flex: 1,
  },
});
