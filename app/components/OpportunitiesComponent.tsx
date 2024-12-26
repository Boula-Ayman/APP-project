import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useGetOpportunitiesQuery } from "@/src/api/opportunitiesApiSlice";

// Define the Opportunity interface
interface Opportunity {
  id: number;
  title_en: string;
  title_ar: string;
  location_en: string;
  location_ar: string;
  description_en: string;
  description_ar: string;
  amenities: string[];
  number_of_bathrooms: string;
  media: { url: string }[];
}

const OpportunitiesComponent: React.FC = () => {
  const { data, error, isLoading } = useGetOpportunitiesQuery({
    refetchOnMountOrArgChange: true,
  });

  // Log the opportunities data to see the API response
  console.log(data);

  if (isLoading) return <Text>Loading...</Text>;

  // Access the opportunities array from the data object
  const opportunities = data?.data || [];

  // Check if opportunities array has items
  if (opportunities.length === 0) {
    return <Text>No opportunities available.</Text>; // Display message if no data
  }

  const renderItem = ({ item }: { item: Opportunity }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item?.media[1]?.url }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title_en || "No English Name"}</Text>
        <Text style={styles.location}>{item.location_en || "No Location"}</Text>
        <Text style={styles.description}>
          {item.description_en || "No Description"}
        </Text>
        <Text style={styles.description}>
          Bathroom: {item.number_of_bathrooms}
        </Text>
      </View>
      {/* <Text>Amenities: {item.amenities.join(", ")}</Text> Amenities */}
    </View>
  );

  return (
    <FlatList
      data={opportunities}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default OpportunitiesComponent;

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    width: "100%",
  },
  itemContainer: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 200,
  },
  textContainer: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8, //  space above the title
  },
  location: {
    fontSize: 14,
    color: "#666", // color for better visibility
    marginTop: 8,
  },
  description: {
    fontSize: 12,
    color: "#333", //  color for better visibility
    marginTop: 8,
  },
});
