import InputText from "@/components/ui/InputText";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/ui/Button";
import FlatButton from "@/components/ui/FlatButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import AuthWrapperLayout from "@/components/screens/auth/AuthWrapperLayout";

type Props = NativeStackScreenProps<ParamListBase, "SignIn">;

export default function SignIn({ navigation }: Props) {
  return (
    <AuthWrapperLayout
      title="Welcome Back 👋"
      description="Enter your credentials to proceed."
    >
      <View style={styles.input}>
        <InputText
          placeholder="Email"
          leftSection={({ color }) => (
            <Ionicons name="mail" size={15} color={color} />
          )}
        />
      </View>
      <View style={styles.input}>
        <InputText
          placeholder="Password"
          leftSection={({ color }) => (
            <Ionicons name="lock-closed" size={15} color={color} />
          )}
        />
      </View>

      <Button onPress={() => navigation.navigate("AuthenticatedScreens")}>
        Sign In
      </Button>

      <FlatButton onPress={() => navigation.navigate("SignUp")}>
        Register
      </FlatButton>
    </AuthWrapperLayout>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 8,
    width: "100%",
  },
});
