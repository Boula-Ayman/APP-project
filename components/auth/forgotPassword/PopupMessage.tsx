import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface PopupMessageProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const PopupMessage: React.FC<PopupMessageProps> = ({
  message,
  type,
  onClose,
}) => {
  return (
    <View
      style={[
        styles.container,
        type === 'success' ? styles.success : styles.error,
      ]}
    >
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  success: {
    backgroundColor: '#4CAF50',
  },
  error: {
    backgroundColor: '#F44336',
  },
  message: {
    color: 'white',
    fontSize: 14,
    flex: 1,
  },
  closeButton: {
    marginLeft: 10,
  },
  closeText: {
    color: 'white',
    fontSize: 20,
  },
});

export default PopupMessage;
