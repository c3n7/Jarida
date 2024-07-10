import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import ListJournals from "./ListJournals";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ThemeColors from "@/constants/ThemeColors";
import EditJournal from "./EditJournal";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import ShowJournal from "./ShowJournal";
import {
  DrawerNavigatorParamList,
  StackNavigatorParamList,
} from "@/types/navigation";
import HeaderIcon from "@/components/ui/HeaderIcon";
import SelectCategories from "./SelectCategories";

const Stack = createNativeStackNavigator<StackNavigatorParamList>();
const Drawer = createDrawerNavigator<DrawerNavigatorParamList>();

type DrawerNavigatorProps = NativeStackScreenProps<
  StackNavigatorParamList,
  "DrawerScreens"
>;

function DrawerNavigator({ navigation }: DrawerNavigatorProps) {
  return (
    <Drawer.Navigator
      screenOptions={{
        sceneContainerStyle: styles.contentStyle,
        drawerActiveTintColor: ThemeColors.primary500,
        headerTintColor: ThemeColors.primary500,
      }}
    >
      <Drawer.Screen
        name="ListJournals"
        component={ListJournals}
        options={{
          title: "Home",
          headerRight: ({ tintColor }) => (
            <HeaderIcon onPress={() => navigation.navigate("EditJournal", {})}>
              <Ionicons name="add" size={24} color={tintColor} />
            </HeaderIcon>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: ThemeColors.primary500,
        contentStyle: styles.contentStyle,
      }}
    >
      <Stack.Screen
        name="DrawerScreens"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="EditJournal" component={EditJournal} />
      <Stack.Screen name="ShowJournal" component={ShowJournal} />
      <Stack.Screen name="SelectCategories" component={SelectCategories} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    marginRight: 12,
  },
  contentStyle: {
    backgroundColor: ThemeColors.base200,
  },
});
