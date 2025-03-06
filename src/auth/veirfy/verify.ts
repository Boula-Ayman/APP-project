import apiSlice from '../../api/apiSlice';

const verifyApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    postVerify: builder.mutation({
      query: (data) => ({
        url: '/users/account/verify',
        method: 'POST',
        body: data,
      }),
    }),
    resendVerify: builder.mutation({
      query: () => ({
        url: '/users/account/verify/resend',
        method: 'GET',
      }),
    }),
  }),
});

export const { usePostVerifyMutation, useResendVerifyMutation } =
  verifyApiSlice;
