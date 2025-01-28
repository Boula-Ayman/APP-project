import React, { useState } from "react";
import { Modal, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useGetOpportunitiesQuery } from "../../../src/api/opportunitiesApiSlice";
import i18n from "../../../src/i18n/i18n";
import IMark from "../../../assets/icons/iMark.svg";
import FilterIcon from "../../../assets/icons/Tuning2.svg";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "../../FilterButton/FilterScreenStyle";
import { PROPERTIES_STATUS, PropertiesStatusKeys } from "@/constants/Enums";

const staticData = {
  types: [
    { id: 1, label: "Project", value: "project" },
    { id: 2, label: "Property", value: "property" },
  ],
  locations: [
    { id: 1, label: "UAE", value: "UAE" },
    { id: 2, label: "Egypt", value: "Egypt" },
  ],
  statuses: [
    { id: 1, label: "ALL", value: "all" },
    { id: 2, label: "Available", value: "available" },
    { id: 3, label: "Sold Out", value: "sold out" },
  ],
};

type FilterButtonProps = {
  onFilterChange: (filters: Partial<{
    type: string | null;
    country: string | null;
    status: typeof PROPERTIES_STATUS[PropertiesStatusKeys];
  }>) => void;
};

const FilterButton: React.FC<FilterButtonProps> = ({ onFilterChange }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const [filters, setFilters] = useState<Partial<{
    type: string | null;
    country: string | null;
    status: string | null;
  }>>({});
  const handleFilterResults = () => {
    let newFilters = {};

    if(selectedLocation) {
        newFilters = {
            ...newFilters,
            country: selectedLocation
        }
    }
    if(selectedType) {
        newFilters = {
            ...newFilters,
            type: selectedType
        }
    }
    if(selectedStatus && selectedStatus !== 'all') {
        newFilters = {
            ...newFilters,
            status: selectedStatus
        }
    }
    setIsModalVisible(false);
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <View>
      {/* Filter Button */}
      <TouchableOpacity
        style={styles.barIcon}
        onPress={() => setIsModalVisible(true)}
      >
        <FilterIcon style={styles.barIcon2} />
      </TouchableOpacity>

      {/* Modal for FilterScreen */}
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
              {/* Dropdown for Type */}
              <View style={styles.dropdownContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={[styles.label, { marginRight: 7 }]}>Type</Text>
                  <View style={styles.cirlce}>
                    <IMark />
                  </View>
                </View>
                <DropDownPicker
                  open={isTypeOpen}
                  value={selectedType}
                  items={staticData.types}
                  closeOnBackPressed={true}
                  closeAfterSelecting={true}
                  setOpen={setIsTypeOpen}
                  setValue={setSelectedType}
                  placeholder="All"
                  style={{
                    borderColor: "#ccc",
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 15,
                  }}
                  dropDownContainerStyle={{
                    borderColor: "#ccc",
                    borderWidth: 1,
                    borderRadius: 8,
                  }}
                />
              </View>

              {/* Dropdown for Location */}
              <View style={styles.dropdownContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={[styles.label, { marginRight: 7 }]}>
                    Location
                  </Text>
                  <View style={styles.cirlce}>
                    <IMark />
                  </View>
                </View>
                <DropDownPicker
                  open={isLocationOpen}
                  value={selectedLocation}
                  items={staticData.locations}
                  closeOnBackPressed={true}
                  closeAfterSelecting={true}
                  setOpen={setIsLocationOpen}
                  setValue={setSelectedLocation}
                  placeholder="All"
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

              {/* Dropdown for Status */}
              <View style={styles.dropdownContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={[styles.label, { marginRight: 7 }]}>Status</Text>
                  <View style={styles.cirlce}>
                    <IMark />
                  </View>
                </View>
                <DropDownPicker
                  open={isStatusOpen}
                  value={selectedStatus}
                  items={staticData.statuses}
                  closeOnBackPressed={true}
                  closeAfterSelecting={true}
                  setOpen={setIsStatusOpen}
                  setValue={setSelectedStatus}
                  placeholder="All"
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

              {/* Filter Results Button */}
              <TouchableOpacity
                style={styles.filterButtonLarge}
                onPress={handleFilterResults}
              >
                <Text style={styles.filterButtonLargeText}>Filter Results</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FilterButton;
