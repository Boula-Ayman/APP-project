// SearchBar.tsx
import React from "react";
import { View, TextInput } from "react-native";
import SearchBarIcon from "../../../assets/icons/Tuning2.svg";
import SearchBarIcon2 from "../../../assets/icons/magnifying-glass.svg";
import styles from "../HomeScreenStyle";
import i18n from "../../../src/i18n/i18n";

const SearchBar: React.FC = () => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder={i18n.t("home.searchPlaceholder")}
        />
        <SearchBarIcon2 style={styles.searchIcon} />
      </View>
      <View style={styles.barIcon}>
        <SearchBarIcon style={styles.barIcon2} />
      </View>
    </View>
  );
};

export default SearchBar;
