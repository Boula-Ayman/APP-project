import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import BackArrow from "../../assets/icons/arrow.svg";
import { router } from "expo-router";
import styles from "./NotificationStyle";
import { useTranslation } from "react-i18next";
import NotificationIcon from "../../assets/icons/notification-bing.svg";

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  date: string;
  isNew: boolean;
}

const Notification: React.FC = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      title: "New Property Available",
      message: "A new property in Dubai is now available for investment.",
      date: "2023-10-15",
      isNew: true,
    },
    {
      id: 2,
      title: "New Property Available",
      message: " Property in Dubai is now available for investment.",
      date: "2024-10-15",
      isNew: true,
    },
    {
      id: 3,
      title: "New Property Available",
      message: " Property in Dubai is now available for investment.",
      date: "2024-10-15",
      isNew: true,
    },
    {
      id: 4,
      title: "New Property Available",
      message: " Property in Dubai is now available for investment.",
      date: "2024-10-15",
      isNew: true,
    },
  ]);

  const newNotificationsCount = notifications.filter((n) => n.isNew).length;

  const handleNotificationPress = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id.toString() === id.toString()
          ? { ...notification, isNew: false }
          : notification
      )
    );
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <BackArrow />
            </Pressable>
            <Text style={styles.headerTitle}>{t("notification.title")}</Text>
          </View>
          <View style={styles.mainBody}>
            {notifications.length === 0 ? (
              <View style={styles.notificationList}>
                <View style={styles.notificationContainer}>
                  <Text style={styles.notificationDesc}>
                    {t("notification.Desc")}
                  </Text>
                </View>
                <View style={styles.notificationItem}>
                  <NotificationIcon />
                </View>
                <View style={styles.notificationTextContainer}>
                  <Text style={styles.notificationTextEmpty}>
                    {t("notification.empty")}
                  </Text>
                  <Text style={styles.notificationTextStayTuned}>
                    {t("notification.stayTuned")}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.newNotificationContainer}>
                <View style={styles.newNotificationTitleContainer}>
                  <Text style={styles.newNotificationTitle}>
                    {t("notification.haveNotification")}{" "}
                    <Text style={styles.count}>{newNotificationsCount}</Text>{" "}
                    <Text style={styles.count}>
                      {t("notification.notification")}
                    </Text>
                  </Text>
                </View>
                {notifications.map((notification) => (
                  <Pressable
                    key={notification.id}
                    onPress={() =>
                      handleNotificationPress(notification.id.toString())
                    }
                  >
                    <View
                      style={[
                        styles.newNotificationItem,
                        !notification.isNew && { borderWidth: 0 },
                      ]}
                    >
                      <Text style={styles.notificationTitle}>
                        {notification.title}
                      </Text>
                      <Text style={styles.notificationMessage}>
                        {notification.message}
                      </Text>
                      <Text style={styles.notificationDate}>
                        {notification.date}
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
