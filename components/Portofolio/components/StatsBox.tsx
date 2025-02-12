import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface StatsBoxProps {
  value: number | string;
  label: string;
}

const StatsBox: React.FC<StatsBoxProps> = ({ value, label }) => (
  <View style={styles.statsBox}>
    <Text style={styles.statsValue}>{value}</Text>
    <Text style={styles.statsLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  statsBox: {
    flex: 1,
    height: 80,
    borderRadius: 30,
    borderColor: "#8BC240",
    borderWidth: 1,
    backgroundColor: "#fff",
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 10,
    paddingLeft: 20,
  },
  statsValue: {
    fontSize: 26,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Inter",
    lineHeight: 31.2,
    letterSpacing: -0.48,
  },
  statsLabel: {
    fontSize: 14,
    color: "#777",
    fontFamily: "Inter",
  },
});

export default StatsBox; 