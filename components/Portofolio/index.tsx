import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  useGetMyInvestmentsQuery,
  useGetMyInvestmentStatsQuery,
} from "../../src/api/investmentsApiSlice";
import { useGetMyRentsQuery } from "../../src/api/rentsApiSlice";
import {
  useGetWishListQuery,
  usePostWishListMutation,
  useRemoveWishListMutation,
} from "../../src/wishList/wishListApiSlice";
import PropertyCard from "@/commonComponent/PropertyCard/PropertyCard";
import { LinearGradient } from "expo-linear-gradient";
import PortfolioStats from "./components/PortfolioStats";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import i18n from "../../i18n/i18n";
import { localizeNumber } from "@/utils/numbers";

const PortfolioPage: React.FC = () => {
  const { t } = useTranslation();
  const { data: investmentsData } = useGetMyInvestmentsQuery();
  const { data: investmentStatsData } = useGetMyInvestmentStatsQuery();
  const { data: rentsData } = useGetMyRentsQuery();
  const { data: wishlistData } = useGetWishListQuery({});
  const [addToWishlist] = usePostWishListMutation();
  const [removeFromWishlist] = useRemoveWishListMutation();
  const { refetch } = useGetWishListQuery({});

  const handleLikeToggle = async (id: number) => {
    try {
      const isLiked = wishlistData?.data.some((item) => item.id === id);
      if (isLiked) {
        await removeFromWishlist({ id }).unwrap();
      } else {
        await addToWishlist({ id }).unwrap();
      }
      await refetch();
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  const handlePropertyPress = (id: number) => {
    router.push({
      pathname: '/carddetails/[id]',
      params: { id: id }
    } as any);
  };


  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(139, 194, 64, 0)",
          "rgba(139, 194, 64, 0.03)",
          "rgba(139, 194, 64, 0.16)",
        ]}
        style={styles.gradient}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      />
      <ScrollView style={{...styles.scrollContainer, direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
        <Text style={styles.title}>{t("portfolio.title")}</Text>

        <PortfolioStats
          totalInvestment={investmentStatsData?.data.total_amount || 0}
          totalRentalIncome={rentsData?.data.total_amount || 0}
          totalUsableNights={
            investmentStatsData?.data.total_available_nights || 0
          }
          yield={Number((rentsData?.data.total_yield || 0).toFixed(2))}
          currency={
            investmentStatsData?.data.currency || rentsData?.data.currency || ""
          }
        />

        <Text style={styles.sectionTitle}>
          {t("portfolio.myUnits")} ({localizeNumber(investmentsData?.data.length || 0, i18n.language) || 0})
        </Text>
        <Text style={styles.sectionSubtitle}>
          {t("portfolio.exploreDescription")}
        </Text>

        {investmentsData?.data.map((investment) => (
          <PropertyCard
            key={investment.id}
            item={{
              id: investment.id.toString(),
              media: investment.media,
              country: investment.country as "UAE" | "Egypt",
              opportunity_type: investment.opportunity_type,
              share_price: investment.share_price,
              currency: investment.currency,
              available_shares: investment.owned_shares,
              number_of_shares: investment.number_of_shares,
              title: i18n.language === "ar" ? investment.title_ar : investment.title_en,
              location: i18n.language === "ar" ? investment.location_ar : investment.location_en,
              number_of_bedrooms: investment.number_of_bedrooms,
              number_of_bathrooms: investment.number_of_bathrooms,
              area: investment.area,
              status: investment.status,
            }}
            isLiked={wishlistData?.data.some(
              (item) => item.id === investment.id
            )}
            onLoveIconPress={() => handleLikeToggle(investment.id)}
            onPress={() => handlePropertyPress(investment.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  gradient: {
    height: 305,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    fontWeight: "700",
    color: "#000000",
    marginBottom: 20,
    paddingTop: 35,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 10,
  },
  sectionSubtitle: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    letterSpacing: -0.48,
    textAlign: "left",
    color: "#464851",
    marginBottom: 15,
    marginLeft: 10,
  },
});

export default PortfolioPage;
