import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import i18n from "../../src/i18n/i18n";

import SliderPage from "./SliderPage";
import { router } from "expo-router";

const TabLayout = () => {
  const { t } = { t: i18n.t.bind(i18n) };

  const handleSingIn = () => {
    router.push("/(auth)/signIn");
  };
  const handleSignUp = () => {
    router.push("/(auth)/Signup" as any);
  };
  return (
    <>
      <SliderPage />
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.buttonGreen} onPress={handleSingIn}>
          <Text style={styles.buttonText}>{t("sliderSignIn")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDark} onPress={handleSignUp}>
          <Text style={styles.buttonText}>{t("sliderSignUp")}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 2,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  buttonGreen: {
    backgroundColor: "#8BC240",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 25.6,
    textAlign: "left",
  },
  buttonDark: {
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: "100%",
    alignItems: "center",
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 25.6,
    textAlign: "left",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TabLayout;
