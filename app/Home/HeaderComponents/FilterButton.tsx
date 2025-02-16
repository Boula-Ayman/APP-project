import React, { useEffect, useState } from "react";
import { Modal, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import i18n from "../../../i18n/i18n";
import IMark from "../../../assets/icons/iMark.svg";
import FilterIcon from "../../../assets/icons/Tuning2.svg";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "../../FilterButton/FilterScreenStyle";
import { PROPERTIES_STATUS, PropertiesStatusKeys } from "@/constants/Enums";
import { t } from "i18next";

const staticData = {
  types: [
    { id: 1, label: "Project", value: "project" },
    { id: 2, label: "Property", value: "property" },
  ],
  locations: [
    { id: 1, label: t("UAE"), value: "UAE" },
    { id: 2, label: t("Egypt"), value: "Egypt" },
  ],
};

type FilterButtonProps = {
  onFilterChange: (
    filters: Partial<{
      type: string | null;
      country: string | null;
      status: (typeof PROPERTIES_STATUS)[PropertiesStatusKeys];
    }>
  ) => void;
  filters: Partial<{
    type: string | null;
    country: string | null;
    status: (typeof PROPERTIES_STATUS)[PropertiesStatusKeys];
  }> | null;
  clearFilters: () => void;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  onFilterChange,
  filters,
  clearFilters,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(filters?.type);
  const [selectedLocation, setSelectedLocation] = useState(filters?.country);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  useEffect(() => {
    setSelectedLocation(filters?.country);
    setSelectedType(filters?.type);
  }, [filters]);

  const handleFilterResults = () => {
    let newFilters = {};

    if (selectedLocation) {
      newFilters = {
        ...newFilters,
        country: selectedLocation,
      };
    }
    if (selectedType) {
      newFilters = {
        ...newFilters,
        type: selectedType,
      };
    }

    setIsModalVisible(false);
    onFilterChange(newFilters);
  };

  return (
    <View>
      {selectedLocation || selectedType ? (
        <TouchableOpacity style={styles.barIcon} onPress={clearFilters}>
          <Ionicons name="close" size={20} color="black" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.barIcon}
          onPress={() => setIsModalVisible(true)}
        >
          <FilterIcon />
        </TouchableOpacity>
      )}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.container}>
            <View style={styles.topSection}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.middleSection}>
            <View style={styles.contentSection}>
              <Text style={styles.sectionTitle}>{i18n.t("filter")}</Text>
              <View style={styles.dropdownContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={[styles.label, { marginRight: 7 }]}>
                    {t("type")}
                  </Text>
                  <View style={styles.cirlce}>
                    <IMark />
                  </View>
                </View>
                <View style={{ zIndex: 2 }}>
                  <DropDownPicker
                    open={isTypeOpen}
                    value={selectedType ?? null}
                    items={staticData.types.map((item) => ({
                      label: item.label,
                      value: item.value,
                    }))}
                    closeOnBackPressed={true}
                    closeAfterSelecting={true}
                    setOpen={setIsTypeOpen}
                    setValue={setSelectedType}
                    placeholder={t("all")}
                    style={{
                      borderColor: "#ccc",
                      borderWidth: 1,
                      borderRadius: 8,
                      padding: 12,
                      zIndex: 999,
                    }}
                    dropDownContainerStyle={{
                      borderColor: "#ccc",
                      borderWidth: 1,
                      borderRadius: 8,
                      zIndex: 1500,
                    }}
                  />
                </View>
              </View>

              <View style={styles.dropdownContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={[styles.label, { marginRight: 7 }]}>
                    {t("location")}
                  </Text>
                  <View style={styles.cirlce}>
                    <IMark />
                  </View>
                </View>
                <View style={{ zIndex: 1 }}>
                  <DropDownPicker
                    open={isLocationOpen}
                    value={selectedLocation ?? null}
                    items={staticData.locations.map((item) => ({
                      label: item.label,
                      value: item.value,
                    }))}
                    closeOnBackPressed={true}
                    closeAfterSelecting={true}
                    setOpen={setIsLocationOpen}
                    setValue={setSelectedLocation}
                    placeholder={t("all")}
                    style={{
                      borderColor: "#ccc",
                      borderWidth: 1,
                      borderRadius: 8,
                      padding: 12,
                    }}
                    dropDownContainerStyle={{
                      borderColor: "#ccc",
                      borderWidth: 1,
                      borderRadius: 8,
                    }}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.filterButtonLarge}
                onPress={handleFilterResults}
              >
                <Text style={styles.filterButtonLargeText}>
                  {t("filterResult")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FilterButton;
