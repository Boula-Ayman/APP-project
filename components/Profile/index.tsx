import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React from "react";
import { usePostLogoutMutation } from "../../src/auth/logout/logoutApiSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import Ai from "../../assets/icons/Ai.svg";
import Settings from "../../assets/icons/setting.svg";
import Share from "../../assets/icons/share.svg";
import Logout from "../../assets/icons/LogoutIcon.svg";
import { useFonts } from "expo-font";
import i18n from "../../i18n/i18n";
import ProfileArrow from "../../assets/icons/ProfileArrow.svg";
import CardCoin from "../../assets/icons/cardCoin.svg";
import { styles } from "./ProfileStyle";
import { LinearGradient } from "expo-linear-gradient";
const Profile = () => {
  const [postLogout, { isLoading, isSuccess, isError, error }] =
    usePostLogoutMutation();
  const [fontsLoaded, fonts] = useFonts({
    Inter_400Regular: require("../../assets/fonts/Inter/Inter_24pt-Regular.ttf"),
    Inter_600SemiBold: require("../../assets/fonts/Inter/Inter_24pt-SemiBold.ttf"),
    Inter_700Bold: require("../../assets/fonts/Inter/Inter_24pt-Bold.ttf"),
  });

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      console.log("Token before logout:", token);

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
      <LinearGradient
        colors={[
          "rgba(139, 194, 64, 0)",
          "rgba(139, 194, 64, 0.03)",
          "rgba(139, 194, 64, 0.16)",
        ]}
        style={styles.gradient}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      />
      <Text style={styles.text}>{i18n.t("profile.profile")}</Text>
      <View style={styles.ImageContainer}>
        <Ai style={styles.Ai} />
        <Text style={styles.AiText}>Kamal Mohamed</Text>
      </View>
      <View style={styles.ProfileContainer}>
        <View style={styles.ProfileItem}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <CardCoin style={styles.ProfileItemIcon} />
            <Text style={styles.ProfileItemText}>
              {i18n.t("profile.myBookings")}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/profileSettingesPage" as any)}
          >
            <ProfileArrow style={styles.ProfileArrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.ProfileItem}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Settings style={styles.ProfileItemIcon} />
            <Text style={styles.ProfileItemText}>
              {i18n.t("profile.settings")}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/profileSettingesPage" as any)}
          >
            <ProfileArrow style={styles.ProfileArrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.ProfileItem}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Share style={styles.ProfileItemIcon} />
            <Text style={styles.ProfileItemText}>
              {i18n.t("profile.tellYourFriends")}
            </Text>
          </View>
          <View>
            <ProfileArrow style={styles.ProfileArrow} />
          </View>
        </View>
        <TouchableOpacity style={styles.ProfileItem} onPress={handleLogout}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Logout style={styles.ProfileItemIconLogout} />
            <Text style={styles.ProfileItemTextLogout}>
              {i18n.t("profile.logout")}
            </Text>
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
