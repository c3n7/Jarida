import ThemeColors from "@/constants/ThemeColors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./SignIn";
import HeaderLogo from "@/components/screens/auth/HeaderLogo";
import SignUp from "./SignUp";

const Stack = createNativeStackNavigator();

export default function AuthenticationStack() {
  return (
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
  );
}
