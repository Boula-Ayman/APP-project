import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Optional: Set a background color
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default HomeScreen;
