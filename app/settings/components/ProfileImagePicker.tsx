import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import i18n from '../../../i18n/i18n';
import Toast from 'react-native-toast-message';

interface ProfileImagePickerProps {
  value: string | null;
  onChange: (value: string) => void;
}

export const ProfileImagePicker: React.FC<ProfileImagePickerProps> = ({ value, onChange }) => {
  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        onChange(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Toast.show({
        type: 'error',
        text1: i18n.t('common.error'),
        text2: i18n.t('settings.photoSelectError'),
      });
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleImagePick}>
      <View>
        <View style={[styles.placeholder, value && { display: 'none' }]}>
          <Text style={styles.placeholderText}>{i18n.t('settings.selectPhoto')}</Text>
        </View>
        <Image 
          source={value ? { uri: value } : undefined}
          style={[styles.photo, !value && { display: 'none' }]} 
        />
        <View style={styles.overlay}>
          <Text style={styles.placeholderText}>{i18n.t('settings.selectPhoto')}</Text>
        </View>
      </View>
      
      <View style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginBottom: 32,
    position: 'relative',
    borderRadius: 100,
    borderColor: '#00000033',
    borderWidth: 5,
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8BC240',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
} as const); 