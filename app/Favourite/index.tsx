import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { RootState } from '../../src/store';
import CardList from '@/components/cardlistContainer/CardList';
import {
  useGetWishListQuery,
  usePostWishListMutation,
  useRemoveWishListMutation,
} from '@/src/wishList/wishListApiSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { t } from 'i18next';
import { LinearGradient } from 'expo-linear-gradient';
import Area from '../../assets/icons/area.svg';
import PropertyCard from '@/commonComponent/PropertyCard/PropertyCard';
import { router } from 'expo-router';

const TestWishListComponent = () => {
  const { data, error, isLoading, refetch } = useGetWishListQuery({
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnUnmount: true,
  });
  const [addToWishlist] = usePostWishListMutation();
  const [removeFromWishlist] = useRemoveWishListMutation();

  const handleLikeToggle = async (id: number) => {
    try {
      const isLiked = data?.data.some((item) => item.id === id);
      if (isLiked) {
        await removeFromWishlist({ id }).unwrap();
      } else {
        await addToWishlist({ id }).unwrap();
      }
      refetch();
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };
  const handlePropertyPress = (id: number) => {
    router.push({
      pathname: '/carddetails/[id]',
      params: { id: id },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[
          'rgba(139, 194, 64, 0)',
          'rgba(139, 194, 64, 0.03)',
          'rgba(139, 194, 64, 0.16)',
        ]}
        style={styles.gradient}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('myWishList')}</Text>
        </View>
        {data?.data.length > 0 ? (
          data.data.map((opportunity) => (
            <View key={opportunity.id} style={styles.cardContainer}>
              <PropertyCard
                item={{
                  id: opportunity.id.toString(),
                  media: opportunity.media,
                  country: opportunity.country,
                  opportunity_type: opportunity.opportunity_type,
                  share_price: opportunity.share_price,
                  currency: opportunity.currency,
                  available_shares: opportunity.available_shares,
                  number_of_shares: opportunity.number_of_shares,
                  title_en: opportunity.title_en,
                  title_ar: opportunity.title_ar,
                  location_en: opportunity.location_en,
                  location_ar: opportunity.location_ar,
                  number_of_bedrooms: opportunity.number_of_bedrooms,
                  number_of_bathrooms: opportunity.number_of_bathrooms,
                  area: opportunity.area,
                  status: opportunity.status,
                }}
                isLiked={true}
                onLoveIconPress={() => handleLikeToggle(opportunity.id)}
                onPress={() => {
                  handlePropertyPress(opportunity.id);
                }}
              />
            </View>
          ))
        ) : (
          <Text style={styles.dangerText}>{t('emptyList')}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  scrollView: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    minWidth: '100%',
    paddingHorizontal: 25
  },
  cardContainer: {
    transform: [{ scale: 1.12 }],
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 25,
  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontWeight: '700',
    fontSize: 26,
    lineHeight: 31.47,
    color: '#000000',
    marginBottom: 30,
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  dangerText: {
    color: "black",
    fontSize: 14,
    fontFamily: "InterMedium",
    fontWeight: "500",
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
});

export default TestWishListComponent;
