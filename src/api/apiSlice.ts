import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const apiSlice = createApi({
  baseQuery: baseQuery,
  reducerPath: "api",
  endpoints: () => ({}),
});

export default apiSlice;
