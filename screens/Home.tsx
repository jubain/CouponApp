import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Animated,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";
import Buttons from "../components/Buttons";
import CardComponent from "../components/Card";
import { Icon, ZStack } from "native-base";
import { EvilIcons } from "@expo/vector-icons";
import Popup from "../components/Popup";
import { useUserContext } from "../hook/useUserContext";
import { useGetCards } from "../hook/useCards";

const cardHeight = 250;
const cardTitle = 45;
const cardPadding = 10;

const { height } = Dimensions.get("window");
const cards: {
  company: string;
  color: string;
  price: string;
  zIndex: number;
  image: ImageSourcePropType;
  fontColor: string;
  category: "Grocery" | "Shopping" | "Food" | "Game";
}[] = [
  {
    company: "Aldi",
    color: "#a9d0b6",
    price: "30 CHF",
    zIndex: 2,
    image: require("./images/aldi.jpeg"),
    fontColor: "black",
    category: "Grocery",
  },
  {
    company: "Asda",
    color: "#e9bbd1",
    price: "64 CHF",
    zIndex: 3,
    image: require("./images/asda.jpeg"),
    fontColor: "white",
    category: "Grocery",
  },
  {
    company: "Lidl",
    color: "#eba65c",
    price: "80 CHF",
    zIndex: 4,
    image: require("./images/lidl.jpeg"),
    fontColor: "white",
    category: "Grocery",
  },
  {
    company: "Morisson",
    color: "#95c3e4",
    price: "85 CHF",
    zIndex: 5,
    image: require("./images/morisson.png"),
    fontColor: "white",
    category: "Grocery",
  },
  {
    company: "Tesco",
    color: "#a390bc",
    price: "92 CHF",
    zIndex: 6,
    image: require("./images/tesco.jpeg"),
    fontColor: "white",
    category: "Grocery",
  },
  {
    company: "Primark",
    color: "#a390bc",
    price: "92 CHF",
    zIndex: 1,
    image: require("./images/primark.jpeg"),
    fontColor: "white",
    category: "Shopping",
  },
  {
    company: "Next",
    color: "#a390bc",
    price: "92 CHF",
    zIndex: 2,
    image: require("./images/next.jpeg"),
    fontColor: "white",
    category: "Shopping",
  },
  {
    company: "New Look",
    color: "#a390bc",
    price: "92 CHF",
    zIndex: 3,
    image: require("./images/newlook.jpeg"),
    fontColor: "white",
    category: "Shopping",
  },
  {
    company: "Uniqlo",
    color: "#a390bc",
    price: "92 CHF",
    zIndex: 4,
    image: require("./images/uniqlo.png"),
    fontColor: "black",
    category: "Shopping",
  },
  {
    company: "Xbox",
    color: "#a390bc",
    price: "92 CHF",
    zIndex: 4,
    image: require("./images/xbox.png"),
    fontColor: "white",
    category: "Game",
  },
  {
    company: "Play Station",
    color: "#a390bc",
    price: "92 CHF",
    zIndex: 4,
    image: require("./images/ps.png"),
    fontColor: "white",
    category: "Game",
  },
];

const cardTypes = [
  { name: "Groceries", id: "Grocery" },
  { name: "Shopping", id: "Shopping" },
  { name: "Food", id: "Food" },
  { name: "Gaming", id: "Game" },
];

const Home = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );

  const [cardList, setCardList] = useState(cards);

  const [selectedCardType, setSelectedCardType] = useState("Grocery");

  const [deleteClicked, setDeleteClicked] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState("");

  const { user } = useUserContext();

  const { dbCardList } = useGetCards(selectedCompany);

  const y = useRef(new Animated.Value(0)).current;

  const handleMinimizeCard = () => {
    setSelectedCardIndex(null);
  };

  useEffect(() => {
    const updatedCardList = cards.filter(
      (c) => c.category === selectedCardType
    );
    setCardList(updatedCardList);
  }, [selectedCardType]);

  return (
    <SafeAreaView style={styles.root}>
      <Popup
        isModalOpen={isModalOpen}
        onModalClose={() => setIsModalOpen(false)}
        title="Delete Card"
      />
      <LinearGradient
        colors={["rgba(9,119,121,1)", "transparent"]}
        style={styles.background}
      ></LinearGradient>
      <Header totalCard={cards.length} />
      <View style={styles.chipContainer}>
        {cardTypes.map((cardType) => (
          <TouchableOpacity
            style={[
              styles.chip,
              {
                backgroundColor:
                  selectedCardType === cardType.id ? "black" : "white",
                elevation: selectedCardType === cardType.id ? 10 : 0,
              },
            ]}
            key={cardType.name}
            onPress={() => {
              setSelectedCardType(cardType.id);
              // setSelectedCompany(cardType.company);
            }}
          >
            <Text
              style={{
                color: selectedCardType === cardType.id ? "white" : "black",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              {cardType.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={styles.container}
        // onPress={() => setSelectedCardIndex(null)}
      >
        <View style={[StyleSheet.absoluteFill]}>
          {cardList.map((card, i) => {
            const inputRange = [-cardHeight, 0];
            const outputRange = [cardHeight * i, (cardHeight - cardTitle) * -i];
            if (i > 0) {
              inputRange.push(cardPadding * i);
              outputRange.push((cardHeight - cardPadding) * -i);
            }
            const translateY = y.interpolate({
              inputRange,
              outputRange,
              extrapolateRight: "clamp",
            });

            const cardStyle = {
              zIndex: selectedCardIndex === i ? card.zIndex : 1,
              elevation: selectedCardIndex === i ? 5 : 0,
            };
            if (selectedCardType == card.category) {
              return (
                <Animated.View
                  key={card.company}
                  style={[{ transform: [{ translateY }] }, cardStyle]}
                >
                  {deleteClicked && (
                    <TouchableOpacity
                      style={{
                        position:
                          Platform.OS === "ios" ? "relative" : "absolute",
                        zIndex: 20,
                        right: 0,
                      }}
                      onPress={() => {
                        setIsModalOpen(true);
                      }}
                    >
                      <Icon
                        as={EvilIcons}
                        name="minus"
                        size={8}
                        color="#FF0000"
                        alignSelf="center"
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      !selectedCardIndex && setSelectedCardIndex(i);
                      setSelectedCompany(card?.company);
                    }}
                    style={{
                      opacity:
                        selectedCardIndex === null
                          ? 1
                          : i === selectedCardIndex
                          ? 1
                          : 0.1,
                      elevation:
                        selectedCardIndex && i === selectedCardIndex ? 10 : 0,
                    }}
                  >
                    <ImageBackground
                      style={[
                        styles.card,
                        {
                          backgroundColor: card.color,
                        },
                      ]}
                      source={card.image}
                      imageStyle={{ borderRadius: 10 }}
                    >
                      <CardComponent
                        isSelected={i === selectedCardIndex}
                        handleMinimizeCard={handleMinimizeCard}
                         card={card}
                      />
                    </ImageBackground>
                  </TouchableOpacity>
                </Animated.View>
              );
            }
          })}
        </View>
        {/* <View> */}
        <Buttons
          propStyles={[
            {
              transform: [{ translateY: y }],
            },
          ]}
          setDeleteClicked={setDeleteClicked}
        />
        {/* </View> */}
        <Animated.ScrollView
          scrollEventThrottle={16}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y },
                },
              },
            ],
            { useNativeDriver: true }
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  container: {
    flex: 1,
  },
  content: {
    height: height * 2,
  },
  card: {
    height: cardHeight,
    borderRadius: 10,
    marginBottom: cardPadding,
  },
  chipContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    paddingHorizontal: Platform.OS === "ios" ? 10 : 0,
  },
  chip: {
    backgroundColor: "black",
    width: 80,
    borderRadius: 20,
    paddingHorizontal: Platform.OS === "ios" ? 6 : 10,
    paddingVertical: Platform.OS === "ios" ? 12 : 10,
  },
});

export default Home;
