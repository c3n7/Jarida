import InputText from "@/components/ui/InputText";
import Loading from "@/components/ui/Loading";
import { fetchCategories } from "@/store/journalSlice";
import { store, useAppSelector } from "@/store/store";
import { StackNavigatorParamList } from "@/types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeaderIcon from "@/components/ui/HeaderIcon";
import ThemeColors from "@/constants/ThemeColors";

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
        initialValues={{ newCategory: "", category_names: currentCategories }}
        onSubmit={(values) => {
          const newCategory = values.newCategory.trim();

          // Store all of them in a set to prevent duplicates
          const uniqueCategories = new Set<string>();
          values.category_names.forEach((category) =>
            uniqueCategories.add(category)
          );

          if (newCategory) {
            uniqueCategories.add(newCategory);
          }

          // retreive items from the set then send them to the EditJournal page
          const categories: Array<string> = [];
          uniqueCategories.forEach((c) => categories.push(c));

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
            {categories.map((category) => (
              <Pressable
                key={category.id}
                style={[
                  styles.categoryContainer,
                  values.category_names.includes(category.name) &&
                    styles.categoryContainerSelected,
                ]}
                onPress={() =>
                  setFieldValue(
                    "category_names",
                    values.category_names.includes(category.name)
                      ? values.category_names.filter((c) => c != category.name)
                      : [...values.category_names, category.name]
                  )
                }
                android_ripple={{ color: ThemeColors.gray400 }}
              >
                <Text
                  style={[
                    styles.categoryText,
                    values.category_names.includes(category.name) &&
                      styles.categoryTextSelected,
                  ]}
                >
                  {category.name}
                </Text>
                <Ionicons
                  name={"checkmark-circle"}
                  size={26}
                  style={[
                    styles.categoryIcon,
                    values.category_names.includes(category.name) &&
                      styles.categoryIconSelected,
                  ]}
                />
              </Pressable>
            ))}
          </>
        )}
      </Formik>

      <Text>{JSON.stringify(currentCategories)}</Text>
      <Text>{JSON.stringify(categories)}</Text>
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
  categoryContainer: {
    backgroundColor: ThemeColors.base100,
    elevation: 2,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  categoryContainerSelected: {
    borderColor: ThemeColors.primary500,
    borderWidth: 2,
    elevation: 5,
  },
  categoryIcon: {
    color: ThemeColors.gray500,
    marginRight: 8,
  },
  categoryIconSelected: {
    color: ThemeColors.primary500,
  },
  categoryText: {
    flex: 1,
    color: ThemeColors.baseContent,
  },
  categoryTextSelected: {
    color: ThemeColors.primary500,
  },
});
