import apiSlice from "../../api/apiSlice";

const signuupApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postSignUp: builder.mutation({
      query: (formData) => ({
        url: "/auth/signup",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { usePostSignUpMutation } = signuupApiSlice;
