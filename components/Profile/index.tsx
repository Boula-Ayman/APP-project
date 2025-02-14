import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { useLogoutMutation } from "../../src/auth/logout/logoutApiSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Ai from "../../assets/icons/Ai.svg";
import Settings from "../../assets/icons/setting.svg";
import Share from "../../assets/icons/share.svg";
import Logout from "../../assets/icons/LogoutIcon.svg";
import i18n from "../../i18n/i18n";
import CardCoin from "../../assets/icons/cardCoin.svg";
import { LinearGradient } from "expo-linear-gradient";
import SettingButton from "@/commonComponent/button/SettingButton";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/src/auth/signin/userSlice";
import { useGetCurrentUserProfileQuery } from "@/src/api/userApiSlice";
import Constants from "expo-constants";

const Profile = () => {
  const [postLogout, { isLoading, isSuccess, isError, error }] =
    useLogoutMutation();

  const { data: userData } = useGetCurrentUserProfileQuery();

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state?.user.user);
  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");

      // Pass the token to postLogout
      await postLogout().unwrap();

      dispatch(clearUser());

      router.push("/Welcome");
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
        {userData?.data.image_url ? (
          <Image
            source={{ uri: userData.data.image_url }}
            style={styles.profileImage}
          />
        ) : (
          <Ai style={styles.Ai} />
        )}
        <Text style={styles.AiText}>{userData?.data.name || "Loading..."}</Text>
      </View>

      <View style={styles.ProfileContainer}>
        <SettingButton
          icon={CardCoin}
          title={i18n.t("profile.myBookings")}
          onPress={() => router.push("/bookings")}
          style={styles.ProfileItem}
        />

        <SettingButton
          icon={Settings}
          title={i18n.t("profile.settings")}
          onPress={() => router.push("/settings")}
          style={styles.ProfileItem}
        />

        <SettingButton
          icon={Share}
          title={i18n.t("profile.tell_your_friends.title")}
          onPress={() => {
            router.push("/profile/tellYourFriends");
          }}
          style={styles.ProfileItem}
        />

        <SettingButton
          icon={Logout}
          title={i18n.t("profile.logout")}
          onPress={handleLogout}
          style={styles.ProfileItem}
          textColor="#FF4B55"
          iconColor="#FF4B55"
          showArrow={false}
        />
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 10,
          left: 0,
          right: 0,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://propcut.lightbyte.me/privacy-policy")
          }
          style={styles.PrivacyContainer}
        >
          <Text style={styles.Privacy}>{i18n.t("profile.privacyPolicy")}</Text>
        </TouchableOpacity>
        <View style={styles.VersionContainer}>
          <Text style={styles.VersionText}>
            {Constants?.expoConfig?.version}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  gradient: {
    height: 305,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  text: {
    color: "#000000",
    paddingHorizontal: 30,
    paddingTop: 55,
    fontFamily: "Inter_700Bold",
    fontSize: 26,
    fontWeight: "700",
    lineHeight: 31.47,
    textAlign: "left",
  },
  ImageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 131,
    marginTop: 30,
    gap: 15,
  },
  Ai: {
    alignItems: "center",
    justifyContent: "center",
    width: 83,
    height: 31,
  },
  AiText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 19.36,
    color: "#000000",
  },
  ProfileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 50,
    gap: 15,
    paddingHorizontal: 30,
  },
  ProfileItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    width: "100%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#92929233",
    borderRadius: 14,
    height: 60,
    paddingHorizontal: 20,
  },
  PrivacyContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  Privacy: {
    fontFamily: "Inter_400Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 17.44,
    color: "#8BC240",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  VersionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 20,
  },
  VersionText: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 17.4,
    color: "#1D1D1C",
  },
  profileImage: {
    width: 83,
    height: 83,
    borderRadius: 41.5,
  },
});
