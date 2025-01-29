// FilterButtons.tsx
import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../../components/homeScreenContainer/HomeScreenStyle";
import i18n from "../../src/i18n/i18n";
interface FilterButtonsProps {
  onFilterChange: (newStatus: string | null) => void;
}
const FilterButtons: React.FC<FilterButtonsProps> = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const handleFilterChange = (newStatus: string | null) => {
    setActiveFilter(newStatus);
    onFilterChange(newStatus);
  };
  return (
    <View style={styles.filters}>
      <TouchableOpacity
        style={
          activeFilter === null
            ? styles.filterButtonActive
            : styles.filterButton
        }
        onPress={() => handleFilterChange(null)}
      >
        <Text
          style={
            activeFilter === null ? styles.filterTextActive : styles.filterText
          }
        >
          {i18n.t("home.all")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          activeFilter === "available"
            ? styles.filterButtonActive
            : styles.filterButton
        }
        onPress={() => handleFilterChange("available")}
      >
        <Text
          style={
            activeFilter === "available"
              ? styles.filterTextActive
              : styles.filterText
          }
        >
          {i18n.t("home.available")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          activeFilter === "sold out"
            ? styles.filterButtonActive
            : styles.filterButton
        }
        onPress={() => handleFilterChange("sold out")}
      >
        <Text
          style={
            activeFilter === "sold out"
              ? styles.filterTextActive
              : styles.filterText
          }
        >
          {i18n.t("home.soldOut")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterButtons;
