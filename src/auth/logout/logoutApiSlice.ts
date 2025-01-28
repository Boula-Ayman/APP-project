import AsyncStorage from "@react-native-async-storage/async-storage";
import apiSlice from "../../api/apiSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const logoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postLogout: builder.mutation({
      queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        try {
          const token = await AsyncStorage.getItem("access_token");
          if (!token) {
            throw new Error("No access token found");
          }
          const result = await baseQuery({
            url: "/auth/logout",
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return result;
        } catch (error) {
          const fetchError: FetchBaseQueryError = {
            status: 401,
            data: {
              message: error instanceof Error ? error.message : "Unknown error",
            },
          };
          return { error: fetchError, data: undefined };
        }
      },
    }),
  }),
  overrideExisting: true, // Allow overriding existing endpoints
});

export const { usePostLogoutMutation } = logoutApiSlice;
