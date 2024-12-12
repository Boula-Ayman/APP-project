import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const HomeScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>propcut</Text>
  </View>
);

const SettingsScreen: React.FC = () => (
  <View style={styles.container}>
    <Text>Settings</Text>
  </View>
);

const App: React.FC = () => {
  return <Text style={styles.text}>Hello</Text>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 8,
  },
  text: {
    color: "#fff",
  },
});

export default App;
