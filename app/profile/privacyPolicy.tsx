import { StyleSheet, View } from "react-native";
import React from "react";

import CustomHeader from "../../commonComponent/Header/CustomHeader";

import i18n from "../../i18n/i18n";

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <CustomHeader title={i18n.t("profile.privacyPolicy")} showBackButton />
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "85%",
    alignSelf: "center",
  },
});
