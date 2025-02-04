import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: number[] = [];

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<number>) {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
      }
    },
    removeFromWishlist(state, action: PayloadAction<number>) {
      state = state.filter(
        (item) => item !== action.payload
      );
    },
    setWishlist(state, action: PayloadAction<number[]>) {
      state = action.payload;
    },
    clearWishlist(state) {
      state = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, setWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
