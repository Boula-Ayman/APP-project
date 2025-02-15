import React from "react";
import { View, TextInput } from "react-native";
import MagnifyingGlass from "../../../assets/icons/magnifying-glass.svg";
import styles from "../../../components/homeScreenContainer/HomeScreenStyle";
import i18n from "../../../i18n/i18n";

interface SearchBarProps {
  searchTerm: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onChangeText }) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <TextInput
          style={{
            ...styles.searchInput
          }}
          placeholder={i18n.t("home.searchPlaceholder")}
          value={searchTerm}
          onChangeText={onChangeText}
        />
        <MagnifyingGlass 
            style={{
                ...styles.searchIcon, 
                left: i18n.language === "ar" ? "auto" : 16,
                right: i18n.language === "ar" ? 16 : "auto"
            }}
            
        />
      </View>
    </View>
  );
};

export default SearchBar;
