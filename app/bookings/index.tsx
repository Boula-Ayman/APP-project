import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import BookingList from '../../components/Bookings/BookingList';
import { LinearGradient } from 'expo-linear-gradient';
import CustomHeader from '../../commonComponent/Header/CustomHeader';
import { useTranslation } from 'react-i18next';

type TabType = 'upcoming' | 'past';

const MyBookingsScreen = () => {
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const { t } = useTranslation();

  return (
      <>
      <CustomHeader title={t('bookings.title')}/>
      <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        <View style={styles.tabWrapper}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
              {t('bookings.upcoming')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'past' && styles.activeTab]}
            onPress={() => setActiveTab('past')}
          >
            <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
              {t('bookings.past')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <BookingList activeTab={activeTab} />
    </SafeAreaView></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tabWrapper: {
    flexDirection: 'row',
    borderRadius: 25,
    padding: 4,
    gap: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: '#92929266',
    borderWidth: 1,
    paddingVertical: 14,
  },
  activeTab: {
    backgroundColor: '#8BC240',
    borderWidth: 0,
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#595959',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
  },
});

export default MyBookingsScreen; 