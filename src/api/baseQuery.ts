import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
const ENDPOINTS_WITH_FORM_DATA = ["completeUser "];

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.propcut-staging.lightbyte.me/api",
  credentials: "include",
  prepareHeaders: (
    headers,
    { getState, endpoint }: { getState: () => RootState; endpoint: string }
  ) => {
    const token = (getState() as RootState).user?.accessToken;

    console.log("tok", token);
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    if (ENDPOINTS_WITH_FORM_DATA.includes(endpoint)) {
      headers.delete("Content-Type");
    }
    if (!headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export default baseQuery;
