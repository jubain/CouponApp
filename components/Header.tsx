import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { IconButton } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useUserContext } from "../hook/useUserContext";
import { useSnackbarContext } from "../hook/useSnackbar";

const Header = (props: { totalCard: number }) => {
  const { user, logout } = useUserContext();

  const { openSnackBar } = useSnackbarContext();

  const navigation = useNavigation<any>();

  const handleLogout = async () => {
    await signOut(auth);
    openSnackBar("Logout successfull", "", "#00A300");
    navigation.replace("Login");
    logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          Hello, {user?._tokenResponse?.displayName ?? user?.user?.displayName}!
        </Text>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          Total Cards: {props.totalCard}
        </Text>
      </View>
      <View>
        <IconButton
          _icon={{
            as: MaterialIcons,
            name: "logout",
            color: "#B80F0A",
            size: "7",
          }}
          onPress={handleLogout}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  leftContainer: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingLeft: Platform.OS === "ios" ? 55 : 0,
    paddingBottom: 40,
  },
});
