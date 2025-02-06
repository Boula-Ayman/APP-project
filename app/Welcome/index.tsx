import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import i18n from "../../i18n/i18n";
import { useFonts, Inter_500Medium } from "@expo-google-fonts/inter";

import SliderPage from "./SliderPage";
import { router } from "expo-router";
import Button from "@/commonComponent/button/Button";

const TabLayout = () => {
  const { t } = { t: i18n.t.bind(i18n) };

  const [fontsLoaded] = useFonts({
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSingIn = () => {
    router.push("/(auth)/signIn");
  };
  const handleSignUp = () => {
    // router.push("/(auth)/Signup" as any);
    // router.push("/profileSettingesPage" as any);
    router.push("/" as any);
    // router.push("/(auth)/verify" as any);
  };
  return (
    <>
      <SliderPage />
      <View style={styles.tabContainer}>
        <View style={{ paddingHorizontal: 10, gap: 5 }}>
          <Button onPress={handleSingIn}>
            <Text style={styles.buttonText}>{t("sliderSignIn")}</Text>
          </Button>

          <TouchableOpacity style={styles.buttonDark} onPress={handleSignUp}>
            <Text style={styles.buttonText}>{t("sliderSignUp")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    padding: 2,
    backgroundColor: "#fff",
    height: 132,
    borderTopColor: "#ccc",
    paddingBottom: 10,
  },
  buttonDark: {
    backgroundColor: "#1A1A1A",

    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,

    alignItems: "center",
    width: "100%",
    height: 56,
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 25.6,
    textAlign: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    lineHeight: 25.6,
    fontWeight: "500",
  },
});

export default TabLayout;
