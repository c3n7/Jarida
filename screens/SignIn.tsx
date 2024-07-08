import InputText from "@/components/ui/InputText";
import { Alert, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/ui/Button";
import FlatButton from "@/components/ui/FlatButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import AuthWrapperLayout from "@/components/screens/auth/AuthWrapperLayout";
import { store, useAppSelector } from "@/store/store";
import { Formik } from "formik";
import {
  setUsername,
  signIn,
  SignInPayload,
  SignInResponse,
} from "@/store/authSlice";
import * as Yup from "yup";

type Props = NativeStackScreenProps<ParamListBase, "SignIn">;

export default function SignIn({ navigation }: Props) {
  return (
    <AuthWrapperLayout
      title="Welcome Back 👋"
      description="Enter your credentials to proceed."
    >
      <FormView onSuccess={() => {}} />

      <FlatButton onPress={() => navigation.navigate("SignUp")}>
        Register
      </FlatButton>
    </AuthWrapperLayout>
  );
}

function FormView({ onSuccess }: { onSuccess: Function }) {
  const username = useAppSelector((state) => state.auth.username);
  const isSubmitting = useAppSelector(
    (state) => state.auth.signInStatus === "pending"
  );
  return (
    <Formik
      initialValues={
        {
          username: username ?? "",
          password: "",
        } satisfies SignInPayload
      }
      validationSchema={Yup.object({
        username: Yup.string().required("This field is required."),
        password: Yup.string().required("This field is required."),
      })}
      onSubmit={async (values, { setFieldError }) => {
        await store
          .dispatch(signIn(values))
          .unwrap()
          .then(() => {
            Alert.alert(
              "Welcome",
              "You have been authenticated successfully.",
              [
                {
                  text: "Proceed",
                  onPress: () => onSuccess(),
                },
              ]
            );
          })
          .catch((e: SignInResponse) => {
            if (e.non_field_errors) {
              setFieldError("username", e.non_field_errors);
            }
            if (e.username) setFieldError("username", e.username);
            if (e.password) setFieldError("password", e.password);
          });
      }}
    >
      {({
        handleChange,
        setFieldValue,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <>
          <View style={styles.input}>
            <InputText
              placeholder="Username"
              leftSection={({ color }) => (
                <Ionicons name="person" size={15} color={color} />
              )}
              value={values.username}
              onChange={(text: string) => {
                setFieldValue("username", text);
                store.dispatch(setUsername(text));
              }}
              error={touched.username && errors.username}
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
              secureTextEntry
            />
          </View>

          <Button onPress={() => handleSubmit()} loading={isSubmitting}>
            Sign In
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
