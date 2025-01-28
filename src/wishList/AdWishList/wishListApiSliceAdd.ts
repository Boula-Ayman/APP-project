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
  overrideExisting: true,
  endpoints: (builder) => ({
    getWishList: builder.query({
      query: () => ({
        url: "/users/wishlist/me",
        method: "GET",
      }),
      providesTags: ["WishList"],
    }),
    postWishList: builder.mutation({
      query(arg) {
        return {
          url: `users/wishlist/${arg.id}`,
          method: "POST",
        };
      },
      invalidatesTags: ["WishList"],
    }),
    removeWishList: builder.mutation({
      query(arg) {
        return {
          url: `users/wishlist/${arg.id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["WishList"],
    }),
  }),
});

export const {
  usePostWishListMutation,
  useRemoveWishListMutation,
  useGetWishListQuery,
} = wishListApiSlice;
