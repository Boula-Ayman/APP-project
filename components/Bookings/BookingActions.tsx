import React from 'react';
import { View, StyleSheet } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';
import ActionButton from './ActionButton';
import AntDesign from '@expo/vector-icons/AntDesign';
interface BookingActionsProps {
  shouldShowDirections: boolean;
  handleReschedule?: () => void;
  handleCancel?: () => void;
  isRescheduling?: boolean;
  isCancelling?: boolean;
}

export const BookingActions: React.FC<BookingActionsProps> = ({ 
  shouldShowDirections, 
  handleReschedule, 
  handleCancel, 
  isRescheduling, 
  isCancelling 
}) => {
  const { t } = useTranslation();
  
  const actions = shouldShowDirections ? [
    {
      icon: <FontAwesome6 name="location-dot" size={24} color="#333" />,
      label: t('bookings.actions.directions'),
      stretched: true
    }
  ] : [
    {
      icon: <FontAwesome6 name="location-dot" size={24} color="#333" />,
      label: t('bookings.actions.directions')
    },
    {
      icon: <FontAwesome5 name="calendar-day" size={24} color="#333" />,
      label: t('bookings.actions.reschedule'),
      onPress: handleReschedule,
      disabled: isRescheduling
    },
    {
      icon: <AntDesign name="closecircle" size={24} color="#333" />,
      label: t('bookings.actions.cancel'),
      onPress: handleCancel,
      disabled: isCancelling
    }
  ];

  return (
    <View style={[styles.actions, shouldShowDirections && styles.cancelledActions]}>
      {actions.map((action, index) => (
        <ActionButton
          key={index}
          icon={action.icon}
          label={action.label}
          onPress={action.onPress}
          stretched={action.stretched}
          disabled={action.disabled}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    width: '100%',
    alignSelf: 'center',
  },
  cancelledActions: {
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
  }
});

export default BookingActions; 