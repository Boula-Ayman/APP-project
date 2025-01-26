import AsyncStorage from "@react-native-async-storage/async-storage";
import apiSlice from "../../api/apiSlice";

// Function to get the access token using AsyncStorage
const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem("access_token");
    return token || "";
  } catch (error) {
    console.error("Failed to retrieve access token:", error);
    return "";
  }
};

const wishListApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postWishList: builder.mutation({
      async queryFn({ id }, _queryApi, _extraOptions, fetchWithBQ) {
        const token = await getAccessToken();
        const result = await fetchWithBQ({
          url: `users/wishlist/${id}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return result.error ? { error: result.error } : { data: result.data };
      },
    }),
    removeWishList: builder.mutation({
      async queryFn({ id }, _queryApi, _extraOptions, fetchWithBQ) {
        const token = await getAccessToken();
        const result = await fetchWithBQ({
          url: `users/wishlist/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return result.error ? { error: result.error } : { data: result.data };
      },
    }),
  }),
});

export const { usePostWishListMutation, useRemoveWishListMutation } =
  wishListApiSlice;
