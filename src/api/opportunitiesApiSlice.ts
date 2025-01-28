import apiSlice from "./apiSlice";

const opportunitiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOpportunities: builder.query({
      query: (params) => ({
        url: `/opportunities`,
        params,
        method: "GET",
      }),
    }),
    getOpportunity: builder.query({
      query: ({ id, type }) => ({
        url: `/opportunities/${type}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetOpportunitiesQuery,
  useGetOpportunityQuery,
  useLazyGetOpportunitiesQuery,
} = opportunitiesApiSlice;
