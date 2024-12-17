import React from "react";

import { View, Text, StyleSheet } from "react-native";
import i18n from "../../src/i18n/i18n";

import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import PropcutLogo from "../../assets/icons/propcut.svg";
import styles from "./HomeScreenStyle";
import Notification from "../../assets/icons/Notification 1.svg";
import NoNotification from "../../assets/icons/Vector.svg";
import SearchBarIcon from "../../assets/icons/Tuning 2.svg";
const HomeScreen: React.FC = () => {
  const notifications = 1;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <PropcutLogo />
        </View>
        {notifications > 1 ? (
          <View style={styles.icon}>
            <Notification />
          </View>
        ) : (
          <View style={styles.icon}>
            <NoNotification />
          </View>
        )}
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search apart, property, etc..."
        />
        <View style={styles.barIcon}>
          <SearchBarIcon style={styles.barIcon2} />
        </View>
      </View>

      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterButtonActive}>
          <Text style={styles.filterTextActive}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Available</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>sold Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});


export default HomeScreen;
