import { Text, View } from "react-native";
import React from "react";
import styles from "../HomeScreenStyle";
import FilterIcon from "../../../assets/icons/Tuning2.svg";

const FilterButton = () => {
  return (
    <View style={styles.barIcon}>
      <FilterIcon style={styles.barIcon2} />
    </View>
  );
};

export default FilterButton;
