import MainNavigator from "@/navigation/MainNavigator";
import { Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
