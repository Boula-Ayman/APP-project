import apiSlice from "../../api/apiSlice";

const forgotPasswordApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    requestPasswordReset: builder.mutation({
      query: ({ email, reset_password_page_pathname }) => ({
        url: "/auth/password/reset",
        method: "GET",
        params: { email, reset_password_page_pathname },
      }),
    }),
  }),
});

export const { useRequestPasswordResetMutation } = forgotPasswordApiSlice;
