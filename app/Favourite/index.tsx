import React from "react";
import { useSelector } from "react-redux";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { RootState } from "../../src/store";
import CardList from "@/components/cardlistContainer/CardList";
import { useGetWishListQuery } from "@/src/wishList/AdWishList/wishListApiSliceAdd";
import { SafeAreaView } from "react-native-safe-area-context";

const TestWishListComponent = () => {
  const { data, error, isLoading, refetch } = useGetWishListQuery({
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
      refetchOnUnmount: true,
    });
  return (
    <SafeAreaView style={styles.container}>
      {data?.data.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {data.data.map((opportunity) => (
            <View key={opportunity.id} style={styles.cardContainer}>
              <CardList opportunities={[opportunity]} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text>No items in the wishlist.</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
