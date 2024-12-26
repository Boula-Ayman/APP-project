import React from "react";
import { View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./HomeScreenStyle";
import CardList from "./CardList";
import FilterButtons from "./FilterButtons";
import Header from "./HeaderComponents/Header";
import SearchBar from "./HeaderComponents/SearchBar";
import SectionHeader from "./HeaderComponents/SectionHeader";

const HomeScreen: React.FC = () => {
  const notifications = 0;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <LinearGradient
          colors={[
            "rgba(139, 194, 64, 0)",
            "rgba(139, 194, 64, 0.032)",
            "rgba(139, 194, 64, 0.16)",
          ]}
          style={styles.gradient}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        />
        <Header notifications={notifications} />
        <SearchBar />
        <FilterButtons />
        <SectionHeader />
        <View>
          <CardList />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
