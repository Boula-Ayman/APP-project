import apiSlice from '../../api/apiSlice';

const logoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: true, // Allow overriding existing endpoints
});

export const { useLogoutMutation } = logoutApiSlice;
