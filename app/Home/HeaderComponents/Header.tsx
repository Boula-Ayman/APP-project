// Header.tsx
import React from "react";
import { View } from "react-native";
import PropcutLogo from "../../../assets/icons/propcut.svg";
import Notification from "../../../assets/icons/Notification2.svg";
import NoNotification from "../../../assets/icons/Notification1.svg";
import styles from "../HomeScreenStyle";

const Header: React.FC<{ notifications: number }> = ({ notifications }) => {
  return (
    <View style={styles.header}>
      <View style={styles.logo}>
        <PropcutLogo />
      </View>
      {notifications > 0 ? (
        <View style={styles.icon}>
          <Notification />
        </View>
      ) : (
        <View style={styles.icon}>
          <NoNotification />
        </View>
      )}
    </View>
  );
};

export default Header;
