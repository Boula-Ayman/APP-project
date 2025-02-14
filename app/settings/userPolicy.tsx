import { StyleSheet, View } from "react-native";
import React from "react";

import CustomHeader from "../../commonComponent/Header/CustomHeader";

import i18n from "../../i18n/i18n";

const UserPolicy = () => {
  return (
    <View style={styles.container}>
      <CustomHeader title={i18n.t("settings.userPolicy")} showBackButton />
    </View>
  );
};

export default UserPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "85%",
    alignSelf: "center",
  },
});
