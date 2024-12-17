import React from "react";
import { View, Text, StyleSheet } from "react-native";
import i18n from "../../src/i18n/i18n"; // Adjust the import path as necessary

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{i18n.t("settings")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
});

export default SettingsScreen;
