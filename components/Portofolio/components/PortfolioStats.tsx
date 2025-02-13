import React from "react";
import { View, StyleSheet } from "react-native";
import MoneySend from "../../../assets/icons/money-send.svg";
import MoneyRecive from "../../../assets/icons/money-recive.svg";
import { useTranslation } from "react-i18next";
import SummaryCard from "./SummaryCard";
import StatsBox from "./StatsBox";

interface PortfolioStatsProps {
  totalInvestment: number;
  totalRentalIncome: number;
  totalUsableNights: number;
  yield: number;
  currency: string;
}

const PortfolioStats: React.FC<PortfolioStatsProps> = ({
  totalInvestment,
  totalRentalIncome,
  totalUsableNights,
  yield: yieldValue,
  currency,
}) => {
  const { t } = useTranslation();
  
  return (
    <>
      <View style={styles.summaryContainer}>
        <SummaryCard
          amount={totalInvestment}
          currency={currency}
          subtitle={t('portfolio.totalInvestment')}
          backgroundColor="#8BC240"
          Icon={MoneySend}
        />
      </View>

      <SummaryCard
        amount={totalRentalIncome}
        currency={currency}
        subtitle={t('portfolio.totalRentalIncome')}
        backgroundColor="#9BC2C7"
        Icon={MoneyRecive}
      />

      <View style={styles.statsContainer}>
        <StatsBox
          value={totalUsableNights}
          label={t('portfolio.totalUsableNights')}
        />
        <StatsBox
          value={`${yieldValue}%`}
          label={t('portfolio.yieldLastYear', { year: new Date().getFullYear() - 1 })}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

export default PortfolioStats; 