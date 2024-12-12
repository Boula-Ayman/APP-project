import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Flag from "../../assets/icons/UAE.svg";
const CardList: React.FC = () => {
  const data = [
    {
      id: "1",
      price: "75,000",
      title: "Tranquil Haven in the Woods",
      location: "Dubai Marina, Dubai, UAE",
      bedrooms: 2,
      iconbedroom: require("../../assets/icons/Frame 52.svg"),
      bathrooms: 2,
      iconbathroom: require("../../assets/icons/Frame 54.svg"),
      image: require("../../assets/Images/image 40.png"),
      icon: require("../../assets/icons/UAE.svg"),
      type: "Residential",
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.imageWrapper}>
                <Image source={item.image} style={styles.cardImage} />
                <View style={styles.overlay}>
                  <Image source={item.icon} style={styles.overlayIcon} />
                  <Text style={styles.overlayText}>{item.type}</Text>
                </View>
              </View>
              {/* Details section */}
              <View style={styles.details}>
                <Text style={styles.cardPrice}>{item.price}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardLocation}>{item.location}</Text>
                {/* Icons for features */}
                <View style={styles.features}>
                  <View style={styles.featureItem}>
                    <Image source={item.iconbedroom} />
                    <Text style={styles.featureText}>
                      {item.bedrooms} Bedroom
                    </Text>
                  </View>
                  <View style={styles.featureItem}>
                    <Image source={item.iconbathroom} />
                    <Text style={styles.featureText}>
                      {item.bathrooms} Bathrooms
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </View>
  );
};

export default CardList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 33,
    width: 284,
    height: 385,
    borderWidth: 0.85,
    borderColor: "#EBEBEB",
    left: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  card: {
    marginBottom: 16,
    borderRadius: 22,
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 150,
  },

  imageWrapper: {
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  overlayIcon: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  overlayText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  details: {
    padding: 16,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4caf50",
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  cardLocation: {
    fontSize: 12,
    color: "#666",
    marginBottom: 12,
  },
  features: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureText: {
    fontSize: 12,
    color: "#333",
    marginLeft: 4,
  },
});
