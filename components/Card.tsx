import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import React from "react";

const CardComponent = ({
  isSelected,
  handleMinimizeCard,
  card,
}: {
  isSelected: boolean;
  handleMinimizeCard: () => void;
  card: {
    company: string;
    color: string;
    price: string;
    zIndex: number;
    image: ImageSourcePropType;
    fontColor: string;
  };
}) => {
  return (
    <View
      style={{
        padding: 5,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Text
          style={{ fontSize: 25, color: card.fontColor, fontWeight: "bold" }}
        >
          {card.company}
        </Text>
        {isSelected && (
          <TouchableOpacity onPress={handleMinimizeCard}>
            <Feather
              name="minimize-2"
              size={24}
              color={card.fontColor}
              style={{
                borderWidth: 1,
                borderRadius: 5,
                padding: 8,
                borderColor: card.fontColor,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CardComponent;

const styles = StyleSheet.create({});
