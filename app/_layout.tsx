import { router, Stack } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import Navbar from "./Navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack>
      <View style={styles.navbar}>
        <Stack>
          <Navbar />
        </Stack>
      </View>
    </Stack>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  navItem: {
    fontSize: 16,
    color: "#007AFF",
  },
});
