import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import React from 'react';
import ProfileArrow from '../../assets/icons/ProfileArrow.svg';

interface SettingButtonProps {
  icon: React.FC<any>;
  title: string;
  onPress: () => void;
  withBorder?: boolean;
  textColor?: string;
  iconColor?: string;
  showArrow?: boolean;
  style?: StyleProp<ViewStyle>;
}

const SettingButton = ({
  icon: Icon,
  title,
  onPress,
  withBorder = false,
  textColor = '#1A1A1A',
  iconColor,
  showArrow = true,
  style,
}: SettingButtonProps) => {
  return (
    <TouchableOpacity style={[styles.container, withBorder && styles.withBorder, style]} onPress={onPress}>
      <View style={styles.contentContainer}>
        <Icon style={[styles.icon, iconColor && { color: iconColor }]} />
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      </View>
      {showArrow && <ProfileArrow style={styles.arrow} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  withBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  arrow: {
    width: 24,
    height: 24,
  },
});

export default SettingButton; 