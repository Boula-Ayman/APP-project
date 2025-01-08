import React, { useState } from "react";
import { Modal, TouchableOpacity, View, StyleSheet } from "react-native";
import FilterIcon from "../../../assets/icons/Tuning2.svg"; // Ensure this path is correct
import FilterScreen from "../../FilterButton/index"; // Ensure this path is correct
import styles from "../HomeScreenStyle"; // Assuming this contains styling for `barIcon` and `barIcon2`

const FilterButton: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        transparent={false}
        onRequestClose={() => setIsModalVisible(false)} // Required for Android's back button
      >
        <FilterScreen
          onClose={() => setIsModalVisible(false)} // Pass the close handler to FilterScreen
        />
      </Modal>
    </View>
  );
};

export default FilterButton;
