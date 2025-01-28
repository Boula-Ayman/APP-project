import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import SearchBar from "../Home/HeaderComponents/SearchBar";
import FilterButton from "../Home/HeaderComponents/FilterButton";
import { useGetOpportunitiesQuery } from "@/src/api/opportunitiesApiSlice";
import CardList from "../../components/cardlistContainer/CardList";

import styles from "./indexStyle";

interface FilterScreenProps {
  searchTerm: string;
  setSearchTerm: (text: string) => void;
}

const ViewAll: React.FC<FilterScreenProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  const { data, error, isLoading } = useGetOpportunitiesQuery({
    refetchOnMountOrArgChange: true,
  });
  const [likedItems, setLikedItems] = useState<number[]>([]);

  const handleLoveIconPress = (id: number) => {
    setLikedItems((prev) => {
      const newLikedItems = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      return newLikedItems;
    });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <SearchBar searchTerm={searchTerm} onChangeText={setSearchTerm} />
      </View>

      <FilterButton onFilterChange={() => {}} />
      <View style={styles.container}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error loading data</Text>
        ) : (
          <CardList opportunities={data.data} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ViewAll;
