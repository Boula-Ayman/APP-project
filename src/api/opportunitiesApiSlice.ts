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
    opportunityRegisterInterest: builder.mutation({
      query: ({ id, body, type }) => ({
        url: `/opportunities/register-interest/${id}?opportunity_type=${type}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetOpportunitiesQuery,
  useGetOpportunityQuery,
  useLazyGetOpportunitiesQuery,
  useOpportunityRegisterInterestMutation,
} = opportunitiesApiSlice;
