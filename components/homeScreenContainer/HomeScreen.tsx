import React, { useCallback, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
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
import i18n from "@/i18n/i18n";
import { Opportunity } from "@/src/interfaces/opportunity.interface";
import { StatusBar } from "expo-status-bar";
import { PROPERTIES_STATUS, PropertiesStatusKeys } from "@/constants/Enums";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen: React.FC = ({}) => {
  const notifications = 0;

  const [searchTerm, setSearchTerm] = useState("");
  const [opportunities, setOpportunities] = useState([]);

  const [filters, setFilters] = useState<Partial<{
    type: string | null;
    country: string | null;
    status: (typeof PROPERTIES_STATUS)[PropertiesStatusKeys];
  }> | null>(null);

  const [getFilteredOpportunities] = useLazyGetOpportunitiesQuery();

  const { data, error, isLoading } = useGetOpportunitiesQuery(
    { ...filters },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (data && !isLoading) {
      setOpportunities(data.data);
    }
  }, [data]);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const savedFilters = await AsyncStorage.getItem("filters");
        if (savedFilters) {
          setFilters(JSON.parse(savedFilters));
        }
      } catch (error) {
        console.error("Failed to load filters", error);
      }
    };
    loadFilters();
  }, []);

  useEffect(() => {
    const saveFilters = async () => {
      console.log(filters);
      try {
        await AsyncStorage.setItem("filters", JSON.stringify(filters));
      } catch (error) {
        console.error("Failed to save filters", error);
      }
    };
    saveFilters();
  }, [filters]);

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    const filteredOpportunities = data.data.filter((item: Opportunity) => {
      const title = i18n.language === "ar" ? item.title_ar : item.title_en;
      const location =
        i18n.language === "ar" ? item.location_ar : item.location_en;
      return (
        title.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
        location.toLowerCase().includes(newSearchTerm.toLowerCase())
      );
    });

    setOpportunities(filteredOpportunities);
  };

  const handleFilterChange = async (
    newFilters: Partial<{
      type: string | null;
      country: string | null;
      status: (typeof PROPERTIES_STATUS)[PropertiesStatusKeys];
    }>
  ) => {
    try {
      setFilters(newFilters);
      let checkedFilters = newFilters;
      if (checkedFilters.status === "all") {
        checkedFilters = {
          country: checkedFilters.country,
          type: checkedFilters.type,
        };
      }
      const response = await getFilteredOpportunities({
        ...checkedFilters,
      });

      setOpportunities(response.data.data);
    } catch (error) {
      // TODO: show error messages
    }
  };

  return (
    <>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, direction: i18n.language === "ar" ? "rtl" : "ltr" }}
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
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              height: "auto",
              gap: 10,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: "auto",
                gap: 10,
              }}
            >
              <SearchBar searchTerm={searchTerm} onChangeText={handleSearch} />
              <FilterButton onFilterChange={handleFilterChange} />
            </View>

            <FilterButtons
              currentStatus={filters?.status ?? "all"}
              onFilterChange={(
                newStatus: (typeof PROPERTIES_STATUS)[PropertiesStatusKeys]
              ) =>
                handleFilterChange({
                  ...filters,
                  status: newStatus,
                })
              }
            />
          </View>
          <SectionHeader />
          <CardList opportunities={opportunities} />
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
