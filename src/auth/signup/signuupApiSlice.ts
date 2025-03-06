import apiSlice from '../../api/apiSlice';

const signuupApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postSignUp: builder.mutation({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const { usePostSignUpMutation } = signuupApiSlice;
