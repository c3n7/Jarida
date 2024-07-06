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

interface ResponsePayload {
  password1?: Array<string>;
  password2?: Array<string>;
  email?: Array<string>;
  username?: Array<string>;
}
interface BodyPayload {
  password1?: string;
  password2?: string;
  email?: string;
  username?: string;
}

function FormView({ onSuccess }: { onSuccess: Function }) {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        password_confirmation: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email().required("This field is required."),
        password: Yup.string().required("This field is required."),
        password_confirmation: Yup.string().oneOf(
          [Yup.ref("password"), ""],
          "Passwords must match."
        ),
      })}
      onSubmit={async (values, { setFieldError }) => {
        const payload: BodyPayload = {
          email: values.email,
          username: values.email,
          password1: values.password,
          password2: values.password_confirmation,
        };

        await fetch(`${Config.API_URL}/dj-rest-auth/registration`, {
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

            let data: ResponsePayload = {};

            if (hasJSON && (response.status >= 400 || response.status <= 499)) {
              data = await response.json();

              Object.keys(data).forEach((key) => {
                switch (key) {
                  case "password1":
                    setFieldError("password", data[key]?.[0] ?? "");
                    break;
                  case "password2":
                    setFieldError("password", data[key]?.[0] ?? "");
                    break;
                  case "username":
                    setFieldError("email", data[key]?.[0] ?? "");
                    break;
                  case "email":
                    setFieldError("email", data[key]?.[0] ?? "");
                    break;
                  default:
                    break;
                }
              });

              throw data;
            }
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
          });
      }}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <>
          <View style={styles.input}>
            <InputText
              placeholder="Email"
              leftSection={({ color }) => (
                <Ionicons name="mail" size={15} color={color} />
              )}
              value={values.email}
              onChange={handleChange("email")}
              error={touched.email && errors.email}
            />
          </View>
          <View style={styles.input}>
            <InputText
              placeholder="Password"
              leftSection={({ color }) => (
                <Ionicons name="lock-closed" size={15} color={color} />
              )}
              value={values.password}
              onChange={handleChange("password")}
              error={touched.password && errors.password}
            />
          </View>
          <View style={styles.input}>
            <InputText
              placeholder="Confirm Password"
              leftSection={({ color }) => (
                <Ionicons name="lock-closed" size={15} color={color} />
              )}
              value={values.password_confirmation}
              onChange={handleChange("password_confirmation")}
              error={
                touched.password_confirmation && errors.password_confirmation
              }
            />
          </View>

          <Button onPress={() => handleSubmit()}>Register</Button>
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
