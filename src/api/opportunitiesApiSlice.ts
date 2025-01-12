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
    postFilterRequest: builder.mutation({
      queryFn: async (filterData) => {
        const response = await fetch("/opportunities/filter", {
          method: "POST",
          body: JSON.stringify(filterData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.json();
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetOpportunitiesQuery,
  useGetOpportunityQuery,
  usePostFilterRequestMutation,
} = opportunitiesApiSlice;
