import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, FormControl, Icon, Input, Pressable } from "native-base";
import { MaterialIcons, Fontisto } from "@expo/vector-icons";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useUserContext } from "../hook/useUserContext";
import { useNavigation } from "@react-navigation/native";
import { useSnackbarContext } from "../hook/useSnackbar";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "devika@gmail.com",
    password: "Devika123",
    displayName: "",
  });

  const [showPassword, setshowPassword] = useState(false);

  const { login } = useUserContext();

  const navigation = useNavigation<any>();

  const { openSnackBar } = useSnackbarContext();

  const loginAndRisterHandler = async (type: string) => {
    try {
      let response: any;
      if (type === "login") {
        if (loginDetails.email === "" || loginDetails.password === "") {
          openSnackBar(
            "Email or Password cannot be empty",
            "Dismiss",
            "#B22222"
          );
          return;
        }
        response = await signInWithEmailAndPassword(
          auth,
          loginDetails.email,
          loginDetails.password
        );
        openSnackBar("Login successful", "", "#00A300");
      } else {
        if (
          loginDetails.displayName === "" ||
          loginDetails.email === "" ||
          loginDetails.password === ""
        ) {
          openSnackBar(
            "Email, Password or Display cannot be empty",
            "Dismiss",
            "#B22222"
          );
          return;
        }
        response = await createUserWithEmailAndPassword(
          auth,
          loginDetails.email,
          loginDetails.password
        );

        await updateProfile(response.user, {
          displayName: loginDetails.displayName,
        });
      }
      login(response);
      openSnackBar("Sign up successfull", "", "#00A300");
      navigation.replace("Home");
    } catch (error: any) {
      openSnackBar(error.code, "Dismiss", "#B22222");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/adaptive-icon.png")}
        style={{ width: 300, height: 100, marginBottom: 15 }}
      />
      <Text style={{ fontSize: 25, marginBottom: "10%", fontWeight: "bold" }}>
        Jubs Coupon
      </Text>
      <FormControl isRequired style={styles.formContainer}>
        <Input
          placeholder="Display Name"
          onChangeText={(value) =>
            setLoginDetails({ ...loginDetails, displayName: value })
          }
          variant="outline"
          isRequired
          value={loginDetails.displayName}
          type="text"
          size="lg"
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="person" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
        />
        <View style={{ marginBottom: 10, marginTop: 10 }}>
          <Input
            placeholder="Email"
            onChangeText={(value) =>
              setLoginDetails({ ...loginDetails, email: value })
            }
            variant="outline"
            value={loginDetails.email}
            isRequired
            type="text"
            size="lg"
            keyboardType="email-address"
            InputLeftElement={
              <Icon
                as={<Fontisto name="email" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Input
            placeholder="Password"
            onChangeText={(value) =>
              setLoginDetails({ ...loginDetails, password: value })
            }
            variant="outline"
            value={loginDetails.password}
            isRequired
            type={showPassword ? "text" : "password"}
            size="lg"
            InputRightElement={
              <Pressable onPress={() => setshowPassword(!showPassword)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={showPassword ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
          />
        </View>

        <Button
          onPress={() => {
            loginAndRisterHandler("login");
          }}
          mt="5"
          colorScheme="cyan"
        >
          <Text style={{ fontSize: 18, color: "white" }}>Login</Text>
        </Button>
        <Button
          onPress={() => loginAndRisterHandler("register")}
          mt="5"
          colorScheme="violet"
        >
          <Text style={{ fontSize: 18, color: "white" }}>Sign up</Text>
        </Button>
      </FormControl>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  formContainer: {
    width: "65%",
  },
});
