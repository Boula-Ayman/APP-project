import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export interface TagProps {
  text: string;
  type?: 'property_type' | 'status';
  status?: 'confirmed' | 'pending' | 'cancelled';
  containerStyle?: object;
}

const Tag: React.FC<TagProps> = ({
  text,
  type = 'property_type',
  status,
  containerStyle,
}) => {
  const getStatusColor = () => {
    if (type === 'property_type' || !status) return '#FFFFFF';

    switch (status) {
      case 'confirmed':
        return '#8BC240';
      case 'pending':
        return '#FFA500';
      case 'cancelled':
        return '#FF4444';
      default:
        return '#FFFFFF';
    }
  };

  const getStatusIcon = () => {
    if (type === 'property_type') return null;

    switch (status) {
      case 'confirmed':
        return (
          <FontAwesome
            name="check-circle"
            size={16}
            color="#fff"
            style={styles.statusIcon}
          />
        );
      case 'pending':
        return (
          <MaterialCommunityIcons
            name="clock-time-eight"
            size={16}
            color="#fff"
            style={styles.statusIcon}
          />
        );
      case 'cancelled':
        return (
          <MaterialIcons
            name="cancel"
            size={16}
            color="#fff"
            style={styles.statusIcon}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View
      style={[
        styles.container,
        type === 'status' && { backgroundColor: getStatusColor() },
        containerStyle,
      ]}
    >
      {getStatusIcon()}
      <Text style={[styles.text, type === 'status' && { color: '#FFFFFF' }]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 20,
    height: 30,
  },
  text: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#000',
  },
  statusIcon: {
    marginRight: 4,
  },
});

export default Tag;
