import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import React from "react";
import CarouselComponent from "./Carousel";
import { cardType } from "../hook/useCards";

const CardComponent = ({
  isSelected,
  handleMinimizeCard,
  card,
  dbCardList,
  setDeleteModal,
  setSelectedCard,
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
  dbCardList: cardType | undefined;
  setDeleteModal: () => void;
  setSelectedCard: any;
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
            <AntDesign
              name="closecircleo"
              size={26}
              color={card.fontColor}
              style={{
                padding: 8,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
      {isSelected && (
        <View style={{ height: 190, zIndex: 101, width: "100%" }}>
          <CarouselComponent
            setDeleteModal={setDeleteModal}
            dbCardList={dbCardList}
            setSelectedCard={setSelectedCard}
          />
        </View>
      )}
    </View>
  );
};

export default CardComponent;

const styles = StyleSheet.create({});
