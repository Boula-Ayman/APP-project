import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import { Opportunity } from '@/commonComponent/PropertyCard/PropertyCard';

export interface Media {
  id: number;
  type: string;
  alt_text: string | null;
  index: number;
  url: string;
}

export interface Property {
  id: number;
  media: Media[];
  title_en: string;
  title_ar: string;
  location_en: string;
  location_ar: string;
}

export interface Customer {
  id: number;
  email: string;
  name: string;
}

export interface Admin {
  id: number;
  email: string;
  name: string;
}

export interface Booking {
  id: number;
  status: 'pending' | 'cancelled' | 'confirmed' | 'rejected';
  property: Property;
  from: string;
  to: string;
  admin: Admin | null;
  customer: Customer;
  weighted_number_of_days: number;
  created_at: string;
  updated_at: string;
  number_of_days: number;
}

export interface BookingsResponse {
  data: Booking[];
}

export interface TransformedBookingData {
  booking: Booking;
  propertyCardData: Opportunity;
}

export interface TransformedBookingsResponse {
  data: TransformedBookingData[];
}

const transformBookingToPropertyCard = (booking: Booking): TransformedBookingData => {
  return {
    booking,
    propertyCardData: {
      id: booking.property.id.toString(),
      media: booking.property.media,
      country: "Egypt",
      opportunity_type: "booking",
      share_price: 0,
      currency: "USD",
      available_shares: 0,
      number_of_shares: 0,
      title_ar: booking.property.title_ar,
      title_en: booking.property.title_en,
      location_ar: booking.property.location_ar,
      location_en: booking.property.location_en,
      status: booking.status
    }
  };
};

export const bookingsApi = createApi({
  reducerPath: 'bookingsApi',
  baseQuery,
  tagTypes: ['Bookings'],
  endpoints: (builder) => ({
    getMyBookings: builder.query<TransformedBookingsResponse, void>({
      query: () => ({
        url: '/bookings/customer/me',
        method: 'GET',
      }),
      transformResponse: (response: BookingsResponse): TransformedBookingsResponse => ({
        data: response.data.map(transformBookingToPropertyCard)
      }),
      providesTags: ['Bookings'],
    }),
    getBooking: builder.query<{ data: TransformedBookingData }, string>({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: Booking }): { data: TransformedBookingData } => ({
        data: transformBookingToPropertyCard(response.data)
      }),
      providesTags: ['Bookings'],
    }),
    cancelBooking: builder.mutation<void, string>({
      query: (id) => ({
        url: `/bookings/${id}/cancel`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Bookings'],
    }),
    rescheduleBooking: builder.mutation<void, { id: string; from: string; to: string }>({
      query: ({ id, from, to }) => ({
        url: `/bookings/${id}/reschedule`,
        method: 'PATCH',
        body: { from, to },
      }),
      invalidatesTags: ['Bookings'],
    }),
  }),
});

export const {
  useGetMyBookingsQuery,
  useGetBookingQuery,
  useCancelBookingMutation,
  useRescheduleBookingMutation,
} = bookingsApi; 