import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { SvgProps } from "react-native-svg";

interface SummaryCardProps {
  amount: number;
  currency: string;
  subtitle: string;
  backgroundColor: string;
  Icon: React.FC<SvgProps>;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  amount,
  currency,
  subtitle,
  backgroundColor,
  Icon,
}) => (
  <View style={[styles.summaryCard, { backgroundColor }]}>
    <Icon style={styles.summaryIcon} />
    <View style={styles.summaryTitleContainer}>
      <Text style={styles.summaryTitle}>
        {amount.toLocaleString()} <Text style={styles.summaryDetails}>{currency}</Text>
      </Text>
      <Text style={styles.summarySubtitle}>{subtitle}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  summaryCard: {
    flex: 1,
    height: 100,
    borderRadius: 30,
    padding: 16,
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryIcon: {
    position: "absolute",
    top: '50%',
    left: 25,
    transform: [{ translateY: -8 }],
  },
  summaryTitleContainer: {
    alignSelf: "center",
  },
  summaryTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 24,
    color: "#14161C",
    alignSelf: "flex-start",
  },
  summaryDetails: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    lineHeight: Platform.select({
      ios: 80.28,
      android: 24
    }),
    letterSpacing: -0.48,
    textAlign: "left",
    color: "#fff",
  },
  summarySubtitle: {
    fontSize: 14,
    color: "#464851",
    fontFamily: "Inter_500Medium",
    letterSpacing: -0.48,
    alignSelf: "flex-start",
    marginTop: 3,
  },
});

export default SummaryCard; 