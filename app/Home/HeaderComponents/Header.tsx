// Header.tsx
import React from 'react';
import { View, Pressable } from 'react-native';
import PropcutLogo from '../../../assets/icons/propcut.svg';
import Notification from '../../../assets/icons/Notification2.svg';
import NoNotification from '../../../assets/icons/Notification1.svg';
import styles from '../../../components/homeScreenContainer/HomeScreenStyle';
import { router } from 'expo-router';
import { useGetNotificationsQuery } from '@/src/api/notificationsApiSlice';

const Header: React.FC = () => {
  const handleNotificationPress = () => {
    router.push('/notificationPage');
  };
  const { data: notifications } = useGetNotificationsQuery(undefined, {
    pollingInterval: 10000,
  });
  console.log(notifications);
  return (
    <View style={styles.header}>
      <View style={styles.logo}>
        <PropcutLogo />
      </View>
      <Pressable onPress={handleNotificationPress}>
        {notifications?.data &&
        notifications.data.filter((n) => !n.read).length > 0 ? (
          <View style={styles.icon}>
            <Notification />
          </View>
        ) : (
          <View style={styles.icon}>
            <NoNotification />
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default Header;
