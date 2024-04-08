import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserProvider } from "./hook/useUserContext";
import Login from "./screens/Login";
import Home from "./screens/Home";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSnackbarContext } from "./hook/useSnackbar";
import Snackbar from "./components/Snackbar";
import AddCard from "./screens/AddCard";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { snackBar } = useSnackbarContext();
  return (
    <SafeAreaProvider style={(styles.container, [])}>
      <Snackbar />
      <NavigationContainer>
        <UserProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Add" component={AddCard} />
          </Stack.Navigator>
        </UserProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
