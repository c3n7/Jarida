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
      <View style={styles.wrapper}></View>
      <View style={styles.greeting}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {children}
      <View style={styles.wrapper}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    marginTop: 35,
    paddingHorizontal: 16,
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
    color: ThemeColors.baseContent,
  },
  wrapper: {
    flex: 1,
  },
});
