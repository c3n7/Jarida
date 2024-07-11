import InputText from "@/components/ui/InputText";
import { store, useAppSelector } from "@/store/store";
import { Formik } from "formik";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import {
  fetchProfile,
  setUsername,
  signUp,
  SignUpPayload,
  SignUpResponse,
  updatePassword,
  UpdatePasswordPayload,
  UpdatePasswordResponse,
  updateProfile,
  UpdateProfilePayload,
  UpdateProfileResponse,
} from "@/store/authSlice";
import Button from "@/components/ui/Button";
import ThemeColors from "@/constants/ThemeColors";
import { useEffect, useMemo } from "react";

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
  const isSubmitting = useAppSelector(
    (state) => state.auth.updateProfileStatus === "pending"
  );

  const token = useAppSelector((state) => state.auth.token)!;
  const profile = useAppSelector((state) => state.auth.profile);
  const profileStatus = useAppSelector((state) => state.auth.profileStatus);

  useEffect(() => {
    if (["loading", "fulfilled"].includes(profileStatus)) {
      return;
    }

    store.dispatch(fetchProfile({ token }));
  }, [token, profileStatus]);

  if (profileStatus === "pending") {
    return <ActivityIndicator size="large" color={ThemeColors.primary500} />;
  }

  return (
    <Formik
      initialValues={
        {
          token,
          username: profile?.username ?? "",
          first_name: profile?.first_name ?? "",
          last_name: profile?.last_name ?? "",
        } satisfies UpdateProfilePayload
      }
      validationSchema={Yup.object({
        username: Yup.string().notRequired(),
        first_name: Yup.string().notRequired(),
        last_name: Yup.string().notRequired(),
      })}
      onSubmit={async (values, { setFieldError }) => {
        const payload: UpdateProfilePayload = {
          token,
          first_name: values.first_name,
          last_name: values.last_name,
        };

        if (profile?.username !== values.username) {
          payload.username = values.username;
        }

        await store
          .dispatch(updateProfile(payload))
          .unwrap()
          .then(() => {
            Alert.alert(
              "Success",
              "Your profile has been updated successfully.",
              [
                {
                  text: "OK",
                },
              ]
            );
          })
          .catch((e: UpdateProfileResponse) => {
            if (e.username) setFieldError("username", e.username);
            if (e.first_name) setFieldError("first_name", e.first_name);
            if (e.last_name) setFieldError("last_name", e.last_name);
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
              label="Username"
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
              label="First Name"
              placeholder="First Name"
              value={values.first_name}
              onChange={handleChange("first_name")}
              error={touched.first_name && errors.first_name}
            />
          </View>
          <View style={styles.input}>
            <InputText
              label="Last Name"
              placeholder="Last Name"
              value={values.last_name}
              onChange={handleChange("last_name")}
              error={touched.last_name && errors.last_name}
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
