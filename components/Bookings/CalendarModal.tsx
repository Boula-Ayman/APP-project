import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { format, addDays, addMonths, subMonths } from 'date-fns';
import CustomModal from '../../commonComponent/Modal/CustomModal';
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '@/commonComponent/button/Button';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n/i18n';
import { ar, enUS } from 'date-fns/locale';
import { localizeNumber } from '@/utils/numbers';
import { ARABIC_DAYS, ARABIC_MONTHS, SHORT_ARABIC_DAYS } from '@/constants/Enums';

interface CalendarModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (startDate: string | null, endDate: string | null) => Promise<boolean>;
  availableNights: number;
  disabledDates?: {from: string, to: string}[];
}

LocaleConfig.locales['ar'] = {
    monthNames: Object.values(ARABIC_MONTHS),
    dayNames: Object.values(ARABIC_DAYS),
    dayNamesShort: Object.values(SHORT_ARABIC_DAYS),
};

LocaleConfig.defaultLocale = i18n.language === "ar" ? "ar" : "";

const CalendarModal = ({ isVisible, onClose, onConfirm, availableNights, disabledDates }: CalendarModalProps) => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = React.useState<string | null>(null);
  const [endDate, setEndDate] = React.useState<string | null>(null);
  const [selectedDates, setSelectedDates] = React.useState<{[key: string]: any}>({});
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const calendarRef = React.useRef<any>(null);

  const resetState = React.useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setSelectedDates(prevDates => {
      const newDates = { ...prevDates };
      Object.keys(newDates).forEach(date => {
        if (!newDates[date].disabled) {
          delete newDates[date];
        }
      });
      return newDates;
    });
    setCurrentMonth(new Date());
    setIsSuccess(false);
    setIsError(false);
  }, []);

  useEffect(() => {
    if (disabledDates?.length) {
      setSelectedDates(() => {
        const disabledRanges = disabledDates.reduce((acc, { from, to }) => {
          let currentDate = new Date(from);
          const endDate = new Date(to);

          while (currentDate <= endDate) {
            const dateString = format(currentDate, 'yyyy-MM-dd');
            if (dateString === from) {
              acc[dateString] = {
                startingDay: true,
                disabled: true,
                disableTouchEvent: true
              };
            } else if (dateString === to) {
              acc[dateString] = {
                endingDay: true,
                disabled: true,
                disableTouchEvent: true
              };
            } else {
              acc[dateString] = {
                disabled: true,
                disableTouchEvent: true,
              };
            }
            currentDate = addDays(currentDate, 1);
          }
          return acc;
        }, {} as {[key: string]: any});

        return {
          ...disabledRanges
        };
      });
    }
  }, [disabledDates]);

  React.useEffect(() => {
    if (!isVisible) {
      resetState();
    }
  }, [isVisible, resetState]);

  const handleClose = () => {
    resetState();
    onClose();
  };

  const onDayPress = (day: DateData) => {
    if (!startDate || (startDate && endDate)) {
        setStartDate(day.dateString);
        setEndDate(null);
        setSelectedDates(() => {
            const disabledDatesObj = disabledDates?.reduce((acc, { from, to }) => {
                let currentDate = new Date(from);
                const endDate = new Date(to);
    
                while (currentDate <= endDate) {
                const dateString = format(currentDate, 'yyyy-MM-dd');
                if (dateString === from) {
                    acc[dateString] = {
                        startingDay: true,
                        disabled: true,
                        disableTouchEvent: true
                    };
                } else if (dateString === to) {
                    acc[dateString] = {
                        endingDay: true,
                        disabled: true,
                        disableTouchEvent: true
                    };
                } else {
                    acc[dateString] = {
                        disabled: true,
                        disableTouchEvent: true,
                    };
                }
                currentDate = addDays(currentDate, 1);
                }
                return acc;
            }, {} as {[key: string]: any});

            return {
                ...disabledDatesObj,
                [day.dateString]: {
                    startingDay: true,
                    disabled: true,
                    color: '#8BC240',
                    textColor: 'white'
                }
            };
        });
    } else {
      const start = new Date(startDate);
      const end = new Date(day.dateString);
      
      if (end < start) {
        setStartDate(day.dateString);
        setEndDate(startDate);
      } else {
        setEndDate(day.dateString);
      }

      const range: {[key: string]: any} = {};
      let currentDate = new Date(startDate);

      if(disabledDates?.some((disabledDate, index) => {
        const disabledStart = new Date(disabledDate.from);
        const disabledEnd = new Date(disabledDate.to);

        const isOverlapping = disabledStart >= start && disabledStart <= end
        || disabledEnd >= start && disabledEnd <= end;

        return isOverlapping;
      })) {
          setEndDate(null);
          setSelectedDates(prevDates => {
            const newDates = { ...prevDates };
            Object.keys(newDates).forEach(date => {
              if (!newDates[date].disabled) {
                delete newDates[date];
              }
            });
            return newDates;
          });
        return;
      }

      while (currentDate <= end) {
        const dateString = format(currentDate, 'yyyy-MM-dd');
        if (dateString === startDate) {
          range[dateString] = {
            startingDay: true,
            color: '#8BC240',
            textColor: 'white'
          };
        } else if (dateString === day.dateString) {
          range[dateString] = {
            endingDay: true,
            color: '#8BC240',
            textColor: 'white'
          };
        } else {
          range[dateString] = {
            color: '#E8F3DC',
            textColor: '#333333'
          };
        }
        currentDate = addDays(currentDate, 1);
      }
      setSelectedDates(prev => ({...prev, ...range}));
    }
  };

  const handleConfirm = async () => {
    try {
      const success = await onConfirm(startDate, endDate);
      if (success) {
        setIsSuccess(true);
        setIsError(false);
      } else {
        setIsError(true);
        setIsSuccess(false);
      }
    } catch (error) {
      setIsError(true);
      setIsSuccess(false);
    }
  };

  const renderArrow = (direction: 'left' | 'right') => {
    return (
      <FontAwesome5 
        name={`chevron-${direction}`} 
        size={20} 
        color="#6E7491" 
        style={{
          transform: [{ rotate: i18n.language === "ar" ? '180deg' : '0deg' }]
        }}
      />
    );
  };

  const handlePrevMonth = () => {
    const newMonth = subMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    if (calendarRef.current) {
      calendarRef.current.addMonth(-1);
    }
  };

  const handleNextMonth = () => {
    const newMonth = addMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    if (calendarRef.current) {
      calendarRef.current.addMonth(1);
    }
  };

  const renderSuccessView = () => (
    <View style={styles.successModalContent}>
      <View style={styles.successIconContainer}>
        <View style={styles.iconBackground}>
          <AntDesign name="check" size={50} color="black" />
        </View>
      </View>
      <Text style={styles.successTitle}>{t('bookings.calendar.success.title')}</Text>
      <Text style={styles.successText}>{t('bookings.calendar.success.description')}</Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            handleClose();
            router.push('/bookings');
          }}
        >
          {t('bookings.calendar.success.viewBookings')}
        </Button>
      </View>
    </View>
  );

  const renderErrorView = () => (
    <View style={styles.successModalContent}>
      <View style={styles.successIconContainer}>
        <View style={[styles.iconBackground, styles.errorIconBackground]}>
          <AntDesign name="close" size={50} color="black" />
        </View>
      </View>
      <Text style={styles.successTitle}>{t('bookings.calendar.error.title')}</Text>
      <Text style={styles.successText}>{t('bookings.calendar.error.description')}</Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            resetState();
          }}
        >
          {t('bookings.calendar.error.tryAgain')}
        </Button>
      </View>
    </View>
  );

  const renderCalendarView = () => (
    <ScrollView>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{t('bookings.calendar.bookNights')}</Text>
        
        <View style={styles.mainContainer}>
          <View style={styles.availableNightsContainer}>
            <Text style={styles.availableNightsText}>
              <Text style={styles.highlightedText}>{localizeNumber(availableNights, i18n.language)}</Text> {t('bookings.calendar.availableNights')}
            </Text>
            <View style={styles.dateRangeContainer}>
              <View>
                <FontAwesome5 name="calendar-alt" size={20} color="#333" />
              </View>
              <Text style={styles.dateRangeText}>
                {startDate ? 
                    format(
                        new Date(startDate), 
                        'dd MMM yyyy',
                        {
                            locale: i18n.language === "ar" ? ar : enUS
                        }
                    ) : '--'} 
                    - 
                    {endDate ? 
                        format(
                            new Date(endDate), 
                            'dd MMM yyyy',
                            {
                                locale: i18n.language === "ar" ? ar : enUS
                            }
                        ) : '--'}
              </Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.calendarWrapper}>
            <TouchableOpacity 
              style={styles.arrowButton}
              onPress={handlePrevMonth}
            >
              {renderArrow('left')}
            </TouchableOpacity>
            
            <View style={styles.calendarContainer}>
              <Calendar
                ref={calendarRef}
                key={format(currentMonth, 'yyyy-MM', {
                    locale: i18n.language === "ar" ? ar : enUS
                })}
                current={format(currentMonth, 'yyyy-MM-dd', {
                    locale: i18n.language === "ar" ? ar : enUS
                })}
                minDate={format(new Date(), 'yyyy-MM-dd')}
                markingType={'period'}
                markedDates={selectedDates}
                onDayPress={onDayPress}
                theme={{
                  calendarBackground: 'white',
                  textSectionTitleColor: '#333',
                  selectedDayBackgroundColor: '#8BC240',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#8BC240',
                  dayTextColor: '#333',
                  textDisabledColor: '#d9e1e8',
                  dotColor: '#8BC240',
                  monthTextColor: '#333',
                  textDayFontFamily: 'Inter_400Regular',
                  textMonthFontFamily: 'Inter_600SemiBold',
                  textDayHeaderFontFamily: 'Inter_500Medium',
                  textDayFontSize: 14,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 14,
                }}
                hideArrows={true}
                renderArrow={renderArrow}
                allowSelectionOutOfRange={false}
              />
            </View>

            <TouchableOpacity 
              style={styles.arrowButton}
              onPress={handleNextMonth}
            >
              {renderArrow('right')}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.nightsContainer}>
          <Text style={styles.nightsText}>
            {endDate && startDate 
              ? <><Text style={styles.greenText}>{Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))}</Text>{` ${t('bookings.nights')}`}</>
              : <><Text style={styles.greenText}>0</Text>{` ${t('bookings.nights')}`}</>}
          </Text>
          <Text style={styles.termsText}>
            {t('bookings.calendar.termsAgreement')}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.bookNowButton}
          onPress={handleConfirm}
        >
          <Text style={styles.bookNowButtonText}>{t('bookings.calendar.bookNow')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <CustomModal isVisible={isVisible} onClose={handleClose}>
      {isSuccess ? renderSuccessView() : isError ? renderErrorView() : renderCalendarView()}
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '100%',
  },
  separator: {
    height: 1,
    backgroundColor: '#E8E8E8',
  },
  mainContainer: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  calendarWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  calendarContainer: {
    flex: 1,
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  availableNightsContainer: {
    marginBottom: 0,
  },
  availableNightsText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#333',
    marginBottom: 10,
  },
  highlightedText: {
    color: '#8BC240',
    fontFamily: 'Inter_600SemiBold',
    textAlign: "left"
  },
  dateRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#8BC240',
    padding: 15,
    gap: 10,
    borderRadius: 12,
    marginBottom: 20,
  },
  dateRangeText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#333',
  },
  bookNowButton: {
    backgroundColor: '#8BC240',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  bookNowButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  arrowButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 60,
    alignItems: 'center',
    width: '100%',
  },
  successIconContainer: {
    marginBottom: 20,
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#8BC24033',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
    marginBottom: 10,
  },
  successText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    textAlign: 'center',
    width: '90%',
  },
  nightsContainer: {
    gap: 8,
    width: '90%',
    
  },
  nightsText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#333333',
    textAlign: "left"
  },
  termsText: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: '#666666',
    textAlign: "left"
    
  },
  termsLink: {
    color: '#8BC240',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 24,
  },
  errorIconBackground: {
    backgroundColor: '#FF000033',
  },
  greenText: {
    color: '#8BC240',
    fontFamily: 'Inter_600SemiBold',
  },
});

export default CalendarModal; 