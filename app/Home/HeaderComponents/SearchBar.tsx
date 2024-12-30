import React from "react";
import { View, TextInput } from "react-native";
import MagnifyingGlass from "../../../assets/icons/magnifying-glass.svg";
import styles from "../HomeScreenStyle";
import i18n from "../../../src/i18n/i18n";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder={i18n.t("home.searchPlaceholder")}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        <MagnifyingGlass style={styles.searchIcon} />
      </View>
    </View>
  );
};

export default SearchBar;
