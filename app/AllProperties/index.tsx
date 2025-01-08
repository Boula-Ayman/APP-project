import React, { useState } from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import SearchBar from "../Home/HeaderComponents/SearchBar";
import FilterButton from "../Home/HeaderComponents/FilterButton";
import { useGetOpportunitiesQuery } from "@/src/api/opportunitiesApiSlice";
import Card from "../Home/CardListoportunity/Card";
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
  console.log("Data:", data);
  const [likedItems, setLikedItems] = useState<number[]>([]);

  const handleLoveIconPress = (id: number) => {
    setLikedItems((prev) => {
      const newLikedItems = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      return newLikedItems;
    });
  };

  // if (isLoading) {
  //   return <Text>Loading...</Text>;
  // }

  // if (!data || !data.data) {
  //   return <Text>No data available</Text>;
  // }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <SearchBar searchTerm={searchTerm} onChangeText={setSearchTerm} />
      </View>

      <FilterButton />
      <View style={styles.container}>
        <FlatList
          data={data.data}
          renderItem={({ item }) => (
            <Card
              item={item}
              isLiked={likedItems.includes(item.id)}
              onLoveIconPress={() => handleLoveIconPress(item.id)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewAll;
