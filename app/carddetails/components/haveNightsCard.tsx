import AppText from '@/commonComponent/appText/AppText';
import i18n from '@/i18n/i18n';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const HaveNightsCard = ({ data }) => {
  return (
    <View style={styles.card1}>
      <AppText
        text={`${
          i18n.language === 'en'
            ? data?.data?.number_of_nights
            : data?.data?.number_of_nights.toLocaleString('ar-EG')
        }`}
        style={styles.largeText}
      />
      <AppText text={i18n.t('availableNights')} style={styles.sectionTitle} />
    </View>
  );
};

const styles = StyleSheet.create({
  card1: {
    padding: 20,
    backgroundColor: '#9BC2C7',
    borderRadius: 30,
    marginVertical: 10,
    height: 105,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'medium',
    marginBottom: 10,
    color: '#464851',
    fontFamily: 'InterMedium',
  },
  largeText: {
    fontSize: 26,
    fontWeight: 'semibold',
    fontFamily: 'InterSemiBold',
    color: '#14161C',
    marginBottom: 5,
  },
});

export default HaveNightsCard;
