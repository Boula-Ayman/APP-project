import AppText from "@/commonComponent/appText/AppText";
import i18n from "@/i18n/i18n";
import React from "react";
import { StyleSheet, View } from "react-native";
import MoneyRecieve from "@/assets/icons/money-recive.svg";

const TotalRentIncome = ({ data }) => {
  return (
    <View style={styles.card1}>
      <MoneyRecieve />
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AppText
            text={`${data?.data?.total_rental_paid?.toLocaleString()}`}
            style={styles.largeText}
          />
          <AppText
            text={`${data?.data?.currency}`}
            style={styles.currencyText}
          />
        </View>
        <AppText
          text={i18n.t("Total Rental Income Paid")}
          style={styles.totalIncomeText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card1: {
    padding: 20,
    backgroundColor: "#9BC2C7",
    borderRadius: 30,
    marginVertical: 10,
    height: 105,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "medium",
    marginBottom: 10,
    color: "#464851",
    fontFamily: "InterMedium",
  },
  largeText: {
    fontSize: 26,
    fontWeight: "semibold",
    fontFamily: "InterSemiBold",
    color: "#14161C",
    marginBottom: 5,
  },
  currencyText: {
    fontSize: 18,
    color: "white",
    fontWeight: 500,
    fontFamily: "InterMedium",
  },
  totalIncomeText: {
    color: "#464851",
    fontFamily: "InterMedium",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default TotalRentIncome;
