import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "../HomeScreenStyle";
import FilterIcon from "../../../assets/icons/Tuning2.svg";
interface FilterButtonProps {
  onPress: () => void;
}
const FilterButton: React.FC<FilterButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.barIcon}>
      <FilterIcon style={styles.barIcon2} />
    </TouchableOpacity>
  );
};

export default FilterButton;
