import React, { useEffect, useState } from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import SearchBar from "../Home/HeaderComponents/SearchBar";
import FilterButton from "../Home/HeaderComponents/FilterButton";
import {
  useGetOpportunitiesQuery,
  useLazyGetOpportunitiesQuery,
} from "@/src/api/opportunitiesApiSlice";
import Card from "../Home/CardListoportunity/Card";
import styles from "./indexStyle";
import PageHeader from "@/components/page/header";
import { useTranslation } from "react-i18next";
import { PROPERTIES_STATUS, PropertiesStatusKeys } from "@/constants/Enums";
import i18n from "@/i18n/i18n";
import { Opportunity } from "@/src/interfaces/opportunity.interface";
import { useGetWishListQuery } from "@/src/wishList/wishListApiSlice";

interface FilterScreenProps {
  searchTerm: string;
  setSearchTerm: (text: string) => void;
}

const ViewAll: React.FC<FilterScreenProps> = ({}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data: wishList, refetch } = useGetWishListQuery({});

  const [filters, setFilters] = useState<Partial<{
    type: string | null;
    country: string | null;
    status: (typeof PROPERTIES_STATUS)[PropertiesStatusKeys];
  }> | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  const { data, error, isLoading } = useGetOpportunitiesQuery(
    { ...filters },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [getFilteredOpportunities] = useLazyGetOpportunitiesQuery();

  useEffect(() => {
    if (data && !isLoading) {
      setOpportunities(data.data);
    }
  }, [data]);

  const { t } = useTranslation();

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
    <SafeAreaView style={styles.mainContainer}>
      <PageHeader title={t("allProperties.title")} />
      <View style={styles.searchContainer}>
        <SearchBar searchTerm={searchTerm} onChangeText={handleSearch} />
        <FilterButton onFilterChange={handleFilterChange} />
      </View>

      <View style={styles.container}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error loading data</Text>
        ) : opportunities.length > 0 ? (
          <FlatList
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              height: "auto",
            }}
            contentContainerStyle={{
              gap: 20,
            }}
            data={opportunities}
            renderItem={({ item }) => (
              <Card
                item={item}
                isLiked={wishList?.data?.some(
                  (likedItem: Opportunity) => likedItem.id === item.id
                )}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View
            style={{
              marginTop: "10%",
              marginInline: "auto",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>No opportunities found</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ViewAll;
