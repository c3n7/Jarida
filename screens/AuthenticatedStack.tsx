import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListJournals from "./ListJournals";

const Stack = createNativeStackNavigator();
export default function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListJournals"
        component={ListJournals}
        options={{ title: "My Journals" }}
      />
    </Stack.Navigator>
  );
}
