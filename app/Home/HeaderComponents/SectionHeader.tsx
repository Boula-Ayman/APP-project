import React from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import styles from "../HomeScreenStyle";
import i18n from "../../../src/i18n/i18n";
import { Href, Link } from "expo-router";

const SectionHeader: React.FC = () => {


  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{i18n.t("home.bestForYou")}</Text>
      <Link href={"AllProperties" as Href} asChild>
        <Pressable>
          <Text>{i18n.t("home.viewAll")}</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default SectionHeader;
