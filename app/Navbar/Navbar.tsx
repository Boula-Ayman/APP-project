import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        onPress={() => router.push("/Home/Homescreen")}
        style={styles.navItem}
      >
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/Home/SettingsScreen")}
        style={styles.navItem}
      >
        <Text style={styles.navText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 16,
    color: "#007AFF",
  },
});

export default Navbar;
