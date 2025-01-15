import apiSlice from "./apiSlice";

const opportunitiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOpportunities: builder.query({
      query: () => ({
        url: "/opportunities",
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

// Export hooks for usage in functional components
export const { useGetOpportunitiesQuery, useGetOpportunityQuery } =
  opportunitiesApiSlice;
