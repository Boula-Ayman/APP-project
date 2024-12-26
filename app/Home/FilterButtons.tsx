// FilterButtons.tsx
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./HomeScreenStyle";
import i18n from "../../src/i18n/i18n";
const FilterButtons = () => {
  return (
    <View style={styles.filters}>
      <TouchableOpacity style={styles.filterButtonActive}>
        <Text style={styles.filterTextActive}>{i18n.t("home.all")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterText}>{i18n.t("home.available")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterText}>{i18n.t("home.soldOut")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterButtons;
