import apiSlice from "./apiSlice";
import { User, ResponseData, Gender } from "../interfaces/common.interface";

export interface UpdateUserProfileData {
  name?: string;
  phone_number?: string | null;
  birth_date?: string | null;
  job_title?: string | null;
  country?: string | null;
  gender?: Gender | null;
  image_url?: string | null;
  secondary_email?: string | null;
}

export interface UpdatePasswordData {
  current_password: string;
  new_password: string;
}

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUserProfile: builder.query<ResponseData<User>, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 0,
    }),
    updateUserProfile: builder.mutation<ResponseData<User>, UpdateUserProfileData>({
      query: (data) => {
        return {
          url: "/users/me",
          method: "PATCH", 
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),
    updatePassword: builder.mutation<ResponseData<void>, UpdatePasswordData>({
      query: (data) => ({
        url: "/auth/password/update",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { 
  useGetCurrentUserProfileQuery,
  useUpdateUserProfileMutation,
  useUpdatePasswordMutation
} = userApiSlice; 