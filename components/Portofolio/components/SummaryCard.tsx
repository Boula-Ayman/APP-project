import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { SvgProps } from "react-native-svg";
import i18n from "@/i18n/i18n";
import { t } from "i18next";

interface SummaryCardProps {
  amount: string;
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
  <View style={[styles.summaryCard, { backgroundColor, direction: i18n.language === "ar" ? "rtl" : "ltr" }]}>
    <Icon />
    <View style={styles.summaryTitleContainer}>
      <Text style={{...styles.summaryTitle, borderColor: backgroundColor}}>
        {amount.toLocaleString()} <Text style={styles.summaryDetails}>{t(currency)}</Text>
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
    marginHorizontal: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
    gap: 10,
  },
  summaryTitleContainer: {
    alignSelf: "center",
  },
  summaryTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 24,
    color: "#14161C",
    borderWidth: 1
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