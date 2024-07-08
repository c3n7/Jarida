import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListJournals from "./ListJournals";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ThemeColors from "@/constants/ThemeColors";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerContentStyle: { backgroundColor: ThemeColors.base100 },
        sceneContainerStyle: { backgroundColor: ThemeColors.base200 },
      }}
    >
      <Drawer.Screen
        name="ListJournals"
        component={ListJournals}
        options={{ title: "My Journals" }}
      />
    </Drawer.Navigator>
  );
}

export default function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DrawerScreens"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
