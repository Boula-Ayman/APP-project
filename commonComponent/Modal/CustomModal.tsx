import React from 'react';
import { Modal, TouchableOpacity, View, StyleSheet, Dimensions, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

interface CustomModalProps {
  isVisible: boolean;
  onClose: () => void;
  onModalHide?: () => void;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ isVisible, onClose, onModalHide, children }) => {
  const handleDismiss = () => {
    onModalHide?.();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      onDismiss={handleDismiss}
    >
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.middleSection}>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const { height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "flex-end",
  },
  contentContainer: {
    position: 'relative',
    marginTop: 120,
  },
  closeButton: {
    position: "absolute",
    top: -60,
    right: 20,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 8,
    zIndex: 1,
  },
  middleSection: {
    maxHeight: screenHeight * 0.9,
    backgroundColor: "white",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    padding: 10,
    overflow: 'hidden',
  },
});

export default CustomModal; 