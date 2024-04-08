import { ImageSourcePropType } from "react-native";

export const cardTypes = [
  { name: "Groceries", id: "Grocery", icon: "shopping-bag" },
  { name: "Shopping", id: "Shopping", icon: "tshirt" },
  { name: "Food", id: "Food", icon: "hamburger" },
  { name: "Gaming", id: "Game", icon: "gamepad" },
];

export const cards: {
  name: string;
  color: string;
  price: string;
  zIndex: number;
  imgSrc: ImageSourcePropType;
  fontColor: string;
  type: "Grocery" | "Shopping" | "Food" | "Game";
}[] = [
  {
    name: "Aldi",
    color: "#a9d0b6",
    price: "30 CHF",
    zIndex: 2,
    imgSrc: require("../screens/images/aldi.jpeg"),
    fontColor: "black",
    type: "Grocery",
  },
  {
    name: "Asda",
    color: "#e9bbd1",
    price: "64 CHF",
    zIndex: 3,
    imgSrc: require("../screens/images/asda.jpeg"),
    fontColor: "white",
    type: "Grocery",
  },
  {
    name: "Lidl",
    color: "#eba65c",
    price: "80 CHF",
    zIndex: 4,
    imgSrc: require("../screens/images/lidl.jpeg"),
    fontColor: "white",
    type: "Grocery",
  },
  {
    name: "Morisson",
    color: "#95c3e4",
    price: "85 CHF",
    zIndex: 5,
    imgSrc: require("../screens/images/morisson.png"),
    fontColor: "white",
    type: "Grocery",
  },
  {
    name: "Tesco",
    color: "#a390bc",
    price: "92 CHF",
    zIndex: 6,
    imgSrc: require("../screens/images/tesco.jpeg"),
    fontColor: "white",
    type: "Grocery",
  },
  {
    name: "Primark",
    color: "#a390bc",
    price: "92 CHF",
    zIndex: 1,
    imgSrc: require("../screens/images/primark.jpeg"),
    fontColor: "white",
    type: "Shopping",
  },
  {
    name: "Next",
    color: "#a390bc",
    price: "92 CHF",
    zIndex: 2,
    imgSrc: require("../screens/images/next.jpeg"),
    fontColor: "white",
    type: "Shopping",
  },
  {
    name: "New Look",
    color: "#a390bc",
    price: "92 CHF",
    zIndex: 3,
    imgSrc: require("../screens/images/newlook.jpeg"),
    fontColor: "white",
    type: "Shopping",
  },
  {
    name: "Uniqlo",
    color: "#a390bc",
    price: "92 CHF",
    zIndex: 4,
    imgSrc: require("../screens/images/uniqlo.png"),
    fontColor: "black",
    type: "Shopping",
  },
  {
    name: "Xbox",
    color: "#a390bc",
    price: "92 CHF",
    zIndex: 4,
    imgSrc: require("../screens/images/xbox.png"),
    fontColor: "white",
    type: "Game",
  },
  {
    name: "Play Station",
    color: "#a390bc",
    price: "92 CHF",
    zIndex: 4,
    imgSrc: require("../screens/images/ps.png"),
    fontColor: "white",
    type: "Game",
  },
];
