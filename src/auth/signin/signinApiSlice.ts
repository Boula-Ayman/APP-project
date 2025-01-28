import apiSlice from "../../api/apiSlice";

const signinApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postSignIn: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { usePostSignInMutation } = signinApiSlice;
