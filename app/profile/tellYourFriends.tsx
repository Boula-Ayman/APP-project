import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
  Alert,
  Image,
  Share,
} from 'react-native';
import * as Contacts from 'expo-contacts';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../../commonComponent/Header/CustomHeader';
import { noImagePlaceHolder } from '@/utils/noImagePlaceHolder';
import { useTranslation } from 'react-i18next';

const TellYourFriends = () => {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const isRTL = I18nManager.isRTL; // Detect RTL for Arabic
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
        } else {
          Alert.alert(t('profile.noContactsFound'));
        }
      }
    })();
  }, []);

  const shareApp = async () => {
    try {
      const result = await Share.share({
        message: `Check out my app! Here are some contacts`,
      });

      if (result.action === Share.sharedAction) {
        Alert.alert('Link Shared');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share the link.');
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title={t('profile.tell_your_friends.title')}
        showBackButton
      />

      <FlatList
        data={contacts}
        ListHeaderComponent={
          <TouchableOpacity onPress={shareApp}>
            <View
              style={{
                marginVertical: 30,
                alignItems: 'center',
                flexDirection: 'row',
                gap: 10,
              }}
            >
              <Text style={styles.contactName}>
                {t('profile.tell_your_friends.share_link')}
              </Text>
              <Ionicons name="share-social" size={24} color="black" />
            </View>
          </TouchableOpacity>
        }
        renderItem={({ item }) => (
          <View style={[styles.contactItem, isRTL && styles.rtl]}>
            {item.imageAvailable && item.image?.uri ? (
              <Image
                source={{
                  uri: item.image.uri ? item.image.uri : noImagePlaceHolder,
                }}
                style={styles.contactImage}
              />
            ) : (
              <Ionicons
                name="person-circle-outline"
                size={40}
                color="gray"
                style={styles.contactImage}
              />
            )}
            <View style={styles.textContainer}>
              <Text style={styles.contactName}>{item.name}</Text>
              {item.phoneNumbers?.[0]?.number && (
                <Text style={styles.phoneNumber}>
                  {item.phoneNumbers[0].number}
                </Text>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TellYourFriends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '85%',
    alignSelf: 'center',
  },
  contactItem: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rtl: {
    flexDirection: 'row-reverse',
  },
  contactImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phoneNumber: {
    fontSize: 14,
    color: 'gray',
  },
});
