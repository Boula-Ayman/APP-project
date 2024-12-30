import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./HomeScreenStyle";
import CardList from "./CardList";
import FilterButtons from "./FilterButtons";
import Header from "./HeaderComponents/Header";
import SearchBar from "./HeaderComponents/SearchBar";
import SectionHeader from "./HeaderComponents/SectionHeader";
import FilterButton from "../Home/HeaderComponents/FilterButton";
import { useGetOpportunitiesQuery } from "@/src/api/opportunitiesApiSlice";
import i18n from "../../src/i18n/i18n"; // Import your i18n instance
import { Opportunity } from "@/src/interfaces/opportunity.interface"; // Import the Opportunity interface

const HomeScreen: React.FC = () => {
  const notifications = 0;

  const { data, error, isLoading } = useGetOpportunitiesQuery({
    refetchOnMountOrArgChange: true,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const opportunities: Opportunity[] = data?.data || [];

  // filter opportunities based on the search term
  const filteredOpportunities = opportunities.filter((item: Opportunity) => {
    const title = i18n.locale === "ar" ? item.title_ar : item.title_en;
    const location = i18n.locale === "ar" ? item.location_ar : item.location_en;
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <LinearGradient
          colors={[
            "rgba(139, 194, 64, 0)",
            "rgba(139, 194, 64, 0.032)",
            "rgba(139, 194, 64, 0.16)",
          ]}
          style={styles.gradient}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        />
        <Header notifications={notifications} />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterButton />
        <FilterButtons />
        <SectionHeader />
        <View>
          <CardList opportunities={filteredOpportunities} />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
