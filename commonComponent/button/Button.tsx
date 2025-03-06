import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  disabled,
  style,
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.buttonText}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#8BC240',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,

    alignItems: 'center',
    width: '100%',
    height: 56,
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 25.6,
    textAlign: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    lineHeight: 25.6,
  },
});

export default Button;
