import { combineReducers } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";
import wishListReducer from "../wishList/wishlistSlice";
import userSlice from "../auth/signin/userSlice";

export const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  wishlist: wishListReducer,
  user: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
