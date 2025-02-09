import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import CustomHeader from '../../commonComponent/Header/CustomHeader';
import i18n from '../../i18n/i18n';
import Button from '@/commonComponent/button/Button';
import { useUpdatePasswordMutation } from '@/src/api/userApiSlice';

const ChangePasswordScreen = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const handleUpdate = async () => {
    try {
      if (!formData.currentPassword) {
        Alert.alert('Error', i18n.t('settings.currentPasswordRequired'));
        return;
      }

      if (!formData.newPassword) {
        Alert.alert('Error', i18n.t('settings.newPasswordRequired'));
        return;
      }

      if (formData.newPassword !== formData.confirmNewPassword) {
        Alert.alert('Error', i18n.t('settings.passwordMismatch'));
        return;
      }

      await updatePassword({
        current_password: formData.currentPassword,
        new_password: formData.newPassword,
      }).unwrap();

      Alert.alert(i18n.t('common.success'), i18n.t('settings.passwordUpdateSuccess'), [
        { text: i18n.t('common.ok'), onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert(i18n.t('common.error'), i18n.t('settings.passwordUpdateError'));
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={i18n.t('settings.changePassword')} showBackButton />
      
      <View style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{i18n.t('settings.currentPassword')}</Text>
            <TextInput
              style={styles.input}
              value={formData.currentPassword}
              onChangeText={(text) => setFormData(prev => ({ ...prev, currentPassword: text }))}
              secureTextEntry
              placeholder={i18n.t('settings.enterCurrentPassword')}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{i18n.t('settings.newPassword')}</Text>
            <TextInput
              style={styles.input}
              value={formData.newPassword}
              onChangeText={(text) => setFormData(prev => ({ ...prev, newPassword: text }))}
              secureTextEntry
              placeholder={i18n.t('settings.enterNewPassword')}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{i18n.t('settings.confirmNewPassword')}</Text>
            <TextInput
              style={styles.input}
              value={formData.confirmNewPassword}
              onChangeText={(text) => setFormData(prev => ({ ...prev, confirmNewPassword: text }))}
              secureTextEntry
              placeholder={i18n.t('settings.confirmNewPassword')}
            />
          </View>
        </View>

        <Button 
          onPress={handleUpdate} 
          style={styles.updateButton}
          disabled={isLoading}
        >
          {isLoading ? i18n.t('common.loading') : i18n.t('settings.update')}
        </Button>
      </View>
    </View>
  );
};

export default ChangePasswordScreen; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '95%',
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  form: {
    flex: 1,
    gap: 24,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1A1A1A',
    fontFamily: 'Inter_400Regular',
  },
  updateButton: {
    marginBottom: 24,
  },
  updateButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
  },
});



