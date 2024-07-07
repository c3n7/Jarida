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
import { store, useAppSelector } from "@/store/store";
import {
  setUsername,
  signUp,
  SignUpPayload,
  SignUpResponse,
} from "@/store/authSlice";

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

function FormView({ onSuccess }: { onSuccess: Function }) {
  const username = useAppSelector((state) => state.auth.username);
  const signingUp = useAppSelector(
    (state) => state.auth.signUpStatus === "pending"
  );

  return (
    <Formik
      initialValues={
        {
          username: username ?? "",
          password1: "",
          password2: "",
        } satisfies SignUpPayload
      }
      validationSchema={Yup.object({
        username: Yup.string().required("This field is required."),
        password1: Yup.string().required("This field is required."),
        password2: Yup.string().oneOf(
          [Yup.ref("password1"), ""],
          "Passwords must match."
        ),
      })}
      onSubmit={async (values, { setFieldError }) => {
        await store
          .dispatch(signUp(values))
          .unwrap()
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
            if (e.username) setFieldError("username", e.username);
            if (e.password1) setFieldError("password1", e.password1);
            if (e.password2) setFieldError("password2", e.password2);
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

          <Button onPress={() => handleSubmit()} loading={signingUp}>
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
