import InputText from "@/components/ui/InputText";
import { store, useAppSelector } from "@/store/store";
import { Formik } from "formik";
import { Alert, StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import {
  setUsername,
  signUp,
  SignUpPayload,
  SignUpResponse,
  updatePassword,
  UpdatePasswordPayload,
  UpdatePasswordResponse,
} from "@/store/authSlice";
import Button from "@/components/ui/Button";
import ThemeColors from "@/constants/ThemeColors";

export default function Settings() {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.header}>Update Profile</Text>
        <UpdateProfile />
      </View>

      <View style={styles.card}>
        <Text style={styles.header}>Update Password</Text>
        <UpdatePassword />
      </View>
    </View>
  );
}

function UpdateProfile() {
  const username = useAppSelector((state) => state.auth.username);
  const isSubmitting = useAppSelector(
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
                  text: "OK",
                },
              ]
            );
          })
          .catch((e: SignUpResponse) => {
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
              placeholder="First Name"
              value={values.password1}
              onChange={handleChange("password1")}
              error={touched.password1 && errors.password1}
              secureTextEntry
            />
          </View>
          <View style={styles.input}>
            <InputText
              placeholder="Last Name"
              value={values.password2}
              onChange={handleChange("password2")}
              error={touched.password2 && errors.password2}
              secureTextEntry
            />
          </View>

          <Button onPress={() => handleSubmit()} loading={isSubmitting}>
            Update Profile
          </Button>
        </>
      )}
    </Formik>
  );
}

function UpdatePassword() {
  const token = useAppSelector((state) => state.auth.token!);
  const isSubmitting = useAppSelector(
    (state) => state.auth.updatePasswordStatus === "pending"
  );

  return (
    <Formik
      initialValues={
        {
          token,
          new_password1: "",
          new_password2: "",
        } satisfies UpdatePasswordPayload
      }
      validationSchema={Yup.object({
        new_password1: Yup.string().required("This field is required."),
        new_password2: Yup.string().oneOf(
          [Yup.ref("new_password1"), ""],
          "Passwords must match."
        ),
      })}
      onSubmit={async (values, { setFieldError }) => {
        await store
          .dispatch(updatePassword(values))
          .unwrap()
          .then(() => {
            Alert.alert(
              "Success",
              "Your credentials have been updated successfully.",
              [
                {
                  text: "OK",
                },
              ]
            );
          })
          .catch((e: UpdatePasswordResponse) => {
            if (e.new_password1)
              setFieldError("new_password1", e.new_password1);
            if (e.new_password2)
              setFieldError("new_password2", e.new_password2);
          });
      }}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <>
          <View style={styles.input}>
            <InputText
              label="New Password"
              placeholder="New Password"
              leftSection={({ color }) => (
                <Ionicons name="lock-closed" size={15} color={color} />
              )}
              value={values.new_password1}
              onChange={handleChange("new_password1")}
              error={touched.new_password1 && errors.new_password1}
              secureTextEntry
            />
          </View>
          <View style={styles.input}>
            <InputText
              label="Confirm Password"
              placeholder="Confirm Password"
              leftSection={({ color }) => (
                <Ionicons name="lock-closed" size={15} color={color} />
              )}
              value={values.new_password2}
              onChange={handleChange("new_password2")}
              error={touched.new_password2 && errors.new_password2}
              secureTextEntry
            />
          </View>

          <Button onPress={() => handleSubmit()} loading={isSubmitting}>
            Update Password
          </Button>
        </>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 8,
  },
  card: {
    padding: 8,
    backgroundColor: ThemeColors.base100,
    borderRadius: 4,
    elevation: 2,
    marginBottom: 8,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    marginBottom: 8,
    width: "100%",
  },
});
