import { Alert, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import * as Yup from "yup";
import InputText from "@/components/ui/InputText";
import Button from "@/components/ui/Button";
import { useLayoutEffect, useMemo } from "react";
import {
  fetchJournals,
  JournalEntryPayload,
  JournalEntryResponse,
  saveJournal,
} from "@/store/journalSlice";
import { store, useAppSelector } from "@/store/store";
import { StackNavigatorParamList } from "@/types/navigation";
import CategoryFilter from "@/components/screens/journals/CategoryFilter";
import { Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<StackNavigatorParamList, "EditJournal">;

export default function EditJournal({ navigation, route }: Props) {
  const journalId = useMemo(() => route?.params?.journalId, [route]);
  const journal = useAppSelector((state) =>
    state.journals.journals.find((journal) => journal.id === journalId)
  );
  const token = useAppSelector((state) => state.auth.token!);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: journal ? "Edit Journal Entry" : "Add Journal Entry",
    });
  }, [navigation, journal]);
  return (
    <View style={styles.screen}>
      <FormView
        journal={{
          id: journal?.id,
          title: journal?.title ?? "",
          content: journal?.content ?? "",
          date: journal?.date ?? "",
          category_names: journal?.categories ?? [],
          token,
        }}
        navigation={navigation}
      />
    </View>
  );
}

function FormView({
  journal,
  navigation,
}: {
  journal?: JournalEntryPayload;
  navigation: Props["navigation"];
}) {
  const isSubmitting = useAppSelector(
    (state) => state.journals.journalsStatus === "pending"
  );
  const token = useAppSelector((state) => state.auth.token!);

  return (
    <Formik
      initialValues={{
        id: journal?.id,
        title: journal?.title ?? "",
        content: journal?.content ?? "",
        date: journal?.date ?? "",
        category_names: journal?.category_names ?? [],
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("This field is required"),
        content: Yup.string().required("This field is required"),
        date: Yup.string()
          .matches(/\d{4}-\d{2}-\d{2}/, "Enter a valid date (yyyy-mm-dd).")
          .required("This field is required"),
        category_names: Yup.array()
          .of(Yup.string().max(20, "Enter a maximum of 20 characters."))
          .required("This field is required"),
      })}
      onSubmit={async (values, { setFieldError }) => {
        await store
          .dispatch(saveJournal({ ...values, token }))
          .unwrap()
          .then(() => {
            store.dispatch(fetchJournals({ token }));

            Alert.alert(
              "Success",
              "The journal entry has been saved successfully.",
              [{ text: "Okay", onPress: () => navigation.goBack() }]
            );
          })
          .catch((e: JournalEntryResponse) => {
            if (e.message) setFieldError("title", e.message);
            if (e.title) setFieldError("title", e.title);
            if (e.content) setFieldError("content", e.content);
            if (e.date) setFieldError("date", e.date);
          });
      }}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <>
          <View style={styles.input}>
            <CategoryFilter
              checked={true}
              leftSection={({ color }) => (
                <Ionicons name="add" size={16} color={color} />
              )}
              onPress={() =>
                navigation.navigate("SelectCategories", {
                  currentCategories: values.category_names,
                })
              }
            >
              Category
            </CategoryFilter>
          </View>
          <View style={styles.input}>
            <InputText
              label="Title"
              placeholder="Title"
              value={values.title}
              onChange={handleChange("title")}
              error={touched.title && errors.title}
            />
          </View>
          <View style={styles.input}>
            <InputText
              label="Date"
              placeholder="Date"
              value={values.date}
              onChange={handleChange("date")}
              error={touched.date && errors.date}
            />
          </View>
          <View style={styles.input}>
            <InputText
              label="Content"
              placeholder="Content"
              value={values.content}
              onChange={handleChange("content")}
              error={touched.content && errors.content}
              multiline
            />
          </View>

          <Button onPress={() => handleSubmit()} loading={isSubmitting}>
            Save
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
  input: {
    marginBottom: 8,
    width: "100%",
  },
});
