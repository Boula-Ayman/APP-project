import apiSlice from './apiSlice';

export interface RentsResponse {
  data: {
    total_amount: number;
    currency: string;
    total_yield: number;
  };
}

const rentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyRents: builder.query<RentsResponse, void>({
      query: () => ({
        url: '/rents/customer/me',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetMyRentsQuery } = rentsApiSlice;
