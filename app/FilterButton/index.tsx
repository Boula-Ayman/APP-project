import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useGetOpportunitiesQuery } from "../../src/api/opportunitiesApiSlice";
import { Ionicons } from "@expo/vector-icons";
import i18n from "../../src/i18n/i18n";
import IMark from "../../assets/icons/iMark.svg";
import styles from "./FilterScreenStyle";
import DropDownPicker from "react-native-dropdown-picker";

const staticData = {
  types: [
    { id: 1, label: "Project", value: "Project" },
    { id: 2, label: "Property", value: "Property" },
  ],
  locations: [
    { id: 1, label: "UAE", value: "UAE" },
    { id: 2, label: "Egypt", value: "Egypt" },
  ],
  statuses: [
    { id: 1, label: "ALL", value: "ALL" },
    { id: 2, label: "Available", value: "Available" },
    { id: 3, label: "Sold Out", value: "Sold Out" },
  ],
};

const FilterScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const [filters, setFilters] = useState<{
    type: string;
    country: string;
    status: string | undefined;
  }>({
    type: "",
    country: "",
    status: "",
  });

  const { data, error, refetch } = useGetOpportunitiesQuery(filters);

  const handleFilterResults = () => {
    const newFilters = {
      type: selectedType,
      country: selectedLocation,
      status: selectedStatus === "ALL" ? undefined : selectedStatus,
    };

    // update the filters state
    setFilters(newFilters);

    console.log("Selected Filters:", newFilters);

    // refetch the  data with the new filters
    refetch();

    if (error) {
      console.error("Error fetching opportunities:", error);
    } else {
      console.log("Fetched opportunities:", data);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
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
              <Text style={[styles.label, { marginRight: 7 }]}>Location</Text>
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

          {/* filter results button */}
          <TouchableOpacity
            style={styles.filterButtonLarge}
            onPress={handleFilterResults}
          >
            <Text style={styles.filterButtonLargeText}>Filter Results</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default FilterScreen;
