import { fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { AuthResponse } from "../interfaces/auth.interface";
import { clearUser, setUser } from "../auth/signin/userSlice";
import { router } from "expo-router";
import { isUnauthorizedStatus } from "@/utils/statusCode";

const ENDPOINTS_WITH_FORM_DATA: string[] = [];

const baseQueryWithoutAuth = fetchBaseQuery({
    baseUrl: "https://api.propcut-staging.lightbyte.me/api",
    credentials: "include",
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as RootState).user.accessToken;
  
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
      if (ENDPOINTS_WITH_FORM_DATA.includes(endpoint)) {
        headers.delete("Content-Type");
      }
      if (!headers.has("Authorization") && token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
});

const baseQuery = async (args: any, api: any, extraOptions: any) => {
    try {
        let result = await baseQueryWithoutAuth(args, api, extraOptions);
  
      if (
        result.error &&
        isUnauthorizedStatus((result.error as FetchBaseQueryError).status as number) &&
        (api.getState() as RootState).auth?.token
      ) {
        // Try to refresh the token
        const refreshResult = await baseQueryWithoutAuth(
          { url: "/auth/refresh", method: "POST" },
          api,
          extraOptions
        );
  
        if (refreshResult.data) {
          const { access_token, user } = (refreshResult.data as AuthResponse)
            .data;
  
          api.dispatch(
            setUser({
              user: user,
              token: access_token,
            })
          );
  
          // Debug log after dispatch
          console.log(
            "Auth state after dispatch:",
            (api.getState() as RootState).auth
          );
  
          // Retry the original request
          result = await baseQueryWithoutAuth(args, api, extraOptions);
  
          if (
            result.error &&
            isUnauthorizedStatus((result.error as FetchBaseQueryError).status as number)
          ) {
            api.dispatch(clearUser());
            router.navigate('/Welcome');
          }
        } else {
          api.dispatch(clearUser());
          router.navigate('/Welcome');
        }
      }
  
      return result;
    } catch (error) {
      // Handle any unexpected errors
      console.error("API request failed:", error);
      api.dispatch(clearUser());
      return { error: { status: "FETCH_ERROR", error: "Failed to fetch" } };
    }
  };

export default baseQuery;
