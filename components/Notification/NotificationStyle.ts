import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
    transform: [{ translateY: 20 }, { translateX: -20 }],
  },
  backButton: {
    marginTop: 50,
    position: "absolute",
    left: 10,
    backgroundColor: "#F6F6F6",
    borderRadius: "50%",
    width: 48,
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
  },
  mainBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: 200 }],
  },
  headerTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    lineHeight: 21,
    color: "#000000",
    marginLeft: 10,
  },
  notificationContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    transform: [{ translateY: -100 }, { translateX: 15 }],
    marginTop: 20,
  },
  notificationDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 19,
    color: "#464851",
  },
  notificationList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: -30 }],
    gap: 25,
  },
  notificationItem: {
    justifyContent: "center",
    alignItems: "center",
    transform: [{ scale: 0.9 }],
  },
  notificationTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  notificationTextEmpty: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 18,
    lineHeight: 25,
    color: "#242B42",
  },
  notificationTextStayTuned: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#686777",
    textAlign: "center",
  },
  notificationTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    color: "#000000",
  },
  notificationMessage: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
  notificationDate: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#999999",
    marginTop: 8,
  },
  newNotificationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: -95 }],
    gap: 15,
  },
  newNotificationTitleContainer: {
    transform: [{ translateY: -50 }, { translateX: -50 }],
  },
  count: {
    color: "#8BC240",
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    lineHeight: 19,
  },
  newNotificationTitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#000000",
  },
  newNotificationItem: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    transform: [{ translateY: -50 }],
    borderWidth: 0.85,
    borderColor: "#8BC240",
    borderRadius: 20,
    padding: 10,
    width: 315,
    height: 126,
  },
});

export default styles;

// import React, { useState } from "react";
// import {
//   KeyboardAvoidingView,
//   Pressable,
//   ScrollView,
//   Text,
//   View,
// } from "react-native";
// import BackArrow from "../../assets/icons/arrow.svg";
// import { router } from "expo-router";
// import styles from "./NotificationStyle";
// import { useTranslation } from "react-i18next";
// import NotificationIcon from "../../assets/icons/notification-bing.svg";

// interface NotificationItem {
//   id: number;
//   title: string;
//   message: string;
//   date: string;
//   isNew: boolean;
// }

// const Notification: React.FC = () => {
//   const { t } = useTranslation();
//   const [notifications, setNotifications] = useState<NotificationItem[]>([
//     {
//       id: 1,
//       title: "New Property Available",
//       message: "A new property in Dubai is now available for investment.",
//       date: "2023-10-15",
//       isNew: true,
//     },
//     {
//       id: 2,
//       title: "New Property Available",
//       message: " Property in Dubai is now available for investment.",
//       date: "2024-10-15",
//       isNew: true,
//     },
//     {
//       id: 3,
//       title: "New Property Available",
//       message: " Property in Dubai is now available for investment.",
//       date: "2024-10-15",
//       isNew: true,
//     },
//     {
//       id: 4,
//       title: "New Property Available",
//       message: " Property in Dubai is now available for investment.",
//       date: "2024-10-15",
//       isNew: true,
//     },
//     {
//       id: 5,
//       title: "New Property Available",
//       message: " Property in Dubai is now available for investment.",
//       date: "2024-10-15",
//       isNew: true,
//     },
//   ]);

//   const newNotificationsCount = notifications.filter((n) => n.isNew).length;

//   const handleNotificationPress = (id: string) => {
//     setNotifications((prevNotifications) =>
//       prevNotifications.map((notification) =>
//         notification.id.toString() === id.toString()
//           ? { ...notification, isNew: false }
//           : notification
//       )
//     );
//   };

//   return (
//     <KeyboardAvoidingView behavior="padding" style={styles.container}>
//       <ScrollView>
//         <View style={styles.container}>
//           <View style={styles.header}>
//             <Pressable onPress={() => router.back()} style={styles.backButton}>
//               <BackArrow />
//             </Pressable>
//             <Text style={styles.headerTitle}>{t("notification.title")}</Text>
//           </View>
//           <View style={styles.mainBody}>
//             {notifications.length === 0 ? (
//               <View style={styles.notificationList}>
//                 <View style={styles.notificationContainer}>
//                   <Text style={styles.notificationDesc}>
//                     {t("notification.Desc")}
//                   </Text>
//                 </View>
//                 <View style={styles.notificationItem}>
//                   <NotificationIcon />
//                 </View>
//                 <View style={styles.notificationTextContainer}>
//                   <Text style={styles.notificationTextEmpty}>
//                     {t("notification.empty")}
//                   </Text>
//                   <Text style={styles.notificationTextStayTuned}>
//                     {t("notification.stayTuned")}
//                   </Text>
//                 </View>
//               </View>
//             ) : (
//               <View style={styles.newNotificationContainer}>
//                 <View style={styles.newNotificationTitleContainer}>
//                   <Text style={styles.newNotificationTitle}>
//                     {t("notification.haveNotification")}{" "}
//                     <Text style={styles.count}>{newNotificationsCount}</Text>{" "}
//                     <Text style={styles.count}>
//                       {t("notification.notification")}
//                     </Text>
//                   </Text>
//                 </View>
//                 {notifications.map((notification) => (
//                   <Pressable
//                     key={notification.id}
//                     onPress={() =>
//                       handleNotificationPress(notification.id.toString())
//                     }
//                   >
//                     <View
//                       style={[
//                         styles.newNotificationItem,
//                         !notification.isNew && { borderWidth: 0 },
//                       ]}
//                     >
//                       <Text style={styles.notificationTitle}>
//                         {notification.title}
//                       </Text>
//                       <Text style={styles.notificationMessage}>
//                         {notification.message}
//                       </Text>
//                       <Text style={styles.notificationDate}>
//                         {notification.date}
//                       </Text>
//                     </View>
//                   </Pressable>
//                 ))}
//               </View>
//             )}
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default Notification;
