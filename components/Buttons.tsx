import {
  Animated,
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { Button, Icon } from "native-base";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const dimensions = Dimensions.get("screen");

const Buttons = ({
  propStyles,
  setDeleteClicked,
}: {
  propStyles: any;
  setDeleteClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigation = useNavigation<any>();

  return (
    <Animated.View style={styles.container}>
      <View style={{ width: 80 }}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Add")}
        >
          <Icon
            as={Feather}
            name="credit-card"
            size={8}
            color="#0694a3"
            alignSelf="center"
          />
        </TouchableOpacity>
        <Text style={{ textAlign: "center", fontSize: 15, color: "gray" }}>
          Add
        </Text>
      </View>
    </Animated.View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    position: "absolute",
    bottom: "7%",
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#0694a3",
    width: "100%",
    paddingVertical: 20,
  },
  removeButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#a30625",
    width: "100%",
    borderRadius: 20,
    paddingVertical: 20,
  },
});
