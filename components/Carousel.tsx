import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Carousel from "react-native-snap-carousel";
import { Icon } from "native-base";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { cardType } from "../hook/useCards";

const catImage =
  "https://media.4-paws.org/5/b/4/b/5b4b5a91dd9443fa1785ee7fca66850e06dcc7f9/VIER%20PFOTEN_2019-12-13_209-2890x2000-1920x1329.jpg";

const CarouselComponent = ({
  dbCardList,
  setDeleteModal,
  setSelectedCard,
}: {
  dbCardList: cardType | undefined;
  setDeleteModal: () => void;
  setSelectedCard: any;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselItems = [
    { name: "Item 1", description: "Text 1", image: catImage },
    { name: "Item 2", description: "Text 2", image: catImage },
    { name: "Item 3", description: "Text 3", image: catImage },
    { name: "Item 4", description: "Text 4", image: catImage },
    { name: "Item 5", description: "Text 5", image: catImage },
  ];
  const _renderItem = ({
    item,
    index,
  }: {
    item: { description: string; name: string; image: string };
    index: number;
  }) => {
    return (
      <ImageBackground
        source={{ uri: item.image }}
        style={{
          borderRadius: 10,
          height: 190,
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <Icon
          as={MaterialCommunityIcons}
          name="delete-circle"
          size={10}
          color="#C70039"
          alignSelf="center"
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
          }}
          onPress={() => {
            setSelectedCard(item);
            setDeleteModal();
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            position: "absolute",
            width: "100%",
            top: "50%",
          }}
        >
          <Icon
            as={AntDesign}
            name="stepbackward"
            size={7}
            color="white"
            alignSelf="center"
            onPress={() => {
              setActiveIndex(index - 1);
            }}
          />
          <Icon
            as={AntDesign}
            name="stepforward"
            size={7}
            color="white"
            alignSelf="center"
            onPress={() => {
              setActiveIndex(index + 1);
            }}
          />
        </View>

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
            {item.name}
          </Text>
          <Text style={{ color: "white" }}>{item.description}</Text>
        </View>
      </ImageBackground>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      {dbCardList && (
        <Carousel
          layout={"default"}
          data={dbCardList}
          sliderWidth={300}
          itemWidth={370}
          renderItem={_renderItem}
          onSnapToItem={(index: any) => setActiveIndex(index)}
        />
      )}
    </View>
  );
};

export default CarouselComponent;

const styles = StyleSheet.create({});
