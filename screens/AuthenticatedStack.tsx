import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import ListJournals from "./ListJournals";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
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
import { store } from "@/store/store";
import { clearToken } from "@/store/authSlice";
import Settings from "./Settings";

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
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <DrawerItemList
            state={props.state}
            descriptors={props.descriptors}
            navigation={props.navigation}
          />
          <DrawerItem
            label="Sign Out"
            onPress={() => store.dispatch(clearToken())}
            inactiveTintColor={ThemeColors.error}
            icon={({ color, size }) => (
              <Ionicons name="exit-outline" color={color} size={size} />
            )}
          />
        </DrawerContentScrollView>
      )}
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
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Settings",

          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
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
      <Stack.Screen
        name="SelectCategories"
        component={SelectCategories}
        options={{ title: "Select Categories" }}
      />
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
