import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSnackbarContext } from "../hook/useSnackbar";

const Snackbar = ({
  duration = 2000, // Default duration in milliseconds
  position = "bottom", // Default position
  containerStyle = { marginHorizontal: 12 },
  messageStyle,
  actionTextStyle,
  textColor = "white",
  actionTextColor = "white",
}: {
  duration?: number;
  position?: string;
  containerStyle?: ViewStyle;
  messageStyle?: any;
  actionTextStyle?: any;
  textColor?: string;
  actionTextColor?: string;
}) => {
  const { snackBar, closeSnackBar } = useSnackbarContext();
  useEffect(() => {
    if (snackBar.isVisible) {
      const timeout = setTimeout(() => {
        closeSnackBar();
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [snackBar.isVisible, duration]);

  return (
    snackBar.isVisible && (
      <View
        style={[
          styles.container,
          position === "top" ? styles.topContainer : styles.bottomContainer,
          containerStyle,
          { backgroundColor: snackBar.backgroundColor },
        ]}
      >
        <Text style={[styles.messageText, messageStyle, { color: textColor }]}>
          {snackBar.message}
        </Text>
        {snackBar.actionText && (
          <TouchableOpacity onPress={snackBar.onActionPress}>
            <Text
              style={[
                styles.actionText,
                actionTextStyle,
                { color: actionTextColor },
              ]}
            >
              {snackBar.actionText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 1,
  },
  topContainer: {
    top: 15,
  },
  bottomContainer: {
    bottom: 15,
  },
  messageText: {
    fontSize: 14,
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
  },
});

export default Snackbar;
