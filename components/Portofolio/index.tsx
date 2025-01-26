import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MoneySend from "../../assets/icons/money-send.svg";
import MoneyRecive from "../../assets/icons/money-recive.svg";
import LoveIcon from "../../assets/icons/Heart.svg";

const PortfolioPage: React.FC = () => {
  const units = [
    {
      id: 1,
      price: "75,000 AED",
      ownership: "4/8 ownership",
      name: "Tranquil Haven in the Woods",
      location: "Dubai Marina, Dubai, UAE",
      size: "2,553 sqft",
      bedrooms: "2 Bedroom",
      bathrooms: "2 Bathroom",
      image: "https://via.placeholder.com/150", // Replace with your image URL
    },
    {
      id: 2,
      price: "75,000 AED",
      ownership: "4/8 ownership",
      name: "Tranquil Haven in the Woods",
      location: "Dubai Marina, Dubai, UAE",
      size: "2,553 sqft",
      bedrooms: "2 Bedroom",
      bathrooms: "2 Bathroom",
      image: "https://via.placeholder.com/150", // Replace with your image URL
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Page Title */}
      <Text style={styles.title}>My Portfolio</Text>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={[styles.summaryCard, { backgroundColor: "#8BC240" }]}>
          <MoneySend style={styles.summaryIcon} />

          <Text style={styles.summaryTitle}>
            1,000,000 <Text style={styles.summaryDetails}>AED</Text>
          </Text>
          <Text style={styles.summarySubtitle1}>Total Investment</Text>
        </View>
      </View>
      <View style={[styles.summaryCard, { backgroundColor: "#90CAF9" }]}>
        <MoneyRecive style={styles.summaryIcon} />
        <Text style={styles.summaryTitle}>
          200,000 <Text style={styles.summaryDetails}>AED</Text>
        </Text>
        <Text style={styles.summarySubtitle2}>Total Rental Income Paid</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statsBox}>
          <Text style={styles.statsValue}>41</Text>
          <Text style={styles.statsLabel}>Nights</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={styles.statsValue}>5.37%</Text>
          <Text style={styles.statsLabel}>Yield in 2024</Text>
        </View>
      </View>

      {/* My Units Section */}
      <Text style={styles.sectionTitle}>My Units (5)</Text>
      <Text style={styles.sectionSubtitle}>
        Explore your curated investment portfolio, where you can effortlessly.
      </Text>

      {units.map((unit) => (
        <View key={unit.id} style={styles.unitCard}>
          <Image source={{ uri: unit.image }} style={styles.unitImage} />
          <View style={styles.unitIcons}></View>
          <View style={styles.unitDetails}>
            <TouchableOpacity style={styles.iconButton}>
              <LoveIcon style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.unitPrice}>{unit.price}</Text>
            <Text style={styles.unitOwnership}>{unit.ownership}</Text>
            <Text style={styles.unitName}>{unit.name}</Text>
            <Text style={styles.unitLocation}>{unit.location}</Text>
            <Text style={styles.unitInfo}>
              {unit.size} • {unit.bedrooms} • {unit.bathrooms}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    height: 100,
    borderRadius: 20,
    padding: 16,

    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryIcon: {
    position: "absolute",
    top: 35,
    left: 25,
  },
  summaryTitle: {
    fontFamily: "Inter",
    fontSize: 24,
    fontWeight: "600",
    color: "#14161C",
  },
  summaryDetails: {
    fontFamily: "Inter",
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 80.28,
    letterSpacing: -0.48,
    textAlign: "left",
    color: "#fff",
  },
  summarySubtitle1: {
    fontSize: 14,
    color: "#464851",
    left: -20,
    top: -5,
    fontFamily: "Inter",
    fontWeight: "500",
    letterSpacing: -0.48,
  },
  summarySubtitle2: {
    fontSize: 14,
    color: "#464851",
    left: 10,
    top: -5,
    fontFamily: "Inter",
    fontWeight: "500",
    letterSpacing: -0.48,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statsBox: {
    flex: 1,
    height: 80,
    borderRadius: 30,
    borderColor: "#8BC240",
    borderWidth: 1,
    backgroundColor: "#fff",
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  statsValue: {
    fontSize: 26,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Inter",
    lineHeight: 31.2,
    letterSpacing: -0.48,
    right: 23,
  },
  statsLabel: {
    fontSize: 14,
    color: "#777",
    fontFamily: "Inter",
    right: 17,
    top: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 10,
  },
  sectionSubtitle: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    letterSpacing: -0.48,
    textAlign: "left",
    color: "#464851",
    marginBottom: 15,
    marginLeft: 10,
  },

  unitCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    width: "95%",
    marginLeft: 6,
  },
  unitImage: {
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 299,
  },
  unitIcons: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
    top: 10,
  },
  iconButton: {
    justifyContent: "flex-start",
    width: 38,
    height: 36,
    marginLeft: 240,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
  },
  icon: {
    fontSize: 20,
    color: "black",
    alignSelf: "center",
    top: -2,
  },
  unitDetails: {
    padding: 16,
  },
  unitPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  unitOwnership: {
    fontSize: 14,
    color: "#777",
    marginBottom: 8,
  },
  unitName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  unitLocation: {
    fontSize: 14,
    color: "#777",
    marginBottom: 8,
  },
  unitInfo: {
    fontSize: 14,
    color: "#333",
  },
});

export default PortfolioPage;
