import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store, useAppSelector } from "./store/store";
import * as SplashScreen from "expo-splash-screen";
import { useLayoutEffect } from "react";
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
      const username = await AsyncStorage.getItem("username");
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
