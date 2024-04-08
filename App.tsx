import { NativeBaseProvider } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "./hook/useAuth";
import { SnackbarProvider } from "./hook/useSnackbar";
import Navigation from "./Navigation";

const Stack = createNativeStackNavigator();

export default function App() {
  const user = useAuth();

  return (
      <NativeBaseProvider>
        <SnackbarProvider>
          <Navigation />
        </SnackbarProvider>
      </NativeBaseProvider>
  );
}
