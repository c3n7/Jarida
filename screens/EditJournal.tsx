import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import * as Yup from "yup";
import InputText from "@/components/ui/InputText";
import Button from "@/components/ui/Button";
import { useEffect, useLayoutEffect, useMemo } from "react";
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
  const token = useAppSelector((state) => state.auth.token!);

  const journal = useAppSelector((state) =>
    state.journals.journals.find((journal) => journal.id === journalId)
  );
  const journalId = useMemo<number | undefined>(
    () => route?.params?.journalId,
    [route]
  );
  const categoryNames = useMemo<Array<string>>(
    () => route?.params?.categoryNames ?? journal?.categories ?? [],
    [route, journal]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: journal ? "Edit Journal Entry" : "Add Journal Entry",
    });
  }, [navigation, journal]);
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <FormView
          journal={{
            id: journal?.id,
            title: journal?.title ?? "",
            content: journal?.content ?? "",
            date: journal?.date ?? "",
            category_names: categoryNames,
            token,
          }}
          navigation={navigation}
        />
      </View>
    </ScrollView>
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
      {({
        handleChange,
        setFieldValue,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <>
          <View style={styles.categories}>
            <CategoriesUpdatesChecker
              categoryNames={journal?.category_names ?? []}
              onUpdated={(v) => setFieldValue("category_names", v)}
            />

            {values.category_names.map((category, index) => (
              <CategoryFilter
                key={`${category}-${index}`}
                style={styles.category}
              >
                {category}
              </CategoryFilter>
            ))}
            <CategoryFilter
              checked={true}
              style={styles.category}
              leftSection={({ color }) => (
                <Ionicons name="add" size={16} color={color} />
              )}
              onPress={() =>
                navigation.navigate("SelectCategories", {
                  journalId: journal?.id,
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

function CategoriesUpdatesChecker({
  categoryNames,
  onUpdated,
}: {
  categoryNames: Array<string>;
  onUpdated: (values: Array<string>) => void;
}) {
  useEffect(() => {
    onUpdated(categoryNames);
  }, [categoryNames]);

  return <></>;
}

const styles = StyleSheet.create({
  screen: {
    padding: 8,
  },
  container: {
    paddingBottom: 16,
  },
  input: {
    marginBottom: 8,
    width: "100%",
  },
  categories: {
    flexDirection: "row",
    flexWrap: "nowrap",
    marginBottom: 8,
  },
  category: {
    marginRight: 8,
  },
});
