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
import {
  useGetOpportunitiesQuery,
  useLazyGetOpportunitiesQuery,
} from "@/src/api/opportunitiesApiSlice";
import i18n from "../../src/i18n/i18n";
import { Opportunity } from "@/src/interfaces/opportunity.interface";
import { debounce } from "@/utils/debounce";

const HomeScreen: React.FC = ({}) => {
  const notifications = 0;

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [opportunities, setOpportunities] = useState([]);

  const [filters, setFilters] = useState<{
    type?: string;
    country?: string;
    status?: string | undefined;
  } | null>(null);

  const [getFilteredOpportunities] = useLazyGetOpportunitiesQuery();

  const { data, error, isLoading, refetch } = useGetOpportunitiesQuery({
    refetchOnMountOrArgChange: true,
  });

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
    if (data && !isLoading) {
      setOpportunities(data.data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (searchTerm) {
      const filteredOpportunities = data.data.filter((item: Opportunity) => {
        console.log("Filtering");
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
    status?: string | undefined;
  }) => {
    setFilters(newFilters);
    const response = await getFilteredOpportunities(newFilters);
    setOpportunities(response.data.data);
  };

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
        <FilterButton onFilterChange={handleFilterChange} />

        <FilterButtons
          onFilterChange={(newStatus?: string) =>
            handleFilterChange({ ...filters, status: newStatus })
          }
        />
        <SectionHeader />
        <View>
          <CardList opportunities={opportunities} />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
