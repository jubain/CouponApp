import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useUserContext } from "./useUserContext";

type cardType = {
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
      getCards();
    }
  }, [company.length]);

  const getCards = async () => {
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

  return { dbCardList, isLoading, getCards };
};
