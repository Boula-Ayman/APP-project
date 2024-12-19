import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import i18n from "../../src/i18n/i18n";
import PropcutLogo from "../../assets/icons/propcut.svg";
import styles from "./HomeScreenStyle";
import Notification from "../../assets/icons/Notification2.svg";
import NoNotification from "../../assets/icons/Notification1.svg";
import SearchBarIcon from "../../assets/icons/Tuning2.svg";
import SearchBarIcon2 from "../../assets/icons/magnifying-glass.svg";
import CardList from "./CardList";

const HomeScreen: React.FC = () => {
  const notifications = 0;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <LinearGradient
          colors={[
            "rgba(139, 194, 64, 0)",
            "rgba(139, 194, 64, 0.032)",
            "rgba(139, 194, 64, 0.16)",
          ]}
          style={styles.gradient}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        />
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

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder={i18n.t("home.searchPlaceholder")}
            />
            <SearchBarIcon2 style={styles.searchIcon} />
          </View>
          <View style={styles.barIcon}>
            <SearchBarIcon style={styles.barIcon2} />
          </View>
        </View>

        <View style={styles.filters}>
          <TouchableOpacity style={styles.filterButtonActive}>
            <Text style={styles.filterTextActive}>{i18n.t("home.all")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>{i18n.t("home.available")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>{i18n.t("home.soldOut")}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{i18n.t("home.bestForYou")}</Text>
          <Text style={styles.viewAll}>{i18n.t("home.viewAll")}</Text>
        </View>
        <View style={{ height: 385 }}>
          <CardList />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
