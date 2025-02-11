import { combineReducers } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";
import wishListReducer from "../wishList/wishlistSlice";
import userSlice from "../auth/signin/userSlice";
import { bookingsApi } from "../api/bookingsApiSlice";

export const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [bookingsApi.reducerPath]: bookingsApi.reducer,
  wishlist: wishListReducer,
  user: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
