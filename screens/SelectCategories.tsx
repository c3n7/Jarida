import InputText from "@/components/ui/InputText";
import Loading from "@/components/ui/Loading";
import { fetchCategories } from "@/store/journalSlice";
import { store, useAppSelector } from "@/store/store";
import { StackNavigatorParamList } from "@/types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeaderIcon from "@/components/ui/HeaderIcon";

type Props = NativeStackScreenProps<
  StackNavigatorParamList,
  "SelectCategories"
>;

export default function SelectCategories({ navigation, route }: Props) {
  const journalId = useMemo(() => route.params.journalId, [route]);
  const currentCategories = useMemo(
    () => route.params.currentCategories ?? [],
    [route]
  );

  const token = useAppSelector((state) => state.auth.token!);
  const categories = useAppSelector((state) => state.journals.categories);
  const categoriesStatus = useAppSelector(
    (state) => state.journals.categoriesStatus
  );

  useEffect(() => {
    if (["loading", "fulfilled"].includes(categoriesStatus)) {
      return;
    }

    store.dispatch(fetchCategories({ token }));
  }, [token]);

  return (
    <View style={styles.screen}>
      {categoriesStatus === "pending" && <Loading size={"large"} />}

      <Formik
        initialValues={{ newCategory: "" }}
        onSubmit={(values) => {
          const categories: Array<string> = [];
          const newCategory = values.newCategory.trim();

          if (newCategory) {
            categories.push(newCategory);
          }

          navigation.navigate("EditJournal", {
            journalId,
            categoryNames: categories,
          });
        }}
      >
        {({ setFieldValue, values, handleSubmit }) => (
          <>
            <HeaderSubmitIcon
              navigation={navigation}
              onPress={() => handleSubmit()}
            />

            <View style={styles.input}>
              <InputText
                leftSection={({ color }) => (
                  <Ionicons name="add" size={20} color={color} />
                )}
                placeholder="New Category"
                value={values.newCategory}
                onChange={(v) => setFieldValue("newCategory", v)}
              />
            </View>
          </>
        )}
      </Formik>

      <Text>{JSON.stringify(currentCategories)}</Text>
      <Text>{JSON.stringify(categories)}</Text>
      <Text>Select Category</Text>
    </View>
  );
}

function HeaderSubmitIcon({
  navigation,
  onPress,
}: {
  navigation: Props["navigation"];
  onPress: Function;
}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <HeaderIcon onPress={onPress}>
          <Ionicons name="save" color={tintColor} size={20} />
        </HeaderIcon>
      ),
    });
  }, [navigation, onPress]);

  return <></>;
}

const styles = StyleSheet.create({
  screen: {
    padding: 8,
  },
  input: {
    paddingBottom: 8,
  },
});
