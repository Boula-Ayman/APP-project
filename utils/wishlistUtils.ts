import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "redux";
import { setWishlist } from "../src/wishList/wishlistSlice";

export const loadLikedItems = async (dispatch: Dispatch) => {
  const storedLikedItems = await AsyncStorage.getItem("likedItems");
  if (storedLikedItems) {
    dispatch(setWishlist(JSON.parse(storedLikedItems)));
  }
};
