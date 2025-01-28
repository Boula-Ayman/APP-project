import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
  likedItems: number[];
}

const initialState: WishlistState = {
  likedItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<number>) {
      if (!state.likedItems.includes(action.payload)) {
        state.likedItems.push(action.payload);
      }
    },
    removeFromWishlist(state, action: PayloadAction<number>) {
      state.likedItems = state.likedItems.filter(
        (item) => item !== action.payload
      );
    },
    setWishlist(state, action: PayloadAction<number[]>) {
      state.likedItems = action.payload;
    },
    clearWishlist(state) {
      state.likedItems = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, setWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
