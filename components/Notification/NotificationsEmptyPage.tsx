import React from 'react';
import { View, Text } from 'react-native';
import NotificationIcon from '../../assets/icons/notification-bing.svg';
import styles from './NotificationStyle';
import { useTranslation } from 'react-i18next';

const EmptyNotifications: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.notificationList}>
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationDesc}>{t('notification.Desc')}</Text>
      </View>
      <View style={styles.notificationItem}>
        <NotificationIcon />
      </View>
      <View style={styles.notificationTextContainer}>
        <Text style={styles.notificationTextEmpty}>
          {t('notification.empty')}
        </Text>
        <Text style={styles.notificationTextStayTuned}>
          {t('notification.stayTuned')}
        </Text>
      </View>
    </View>
  );
};

export default EmptyNotifications;
