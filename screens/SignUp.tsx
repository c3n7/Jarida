import InputText from "@/components/ui/InputText";
import ThemeColors from "@/constants/ThemeColors";
import { Alert, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/ui/Button";
import FlatButton from "@/components/ui/FlatButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import AuthWrapperLayout from "@/components/screens/auth/AuthWrapperLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import Config from "@/constants/Config";
import { useState } from "react";

type Props = NativeStackScreenProps<ParamListBase, "SignUp">;

export default function SignUp({ navigation }: Props) {
  return (
    <AuthWrapperLayout
      title="Adventure Starts Here 🚀"
      description="Join us today."
    >
      <FormView
        onSuccess={() => {
          navigation.navigate("SignIn");
        }}
      />

      <FlatButton onPress={() => navigation.navigate("SignIn")}>
        Sign In
      </FlatButton>
    </AuthWrapperLayout>
  );
}

interface SignUpFields {
  password1?: string;
  password2?: string;
  username?: string;
}

const initialValues: SignUpFields = {
  username: "",
  password1: "",
  password2: "",
};

function FormView({ onSuccess }: { onSuccess: Function }) {
  const [processing, setProcessing] = useState<boolean>(false);

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={Yup.object({
        username: Yup.string().required("This field is required."),
        password1: Yup.string().required("This field is required."),
        password2: Yup.string().oneOf(
          [Yup.ref("password1"), ""],
          "Passwords must match."
        ),
      })}
      onSubmit={async (values, { setFieldError }) => {
        const payload: SignUpFields = { ...values };
        setProcessing(true);
        await fetch(`${Config.API_URL}/dj-rest-auth/registration/`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then(async (response) => {
            const hasJSON =
              response.headers.get("content-type") === "application/json";

            let data: SignUpFields = {};

            if (hasJSON && (response.status >= 400 || response.status <= 499)) {
              data = await response.json();

              Object.keys(data).forEach((key) => {
                if (
                  key === "password1" ||
                  key === "password2" ||
                  key === "username"
                ) {
                  setFieldError(key, data[key]?.[0] ?? "");
                }
              });

              throw data;
            }

            console.log(response.status, data);
            if (!response.ok) {
              throw { message: "Operation Failed." };
            }

            return data;
          })
          .then(() => {
            Alert.alert(
              "Welcome",
              "Your account has been created successfully. You should now be able to sign in.",
              [
                {
                  text: "Proceed",
                  onPress: () => onSuccess(),
                },
              ]
            );
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => setProcessing(false));
      }}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <>
          <View style={styles.input}>
            <InputText
              placeholder="Username"
              leftSection={({ color }) => (
                <Ionicons name="person" size={15} color={color} />
              )}
              value={values.username}
              onChange={handleChange("username")}
              error={touched.username && errors.username}
            />
          </View>
          <View style={styles.input}>
            <InputText
              placeholder="Password"
              leftSection={({ color }) => (
                <Ionicons name="lock-closed" size={15} color={color} />
              )}
              value={values.password1}
              onChange={handleChange("password1")}
              error={touched.password1 && errors.password1}
              secureTextEntry
            />
          </View>
          <View style={styles.input}>
            <InputText
              placeholder="Confirm Password"
              leftSection={({ color }) => (
                <Ionicons name="lock-closed" size={15} color={color} />
              )}
              value={values.password2}
              onChange={handleChange("password2")}
              error={touched.password2 && errors.password2}
              secureTextEntry
            />
          </View>

          <Button onPress={() => handleSubmit()} loading={processing}>
            Register
          </Button>
        </>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 8,
    width: "100%",
  },
});
