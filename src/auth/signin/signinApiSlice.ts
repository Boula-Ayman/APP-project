import apiSlice from "../../api/apiSlice";

const signinApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postSignIn: builder.mutation({
      query: ({body}) => ({
        url: "/auth/login",
        method: "POST",
        body,
    }),
    }),
  }),
});

export const { usePostSignInMutation } = signinApiSlice;
