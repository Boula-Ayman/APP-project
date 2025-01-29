import AsyncStorage from "@react-native-async-storage/async-storage";
import apiSlice from "../../api/apiSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const verifyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postVerify: builder.mutation({
      queryFn: async (formData, queryApi, extraOptions, baseQuery) => {
        try {
          const token = await AsyncStorage.getItem("access_token");
          if (!token) {
            throw new Error("No access token found");
          }
          const result = await baseQuery({
            url: "/users/account/verify",
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
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
});

export const { usePostVerifyMutation } = verifyApiSlice;
