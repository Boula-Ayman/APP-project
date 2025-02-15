import React from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { useGetMyBookingsQuery } from '@/src/api/bookingsApiSlice';
import type { Booking } from '@/src/api/bookingsApiSlice';
import PropertyCard from '@/commonComponent/PropertyCard/PropertyCard';
import { router } from 'expo-router';
import { isPast } from 'date-fns';

interface BookingListProps {
  activeTab: 'upcoming' | 'past';
}

const BookingList: React.FC<BookingListProps> = ({ activeTab }) => {
  const { data: bookingsResponse, isLoading, error } = useGetMyBookingsQuery();

  const handleBookingPress = (booking: Booking) => {
    router.push({
      pathname: '/bookings/[id]',
      params: { id: booking.id }
    } as any);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error loading bookings. Please try again later.</Text>
      </View>
    );
  }

  const allBookings = bookingsResponse?.data || [];

  const filteredBookings = allBookings.filter((bookingData) => {
    const fromDate = new Date(bookingData.booking.from);
    return activeTab === 'upcoming' ? !isPast(fromDate) : isPast(fromDate);
  });

  const renderBookingCard = ({ item }) => (
    <PropertyCard
      item={item.propertyCardData}
      isLiked={false}
      onLoveIconPress={() => {}}
      showPriceSection={false}
      showFeatures={false}
      showStatus={true}
      onPress={() => handleBookingPress(item.booking)}
    />
  );

  return (
    <FlatList
      data={filteredBookings}
      renderItem={renderBookingCard}
      keyExtractor={(item) => item.booking.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default BookingList; 