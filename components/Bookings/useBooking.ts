import { useMemo } from 'react';
import { useGetBookingQuery, useCancelBookingMutation, useRescheduleBookingMutation } from '@/src/api/bookingsApiSlice';
import type { TransformedBookingData, Booking } from '@/src/api/bookingsApiSlice';
import { isPast } from 'date-fns';

const useBooking = (id: string) => {
  const { data: bookingResponse, isLoading, error } = useGetBookingQuery(id, {
    refetchOnMountOrArgChange: true
  });
  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();
  const [rescheduleBooking, { isLoading: isRescheduling }] = useRescheduleBookingMutation();

  const transformedBookingResponse = bookingResponse?.data as TransformedBookingData | undefined;
  const booking = transformedBookingResponse?.booking;

  const isBookingPast = useMemo(() => {
    if (!booking?.to) return false;
    return isPast(new Date(booking.to));
  }, [booking?.to]);

  const shouldShowDirections = booking?.status === 'cancelled' || isBookingPast;

  return {
    booking,
    isLoading,
    error,
    isCancelling,
    isRescheduling,
    cancelBooking,
    rescheduleBooking,
    isBookingPast,
    shouldShowDirections
  };
};

export default useBooking; 