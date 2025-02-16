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

interface GetSignedUrlRequest {
  original_name: string;
  size: number;
  mime_type: string;
}

interface GetSignedUrlResponse {
  data: string;
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
    getSignedUrl: builder.mutation<GetSignedUrlResponse, GetSignedUrlRequest>({
      query: (body) => ({
        url: "/users/signed-urls",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { 
  useGetCurrentUserProfileQuery,
  useUpdateUserProfileMutation,
  useUpdatePasswordMutation,
  useGetSignedUrlMutation
} = userApiSlice; 