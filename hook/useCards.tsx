import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, storage } from "../config/firebase";
import { useUserContext } from "./useUserContext";
import { err } from "react-native-svg";
import { deleteObject, ref } from "firebase/storage";

export type cardType = {
  category: string;
  company: string;
  description: string;
  email: string;
  id: string;
  image: string;
  name: string;
}[];

export const useGetCards = (company: string) => {
  const [dbCardList, setDbCardList] = useState<cardType>();
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUserContext();
  useEffect(() => {
    if (company.length) {
      getCards(company);
    }
  }, [company]);

  const getCards = async (company: string) => {
    try {
      setIsLoading(true);

      const q = query(
        collection(db, "Coupon"),
        // where("email", "==", user.email ?? user._tokenResponse.email),
        where("company", "==", company)
      );

      const querySnapshot = await getDocs(q);
      let coupons: cardType = [];
      querySnapshot.docs.forEach((doc: any) => {
        coupons.push({ ...doc.data(), id: doc.id });
      });

      setDbCardList(coupons);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const refetch = () => {
    getCards(company);
  };

  return { dbCardList, isLoading, getCards, refetch };
};

export const useDeleteCard = async (id: string) => {
  try {
    const card = await deleteDoc(doc(db, "Coupon", id));
    console.log(card);
  } catch (error) {
    console.error(error);
  }
};

export const useDeleteImage = async (image: string) => {
  try {
    // Create a reference to the file to delete
    const desertRef = ref(storage, image);

    // Delete the file
    await deleteObject(desertRef);
  } catch (error) {
    console.error(error);
  }
};
