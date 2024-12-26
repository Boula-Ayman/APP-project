// SectionHeader.tsx
import React from "react";
import { View, Text } from "react-native";
import styles from "../HomeScreenStyle";
import i18n from "../../../src/i18n/i18n";

const SectionHeader: React.FC = () => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{i18n.t("home.bestForYou")}</Text>
      <Text style={styles.viewAll}>{i18n.t("home.viewAll")}</Text>
    </View>
  );
};

export default SectionHeader;
