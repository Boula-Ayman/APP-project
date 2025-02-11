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
      query: ({ id }) => ({
        url: `/opportunities/${id}`,
        method: "GET",
      }),
    }),
    opportunityRegisterInterest: builder.mutation({
      query: ({ id, body }) => ({
        url: `/opportunities/${id}/interest-requests`,
        method: "POST",
        body,
      }),
    }),
    sellSharesOpportunity: builder.mutation({
      query: ({ id }) => ({
        url: `/opportunities/${id}/sell-requests`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetOpportunitiesQuery,
  useGetOpportunityQuery,
  useLazyGetOpportunitiesQuery,
  useOpportunityRegisterInterestMutation,
  useSellSharesOpportunityMutation,
} = opportunitiesApiSlice;
