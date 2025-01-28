import React from "react";
import { useSelector } from "react-redux";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { RootState } from "../../src/store";
import CardList from "@/components/cardlistContainer/CardList";
import { useGetOpportunitiesQuery } from "@/src/api/opportunitiesApiSlice";
const TestWishListComponent = () => {
  const likedItems = useSelector(
    (state: RootState) => state.wishlist.likedItems
  );
  console.log("Liked Items:", likedItems);
  const { data, error, isLoading } = useGetOpportunitiesQuery({
    refetchOnMountOrArgChange: true,
  });

  // Filter the opportunities to only include liked items
  const likedOpportunities = data?.data.filter((item) =>
    likedItems.includes(item.id)
  );

  return (
    <View style={styles.container}>
      {likedOpportunities?.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {likedOpportunities.map((opportunity) => (
            <View key={opportunity.id} style={styles.cardContainer}>
              <CardList opportunities={[opportunity]} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text>No items in the wishlist.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  scrollView: {
    flexGrow: 1,
    flexDirection: "column",
  },
  cardContainer: {
    // Add appropriate styles for the card container
  },
});

export default TestWishListComponent;
