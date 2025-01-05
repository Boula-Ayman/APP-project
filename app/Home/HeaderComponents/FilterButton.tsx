import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "../HomeScreenStyle";
import FilterIcon from "../../../assets/icons/Tuning2.svg";
import { useRouter } from "expo-router";
interface FilterButtonProps {
  // onPress: () => void;
}
const FilterButton: React.FC<FilterButtonProps> = ({}) => {
  return (
    <TouchableOpacity style={styles.barIcon}>
      <FilterIcon style={styles.barIcon2} />
    </TouchableOpacity>
  );
};

export default FilterButton;
