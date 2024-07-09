import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListJournals from "./ListJournals";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ThemeColors from "@/constants/ThemeColors";
import EditJournal from "./EditJournal";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerContentStyle: { backgroundColor: ThemeColors.base100 },
        sceneContainerStyle: { backgroundColor: ThemeColors.base200 },
        drawerActiveTintColor: ThemeColors.primary500,
        headerTintColor: ThemeColors.primary500,
      }}
    >
      <Drawer.Screen
        name="ListJournals"
        component={ListJournals}
        options={({ navigation }) => ({
          title: "Home",
          headerRight: ({ tintColor }) => (
            <Pressable
              style={styles.headerIcon}
              onPress={() => navigation.navigate("EditJournal")}
            >
              <Ionicons name="add" size={24} color={tintColor} />
            </Pressable>
          ),
        })}
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
      <Stack.Screen
        name="EditJournal"
        component={EditJournal}
        options={{ headerTintColor: ThemeColors.primary500 }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    marginRight: 12,
  },
});
