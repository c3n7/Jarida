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
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken } from "./store/authSlice";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

function Navigation() {
  useEffect(() => {
    async function loadToken() {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        store.dispatch(setToken(token));
      }

      await SplashScreen.hideAsync();
    }
    loadToken();
  }, []);

  return (
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
  );
}
export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="dark" />

      <Navigation />
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
