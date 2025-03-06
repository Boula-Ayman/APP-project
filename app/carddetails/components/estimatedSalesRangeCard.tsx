import AppText from '@/commonComponent/appText/AppText';
import i18n from '@/i18n/i18n';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const EstimatedSalesRangeCard = ({ data }) => {
  return (
    <View style={styles.card1}>
      <AppText text={t('estimatedSalesRange')} style={styles.largeText} />
      <AppText
        text={`${
          i18n.language === 'en'
            ? (data?.data?.estimate_sales_range_start).toLocaleString()
            : (data?.data?.estimate_sales_range_start).toLocaleString('ar-EG')
        } - ${
          i18n.language === 'en'
            ? (data?.data?.estimate_sales_range_end).toLocaleString()
            : (data?.data?.estimate_sales_range_end).toLocaleString('ar-EG')
        } ${t(data?.data?.currency)}`}
        style={styles.sectionTitle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card1: {
    padding: 20,
    backgroundColor: '#8BC24033',
    borderRadius: 30,
    marginVertical: 10,
    minHeight: 105,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'medium',
    marginBottom: 10,
    color: '#464851',
    fontFamily: 'InterMedium',
  },
  largeText: {
    fontSize: 16,
    fontWeight: 'medium',
    fontFamily: 'InterMedium',
    color: '#14161C',
    marginBottom: 5,
  },
});

export default EstimatedSalesRangeCard;
