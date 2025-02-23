import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import MagnifyingGlass from "../../../assets/icons/magnifying-glass.svg";
import styles from "../../../components/homeScreenContainer/HomeScreenStyle";
import i18n from "../../../i18n/i18n";

interface SearchBarProps {
  searchTerm: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onChangeText }) => {
  const handleClearSearch = () => {
    onChangeText("");
  };

  return (
    <View style={styles.searchContainer}>
      <View
        style={{
          ...styles.searchBar,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          style={{
            ...styles.searchInput,
            flex: 1,
            paddingRight: i18n.language === "ar" ? 45 : 10,
            paddingLeft: i18n.language === "ar" ? 10 : 45,
            textAlign: i18n.language === "ar" ? "right" : "left",
          }}
          placeholder={i18n.t("home.searchPlaceholder")}
          value={searchTerm}
          onChangeText={onChangeText}
          placeholderTextColor={"#00000091"}
        />
        <MagnifyingGlass
          style={{
            ...styles.searchIcon,
            left: i18n.language === "ar" ? "auto" : 16,
            right: i18n.language === "ar" ? 16 : "auto",
          }}
        />
        {searchTerm && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearSearch}
            accessibilityLabel="Clear search"
            accessibilityRole="button"
          >
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchBar;
