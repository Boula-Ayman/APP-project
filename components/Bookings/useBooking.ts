import { useGetBookingQuery, useCancelBookingMutation, useRescheduleBookingMutation } from '@/src/api/bookingsApiSlice';
import type { TransformedBookingData, Booking } from '@/src/api/bookingsApiSlice';
import { isWithinInterval, addDays, isPast } from 'date-fns';

const useBooking = (id: string) => {
  const { data: bookingResponse, isLoading, error } = useGetBookingQuery(id, {
    refetchOnMountOrArgChange: true
  });
  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();
  const [rescheduleBooking, { isLoading: isRescheduling }] = useRescheduleBookingMutation();

  const transformedBookingResponse = bookingResponse?.data as TransformedBookingData | undefined;
  const booking = transformedBookingResponse?.booking;

  const isWithin72HoursBeforeBooking = booking?.from && isWithinInterval(new Date(), {
    start: addDays(new Date(booking.from), -3),
    end: addDays(new Date(booking.from), 1) // The 1 is used to extend the end date to include the full day of the end booking date
  });

  const hasBookingPassed = booking?.from && isPast(new Date(booking.from));

  const shouldShowDirections : boolean = booking?.status === 'cancelled' || isWithin72HoursBeforeBooking || hasBookingPassed || false;

  return {
    booking,
    isLoading,
    error,
    isCancelling,
    isRescheduling,
    cancelBooking,
    rescheduleBooking,
    shouldShowDirections
  };
};

export default useBooking; 