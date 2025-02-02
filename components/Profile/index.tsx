import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React from "react";
import { usePostLogoutMutation } from "../../src/auth/logout/logoutApiSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Ai from "../../assets/icons/Ai.svg";
import Settings from "../../assets/icons/setting.svg";
import Share from "../../assets/icons/share.svg";
import Logout from "../../assets/icons/LogoutIcon.svg";
import { useFonts } from "expo-font";
import i18n from "../../i18n/i18n";
import ProfileArrow from "../../assets/icons/ProfileArrow.svg";
import { styles } from "./ProfileStyle";
const Profile = () => {
  const [postLogout, { isLoading, isSuccess, isError, error }] =
    usePostLogoutMutation();
  const [fontsLoaded, fonts] = useFonts({
    Inter_400Regular: require("../../assets/fonts/Inter/Inter_24pt-Regular.ttf"),
    Inter_600SemiBold: require("../../assets/fonts/Inter/Inter_24pt-SemiBold.ttf"),
  });
  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      console.log("Token before logout:", token); // Log the token

      if (!token) {
        console.error("No token found, cannot logout.");
        return;
      }

      // Pass the token to postLogout
      await postLogout(token).unwrap();
      console.log("Logout successful");
      await AsyncStorage.removeItem("access_token");
      router.push("/Welcome" as any);
    } catch (err) {
      console.error("Failed to logout:", err);
      if (err && typeof err === "object" && "data" in err) {
        console.error("Error details:", err.data);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{i18n.t("profile.profile")}</Text>
      <View style={styles.ImageContainer}>
        <Ai style={styles.Ai} />
        <Text style={styles.AiText}>Kamal Mohamed</Text>
      </View>
      <View style={styles.ProfileContainer}>
        <View style={styles.ProfileItem}>
          <Settings style={styles.ProfileItemIcon} />
          <View style={styles.ProfileItemTextContainer}>
            <Text style={styles.ProfileItemText}>
              {i18n.t("profile.settings")}
            </Text>
            <ProfileArrow style={styles.ProfileArrow} />
          </View>
        </View>
        <View style={styles.ProfileItem}>
          <Share style={styles.ProfileItemIcon} />
          <View style={styles.ProfileItemTextContainer}>
            <Text style={styles.ProfileItemText}>
              {i18n.t("profile.tellYourFriends")}
            </Text>
            <ProfileArrow style={styles.ProfileArrow} />
          </View>
        </View>
        <TouchableOpacity style={styles.ProfileItem} onPress={handleLogout}>
          <Logout style={styles.ProfileItemIconLogout} />
          <View style={styles.ProfileItemTextContainer}>
            <Text style={styles.ProfileItemTextLogout}>
              {i18n.t("profile.logout")}
            </Text>
            <ProfileArrow style={styles.ProfileArrow} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.PrivacyContainer}>
        <Text style={styles.Privacy}>{i18n.t("profile.privacyPolicy")}</Text>
      </View>
      <View style={styles.VersionContainer}>
        <Text style={styles.VersionText}>{i18n.t("profile.appVersion")}</Text>
      </View>
    </View>
  );
};

export default Profile;
