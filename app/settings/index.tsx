import {
  View,
  Text,
  Switch,
  StyleSheet,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import CustomHeader from "../../commonComponent/Header/CustomHeader";
import SoundEffect from "../../assets/icons/soundEffect.svg";
import NotificationIcon from "../../assets/icons/notification.svg";
import AccountIcon from "../../assets/icons/account.svg";
import PasswordIcon from "../../assets/icons/password.svg";
import TermsIcon from "../../assets/icons/privacy.svg";
import PolicyIcon from "../../assets/icons/privacy.svg";
import i18n from "../../i18n/i18n";
import SettingButton from "../../commonComponent/button/SettingButton";

const SettingsScreen = () => {
  const [soundEffects, setSoundEffects] = useState(true);
  const [notifications, setNotifications] = useState(false);

  const ToggleSettingItem = ({ icon: Icon, title, value, onPress }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingItemLeft}>
        <Icon width={24} height={24} />
        <Text style={styles.settingItemText}>{title}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onPress}
        trackColor={{ false: "#767577", true: "#8BC240" }}
        thumbColor={value ? "#fff" : "#f4f3f4"}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader title={i18n.t("settings.title")} showBackButton />

      <ToggleSettingItem
        icon={SoundEffect}
        title={i18n.t("settings.soundEffects")}
        value={soundEffects}
        onPress={() => setSoundEffects(!soundEffects)}
      />
      <ToggleSettingItem
        icon={NotificationIcon}
        title={i18n.t("settings.notifications")}
        value={notifications}
        onPress={() => setNotifications(!notifications)}
      />

      <Text style={styles.sectionTitle}>{i18n.t("settings.moreSettings")}</Text>

      <SettingButton
        icon={AccountIcon}
        title={i18n.t("settings.accountInfo")}
        onPress={() => router.push("/settings/accountInfo")}
      />
      <SettingButton
        icon={PasswordIcon}
        title={i18n.t("settings.changePassword")}
        onPress={() => router.push("/settings/changePassword")}
      />

      <Text style={styles.sectionTitle}>{i18n.t("settings.policy")}</Text>

      <SettingButton
        icon={TermsIcon}
        title={i18n.t("settings.termsOfService")}
        onPress={() => {
          Linking.openURL("https://propcut.lightbyte.me/terms-and-conditions");
        }}
      />
      <SettingButton
        icon={PolicyIcon}
        title={i18n.t("settings.userPolicy")}
        onPress={() => {
          Linking.openURL("https://propcut.lightbyte.me/privacy-policy");
        }}
      />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "85%",
    alignSelf: "center",
  },
  settingItem: {
    flexDirection: i18n.language === 'ar' ? "row-reverse" : 'row',
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingItemText: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#1A1A1A",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter",
    fontWeight: "700",
    color: "#1A1A1A",
    marginTop: 24,
    marginBottom: 8,
    textAlign: i18n.language === "ar" ? "right" : "left"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  languageOption: {
    width: "100%",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  languageText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#8BC240",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
