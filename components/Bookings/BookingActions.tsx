import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  stretched?: boolean;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  icon, 
  label, 
  onPress, 
  stretched = false, 
  disabled = false 
}) => (
  <TouchableOpacity 
    style={[
      styles.actionItem,
      stretched && styles.stretchedActionItem
    ]}
    onPress={onPress}
    disabled={disabled}
  >
    <View style={[
      styles.actionButton,
      stretched && styles.stretchedActionButton
    ]}>
      {icon}
    </View>
    <Text style={styles.actionText}>{label}</Text>
  </TouchableOpacity>
);

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
      icon: <MaterialIcons name="close" size={24} color="#333" />,
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
  actionItem: {
    alignItems: 'center',
    width: '30%',
  },
  stretchedActionItem: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  stretchedActionButton: {
    width: '100%',
    height: 70,
    borderRadius: 12,
    backgroundColor: '#F7F8FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cancelledActions: {
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#F7F8FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#333',
  },
});

export default BookingActions; 