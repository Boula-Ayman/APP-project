// FilterButtons.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../../components/homeScreenContainer/HomeScreenStyle';
import i18n from '../../i18n/i18n';
import { PROPERTIES_STATUS, PropertiesStatusKeys } from '../../constants/Enums';

interface FilterButtonsProps {
  currentStatus: (typeof PROPERTIES_STATUS)[PropertiesStatusKeys];
  onFilterChange: (
    newStatus: (typeof PROPERTIES_STATUS)[PropertiesStatusKeys],
  ) => void;
}
const FilterButtons: React.FC<FilterButtonsProps> = ({
  currentStatus,
  onFilterChange,
}) => {
  return (
    <View style={styles.filters}>
      <TouchableOpacity
        style={
          currentStatus === 'all'
            ? styles.filterButtonActive
            : styles.filterButton
        }
        onPress={() => onFilterChange('all')}
      >
        <Text
          style={
            currentStatus === 'all'
              ? styles.filterTextActive
              : styles.filterText
          }
        >
          {i18n.t('home.all')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          currentStatus === 'available'
            ? styles.filterButtonActive
            : styles.filterButton
        }
        onPress={() => onFilterChange('available')}
      >
        <Text
          style={
            currentStatus === 'available'
              ? styles.filterTextActive
              : styles.filterText
          }
        >
          {i18n.t('home.available')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          currentStatus === 'sold out'
            ? styles.filterButtonActive
            : styles.filterButton
        }
        onPress={() => onFilterChange('sold out')}
      >
        <Text
          style={
            currentStatus === 'sold out'
              ? styles.filterTextActive
              : styles.filterText
          }
        >
          {i18n.t('home.soldOut')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterButtons;
