import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import ThemeColors from "./constants/ThemeColors";
import HeaderLogo from "./components/screens/auth/HeaderLogo";
import { Provider } from "react-redux";
import { store } from "./store/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="dark" />

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            contentStyle: { backgroundColor: ThemeColors.base100 },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              headerTitle: () => <HeaderLogo />,
              headerStyle: { backgroundColor: ThemeColors.base100 },
              headerTintColor: ThemeColors.primary500,
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerTitle: () => <HeaderLogo />,
              headerStyle: { backgroundColor: ThemeColors.base100 },
              headerTintColor: ThemeColors.primary500,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
