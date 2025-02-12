import { combineReducers } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";
import userSlice from "../auth/signin/userSlice";

export const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  user: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
