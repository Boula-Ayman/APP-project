import apiSlice from "./apiSlice";

interface Media {
  id: number;
  type: string;
  alt_text: string | null;
  index: number;
  url: string;
}

export interface Investment {
  available_shares: number;
  id: number;
  opportunity_type: 'property' | 'project';
  media: Media[];
  country: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  about_en: string;
  about_ar: string;
  number_of_shares: number;
  share_price: number;
  unit_purchase_date: string | null;
  time_to_exit: number;
  market_valuation: number | null;
  market_valuation_date: string | null;
  rental_yield: number | null;
  rental_yield_date_from: string | null;
  rental_yield_date_to: string | null;
  currency: string;
  cta_phone_number: string;
  cta_whatsapp_number: string;
  cta_email: string;
  location_en: string;
  location_ar: string;
  number_of_bathrooms: number;
  number_of_bedrooms: number;
  area: number;
  amenities: string[];
  estimate_sales_range_start: number;
  estimate_sales_range_end: number;
  total_return_1_year: number;
  total_return_5_years: number;
  owned_shares: number;
  status: string;
}

export interface InvestmentsResponse {
  data: Investment[];
}

const investmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyInvestments: builder.query<InvestmentsResponse, void>({
      query: () => ({
        url: '/investments/customer/me/units',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetMyInvestmentsQuery,
} = investmentsApiSlice; 