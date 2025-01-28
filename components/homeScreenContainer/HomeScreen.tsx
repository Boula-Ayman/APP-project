import React, { useCallback, useEffect, useState } from "react";

import { View, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./HomeScreenStyle";
import CardList from "../cardlistContainer/CardList";
import FilterButtons from "../../app/Home/FilterButtons";
import Header from "../../app/Home/HeaderComponents/Header";
import SearchBar from "../../app/Home/HeaderComponents/SearchBar";
import SectionHeader from "../../app/Home/HeaderComponents/SectionHeader";
import FilterButton from "../../app/Home/HeaderComponents/FilterButton";
import {
  useGetOpportunitiesQuery,
  useLazyGetOpportunitiesQuery,
} from "@/src/api/opportunitiesApiSlice";
import i18n from "@/src/i18n/i18n";
import { Opportunity } from "@/src/interfaces/opportunity.interface";

import { debounce } from "@/utils/debounce";
import { StatusBar } from "expo-status-bar";

const HomeScreen: React.FC = ({}) => {
  const notifications = 0;

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [opportunities, setOpportunities] = useState([]);

  const [filters, setFilters] = useState<{
    type: string | null;
    country: string | null;
    status: string | null;
  } | null>(null);

  // const [getFilteredOpportunities] = useLazyGetOpportunitiesQuery();

  const { data, error, isLoading, refetch } = useGetOpportunitiesQuery(
    { ...filters },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const debouncedSetSearchTerm = useCallback(
    debounce((term: string) => {
      setDebouncedSearchTerm(term);
    }, 300),
    []
  );
  useEffect(() => {
    if (data && !isLoading) {
      setOpportunities(data.data);
    }
  }, [data]);

  useEffect(() => {
    debouncedSetSearchTerm(searchTerm);
  }, [searchTerm, debouncedSetSearchTerm]);

  useEffect(() => {
    if (searchTerm) {
      const filteredOpportunities = data.data.filter((item: Opportunity) => {
        const title = i18n.locale === "ar" ? item.title_ar : item.title_en;
        const location =
          i18n.locale === "ar" ? item.location_ar : item.location_en;
        return (
          title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          location.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      setOpportunities(filteredOpportunities);
    }
  }, [searchTerm]);

  const handleFilterChange = async (newFilters: {
    type?: string;
    country?: string;
    status?: string;
  }) => {
    setFilters(newFilters);
    try {
      const response = await refetch();

      setOpportunities(response.data.data);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 30 }}
      >
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
          <FilterButton onFilterChange={handleFilterChange} />
          <FilterButtons
            onFilterChange={(newStatus: string | null) =>
              handleFilterChange({
                ...filters,
                status: newStatus,
              })
            }
          />
          <SectionHeader />
          <CardList opportunities={opportunities} />
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
