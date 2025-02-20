import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import i18n from '@/i18n/i18n';

interface PasswordInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  placeholder: string;
  onFocus: () => void;
  isFocused: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ 
  label, 
  value, 
  onChangeText, 
  onBlur, 
  error, 
  touched,
  placeholder,
  onFocus,
  isFocused
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[
        styles.input,
        {
          borderColor: touched && error ? styles.error.color 
            : isFocused || value ? styles.success.color 
            : styles.border.color
        },
      ]}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      onFocus={onFocus}
      secureTextEntry
      placeholder={placeholder}
      placeholderTextColor={styles.placeholderText.color}
    />
    {touched && error && (
      <Text style={styles.errorText}>{error}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    gap: 8,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#1A1A1A',
    marginBottom: 4,
    textAlign: i18n.language === 'ar' ? 'right' : 'left',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1A1A1A',
    fontFamily: 'Inter_400Regular',
    backgroundColor: '#FFFFFF',
    width: '100%',
    textAlign: i18n.language === 'ar' ? 'right' : 'left',
  },
  errorText: {
    color: '#FF4D4D',
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
    textAlign: i18n.language === 'ar' ? 'right' : 'left',
  },
  error: {
    color: '#FF4D4D',
  },
  success: {
    color: '#8BC240',
  },
  border: {
    color: '#EFEFEF',
  },
  placeholderText: {
    color: '#68677799',
  },
});

export default PasswordInput; 