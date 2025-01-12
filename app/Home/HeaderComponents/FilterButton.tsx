import React, { useState } from "react";
import { Modal, TouchableOpacity, View, StyleSheet } from "react-native";
import FilterIcon from "../../../assets/icons/Tuning2.svg";
import FilterScreen from "../../FilterButton/index";
import styles from "../HomeScreenStyle";

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
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <FilterScreen onClose={() => setIsModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default FilterButton;
