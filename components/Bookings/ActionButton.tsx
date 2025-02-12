import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  stretched?: boolean;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ 
  icon, 
  label, 
  onPress, 
  stretched = false, 
  disabled = false 
}) => (
  <TouchableOpacity 
    style={[
      styles.actionItem,
      stretched && styles.stretchedActionItem
    ]}
    onPress={onPress}
    disabled={disabled}
  >
    <View style={[
      styles.actionButton,
      stretched && styles.stretchedActionButton
    ]}>
      {icon}
    </View>
    <Text style={styles.actionText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  actionItem: {
    alignItems: 'center',
    width: '30%',
  },
  stretchedActionItem: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#F7F8FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stretchedActionButton: {
    width: '100%',
    height: 70,
    borderRadius: 12,
    backgroundColor: '#F7F8FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#333',
  },
});

export default ActionButton; 