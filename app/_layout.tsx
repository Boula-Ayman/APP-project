import { router, Stack } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
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
