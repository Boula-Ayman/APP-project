import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [] as number[],
  reducers: {
    addToWishlist: (state, action) => {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      return state.filter(id => id !== action.payload);
    },
    setWishlist: (state, action) => {
      return action.payload;
    },
    clearWishlist: () => {
      return [];
    }
  }
});

export const { addToWishlist, removeFromWishlist, setWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
