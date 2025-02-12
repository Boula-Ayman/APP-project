import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import type { TransformedBookingData } from '@/src/api/bookingsApiSlice';
import CustomHeader from '@/commonComponent/Header/CustomHeader';
import { format } from 'date-fns';
import Tag from '@/commonComponent/Tag/Tag';
import CalendarModal from '@/components/Bookings/CalendarModal';
import BookingActions from '@/components/Bookings/BookingActions';
import useBooking from '@/components/Bookings/useBooking';
import { useTranslation } from 'react-i18next';

const BookingDetailsScreen = () => {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams();
  const {
    booking,
    isLoading,
    error,
    isCancelling,
    isRescheduling,
    cancelBooking,
    rescheduleBooking,
    shouldShowDirections
  } = useBooking(id as string);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [availableNights] = useState(41);

  const handleCancel = useCallback(() => {
    Alert.alert(
      t('bookings.cancellation.title'),
      t('bookings.cancellation.message'),
      [
        {
          text: t('bookings.cancellation.cancel'),
          style: 'cancel',
        },
        {
          text: t('bookings.cancellation.confirm'),
          style: 'destructive',
          onPress: async () => {
            try {
              await cancelBooking(id as string).unwrap();
              Alert.alert(t('common.success'), t('bookings.cancellation.success'));
              router.back();
            } catch (error) {
              Alert.alert(t('common.error'), t('bookings.cancellation.error'));
            }
          },
        },
      ],
    );
  }, [cancelBooking, id, t]);

  const handleReschedule = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleConfirmReschedule = useCallback(async (startDate: string | null, endDate: string | null) => {
    if (!startDate || !endDate) {
      Alert.alert(t('common.error'), t('bookings.calendar.selectDates'));
      return false;
    }

    const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
    const formattedEndDate = format(new Date(endDate), 'yyyy-MM-dd');

    try {
      await rescheduleBooking({ 
        id: id as string, 
        from: formattedStartDate,
        to: formattedEndDate
      }).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  }, [id, rescheduleBooking, t]);

  const formatDate = useCallback((dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      return format(date, 'dd MMMM yyyy');
    } catch (error) {
      console.error('Error formatting date:', dateString, error);
      return 'Invalid date';
    }
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !booking) {
    return (
      <View style={styles.container}>
        <Text>{t('common.error')}</Text>
      </View>
    );
  }

  return (
    <>
      <CustomHeader title={t('bookings.title')} />
      <View style={styles.BookingDetailsContainer}>
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.dateRange}>
                {formatDate(booking.from)} - {formatDate(booking.to)}
              </Text>

              <Tag 
                text={booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                type="status"
                status={booking.status as 'confirmed' | 'pending' | 'cancelled'}
                containerStyle={styles.statusContainer}
              />
            </View>

            <View style={styles.propertyCard}>
              <Image
                source={{ uri: booking.property.media[0]?.url }}
                style={styles.propertyImage}
              />
              <View style={styles.propertyDetails}>
                <Text style={styles.propertyName}>{booking.property.title_en}</Text>
                <Text style={styles.location}>{booking.property.location_en}</Text>
                <Text style={styles.bookingRef}>{t('bookings.bookingId', { id: '' }).split('#')[0]}<Text style={{color: '#8BC240'}}>#{booking.id}</Text></Text>
              </View>
            </View>

            <BookingActions 
              shouldShowDirections={shouldShowDirections} 
              handleReschedule={handleReschedule} 
              handleCancel={handleCancel} 
              isRescheduling={isRescheduling} 
              isCancelling={isCancelling} 
            />

            <View style={styles.nightsContainer}>
              <Text style={styles.nightsText}>
                <Text style={{color: '#8BC240'}}>{booking.number_of_days}</Text> {t('bookings.nights', { count: 1 })}
              </Text>
            </View>

            <View style={styles.policyContainer}>
              <Text style={styles.policyTitle}>{t('bookings.policy.title')}</Text>
              <Text style={styles.policyText}>
                {t('bookings.policy.description')}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <CalendarModal 
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={handleConfirmReschedule}
        availableNights={availableNights}
      />
    </>
  );
};

const styles = StyleSheet.create({
  BookingDetailsContainer: {
    marginTop: '5%',
    width: '90%',  
    alignSelf: 'center',
    backgroundColor: 'white',
    height: '100%',
    borderRadius: 20,
  },
  container: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    width: '100%',
  },
  header: {
    marginBottom: 20,
    width: '95%',
    alignSelf: 'center',
  },
  dateRange: {
    fontSize: 22,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
    marginBottom: 12,
  },
  statusContainer: {
    alignSelf: 'flex-start',
  },
  propertyCard: {
    paddingHorizontal: 4,
    flexDirection: 'row',
    marginBottom: 24,
  },
  propertyImage: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 30,
    marginRight: 12,
  },
  propertyDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  propertyName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    marginBottom: 4,
  },
  bookingRef: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  nightsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginBottom: 16,
    width: '95%',
    alignSelf: 'center',
  },
  nightsText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#333',
  },
  policyContainer: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 12,
    width: '100%',
  },
  policyTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
    marginBottom: 8,
  },
  policyText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    lineHeight: 20,
  },
});

export default BookingDetailsScreen; 