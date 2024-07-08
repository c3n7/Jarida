import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store, useAppSelector } from "./store/store";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken } from "./store/authSlice";
import AuthenticationStack from "./screens/AuthenticationStack";
import AuthenticatedStack from "./screens/AuthenticatedStack";

SplashScreen.preventAutoHideAsync();

function Navigation() {
  const token = useAppSelector((state) => state.auth.token);
  useLayoutEffect(() => {
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
      {!token && <AuthenticationStack />}
      {token && <AuthenticatedStack />}
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
