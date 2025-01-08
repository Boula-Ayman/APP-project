import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FilterScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedBedrooms, setSelectedBedrooms] = useState<number | null>(null);
  const [selectedBathrooms, setSelectedBathrooms] = useState<number | null>(
    null
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Properties</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Filter Section */}
        <Text style={styles.sectionTitle}>Filter By</Text>

        {/* Dropdowns for Property Type and Location */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Property Type</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>All</Text>
            <Ionicons name="chevron-down" size={16} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Property Location</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>All</Text>
            <Ionicons name="chevron-down" size={16} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Bedrooms and Bathrooms */}
        <Text style={styles.label}>Bedrooms</Text>
        <View style={styles.filterRow}>
          {[1, 2, 3, 4, 5].map((bedroom) => (
            <TouchableOpacity
              key={bedroom}
              style={[
                styles.filterButton,
                selectedBedrooms === bedroom && styles.selectedButton,
              ]}
              onPress={() => setSelectedBedrooms(bedroom)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedBedrooms === bedroom && styles.selectedButtonText,
                ]}
              >
                {bedroom}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Bathrooms</Text>
        <View style={styles.filterRow}>
          {[1, 2, 3, 4, 5].map((bathroom) => (
            <TouchableOpacity
              key={bathroom}
              style={[
                styles.filterButton,
                selectedBathrooms === bathroom && styles.selectedButton,
              ]}
              onPress={() => setSelectedBathrooms(bathroom)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedBathrooms === bathroom && styles.selectedButtonText,
                ]}
              >
                {bathroom}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Filter Results Button */}
        <TouchableOpacity style={styles.filterButtonLarge}>
          <Text style={styles.filterButtonLargeText}>Filter Results</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  dropdownText: {
    fontSize: 14,
    color: "#555",
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  filterButton: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  selectedButton: {
    backgroundColor: "#8bc240",
    borderColor: "#8bc240",
  },
  filterButtonText: {
    fontSize: 14,
    color: "#555",
  },
  selectedButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  filterButtonLarge: {
    marginTop: 24,
    backgroundColor: "#8bc240",
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 8,
  },
  filterButtonLargeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FilterScreen;
