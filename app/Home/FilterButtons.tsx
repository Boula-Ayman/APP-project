// FilterButtons.tsx
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../../components/homeScreenContainer/HomeScreenStyle";
import i18n from "../../src/i18n/i18n";
interface FilterButtonsProps {
  onFilterChange: (newStatus: string | null) => void;
}
const FilterButtons: React.FC<FilterButtonsProps> = ({ onFilterChange }) => {
  return (
    <View style={styles.filters}>
      <TouchableOpacity
        style={styles.filterButtonActive}
        onPress={() => onFilterChange(null)}
      >
        <Text style={styles.filterTextActive}>{i18n.t("home.all")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => onFilterChange("available")}
      >
        <Text style={styles.filterText}>{i18n.t("home.available")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => onFilterChange("sold out")}
      >
        <Text style={styles.filterText}>{i18n.t("home.soldOut")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterButtons;
