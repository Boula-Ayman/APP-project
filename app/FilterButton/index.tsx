import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import i18n from "../../src/i18n/i18n";
import ExcMark from "../../assets/icons/ExcMark16.svg";
import IMark from "../../assets/icons/iMark.svg";
import styles from "./FilterScreenStyle";
import { useGetOpportunitiesQuery } from "@/src/api/opportunitiesApiSlice";
import DropDownPicker from "react-native-dropdown-picker";

const FilterScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { data } = useGetOpportunitiesQuery({
    refetchOnMountOrArgChange: true,
  });
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const optionsType = data?.data.map((opportunity) => ({
    label: opportunity.opportunity_type,
    value: opportunity.opportunity_type,
  }));

  const optionsLocation = data?.data.map((opportunity) => ({
    label: opportunity.location_en || opportunity.location_ar,
    value: opportunity.location_en || opportunity.location_ar,
  }));
  const handleOpenType = () => {
    setIsTypeOpen(true);
    setIsLocationOpen(false);
  };

  const handleOpenLocation = () => {
    setIsTypeOpen(false);
    setIsLocationOpen(true);
  };
  const handleIconPress = () => {
    setIsTypeOpen(false);
    setIsLocationOpen(false);
  };
  console.log(optionsType);
  console.log(optionsLocation);

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
          <Text style={styles.sectionTitle}>{i18n.t("home.filterBy")}</Text>
          {/* dropdowns for  type and location */}
          <View style={styles.dropdownContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.label, { marginRight: 7 }]}>
                Property Type
              </Text>
              <View style={styles.cirlce}>
                <IMark />
              </View>
            </View>
            {optionsType?.length > 0 && (
              <DropDownPicker
                open={isTypeOpen}
                value={selectedType}
                items={optionsType}
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
                  marginBottom: 20,
                }}
                dropDownContainerStyle={{
                  borderColor: "#ccc",
                  borderWidth: 1,
                  borderRadius: 8,
                }}
              />
            )}
          </View>

          <View style={styles.dropdownContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.label, { marginRight: 7 }]}>
                Property Location
              </Text>
              <View style={styles.cirlce}>
                <IMark />
              </View>
            </View>
            {optionsLocation?.length > 0 && (
              <DropDownPicker
                open={isLocationOpen}
                value={selectedLocation}
                items={optionsLocation}
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
            )}
          </View>
          <TouchableOpacity style={styles.filterButtonLarge}>
            <Text style={styles.filterButtonLargeText}>Filter Results</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
export default FilterScreen;
