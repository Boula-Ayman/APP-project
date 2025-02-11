import AppText from "@/commonComponent/appText/AppText";
import i18n from "@/i18n/i18n";
import React from "react";
import { StyleSheet, View } from "react-native";

const TotalReturnCard = ({ data }) => {
  return (
    <View style={styles.card1}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <AppText
          text={`${(data?.data?.share_price).toLocaleString()}`}
          style={styles.largeText}
        />
        <AppText text="Purchase Price" style={styles.purchaseText} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <AppText text="1 Year Total Return" style={styles.totalReturnText} />
        <AppText
          text={`${data?.data?.total_return_5_years}%`}
          style={styles.percentageText}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <AppText text="5 Year Total Return" style={styles.totalReturnText} />
        <AppText
          text={`${data?.data?.total_return_1_year}%`}
          style={styles.percentageText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card1: {
    padding: 20,
    backgroundColor: "#8BC240",
    borderRadius: 24,
    marginVertical: 10,
    height: 159,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "medium",
    marginBottom: 10,
    color: "white",
    fontFamily: "InterMedium",
  },
  largeText: {
    fontSize: 28,
    fontWeight: "medium",
    fontFamily: "InterMedium",
    color: "white",
    marginBottom: 5,
  },
  purchaseText: {
    fontFamily: "InterMedium",
    fontWeight: 500,
    fontSize: 14,
  },
  totalReturnText: {
    fontFamily: "InterMedium",
    fontSize: 14,
    color: "#FFFFFFCC",
  },
  percentageText: {
    fontFamily: "InterSemiBold",
    fontSize: 16,
    fontWeight: 600,
  },
});

export default TotalReturnCard;
