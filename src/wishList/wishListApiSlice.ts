import AsyncStorage from "@react-native-async-storage/async-storage";
import apiSlice from "../api/apiSlice";

const wishListApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getWishList: builder.query({
      query: () => ({
        url: "/users/me/wishlist",
        method: "GET",
      }),
      providesTags: ["WishList"],
    }),
    postWishList: builder.mutation({
      query(arg) {
        return {
          url: `users/me/wishlist/`,
          method: "POST",
          body: arg,
        };
      },
      invalidatesTags: ["WishList"],
    }),
    removeWishList: builder.mutation({
      query(arg) {
        return {
          url: `users/me/wishlist/${arg.id}`,
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
