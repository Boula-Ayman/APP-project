import React, { useCallback, useEffect, useState } from "react";

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
import i18n from "../../src/i18n/i18n";
import { Opportunity } from "@/src/interfaces/opportunity.interface";

import { debounce } from "@/utils/debounce";

const HomeScreen: React.FC = () => {
  const notifications = 0;

  const { data, error, isLoading } = useGetOpportunitiesQuery({
    refetchOnMountOrArgChange: true,
  });
  // console.log(data);

  const [searchTerm, setSearchTerm] = useState("");
  const opportunities: Opportunity[] = data?.data || [];
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");

  const debouncedSetSearchTerm = useCallback(
    debounce((term: string) => {
      setDebouncedSearchTerm(term);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSetSearchTerm(searchTerm);
  }, [searchTerm, debouncedSetSearchTerm]);

  const filteredOpportunities = opportunities.filter((item: Opportunity) => {
    const title = i18n.locale === "ar" ? item.title_ar : item.title_en;
    const location = i18n.locale === "ar" ? item.location_ar : item.location_en;

    // Search match condition
    const searchMatch =
      title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      location.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

    // Filter condition
    if (currentFilter === "all") return searchMatch;
    if (currentFilter === "available")
      return searchMatch && item.status === "available";
    if (currentFilter === "soldOut")
      return searchMatch && item.status === "sold out"; // Ensure this matches the data
    return false;
  });
  const onFilterChange = (filter: string) => {
    console.log("Filter changed to:", filter);
    setCurrentFilter(filter);
  };
  useEffect(() => {
    console.log("Filtered Opportunities:", filteredOpportunities);
  }, [filteredOpportunities]);
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
        <SearchBar searchTerm={searchTerm} onChangeText={setSearchTerm} />
        <FilterButton />
        <FilterButtons onFilterChange={onFilterChange} />
        <SectionHeader />
        <View>
          <CardList key={currentFilter} opportunities={filteredOpportunities} />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
