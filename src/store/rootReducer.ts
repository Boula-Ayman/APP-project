import { combineReducers } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";
import wishlistReducer from "../wishList/wishlistSlice";

export const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  wishlist: wishlistReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
