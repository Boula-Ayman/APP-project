import { combineReducers } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";

export const rootReducer = combineReducers({
  // Add your reducers here
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
