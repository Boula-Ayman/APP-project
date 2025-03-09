import React, { useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import BackArrow from '../../assets/icons/arrow.svg';
import { router } from 'expo-router';
import styles from './NotificationStyle';
import { useTranslation } from 'react-i18next';
import NotificationsEmptyPage from './NotificationsEmptyPage';
import {
  useGetNotificationsQuery,
  useReadAllNotificationsMutation,
} from '@/src/api/notificationsApiSlice';

const Notification: React.FC = () => {
  const { t } = useTranslation();
  const { data: notifications } = useGetNotificationsQuery();
  const [readAllNotifications] = useReadAllNotificationsMutation();

  const newNotificationsCount = notifications?.data.filter(
    (n) => !n.read,
  ).length;

  const handleNotificationPress = async () => {
    try {
      await readAllNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      await readAllNotifications();
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <BackArrow />
            </Pressable>
            <Text style={styles.headerTitle}>{t('notification.title')}</Text>
          </View>
          <View style={styles.mainBody}>
            {notifications?.data.length === 0 ? (
              <NotificationsEmptyPage />
            ) : (
              <View style={styles.newNotificationContainer}>
                <View style={styles.newNotificationTitleContainer}>
                  <Text style={styles.newNotificationTitle}>
                    {t('notification.haveNotification')}
                    <Text style={styles.count}>
                      {t('notification.unreadNotifications', {
                        count: newNotificationsCount,
                      })}
                    </Text>{' '}
                  </Text>
                </View>
                {notifications?.data.map((notification) => (
                  <Pressable
                    key={notification.id}
                    onPress={() => handleNotificationPress()}
                  >
                    <View
                      style={[
                        styles.newNotificationItem,
                        notification.read && { borderColor: '#EBEBEB' },
                      ]}
                    >
                      <Text style={styles.notificationTitle}>
                        {notification.title}
                      </Text>
                      <Text style={styles.notificationMessage}>
                        {notification.message}
                      </Text>
                      <Text style={styles.notificationDate}>
                        {notification.created_at}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Notification;
