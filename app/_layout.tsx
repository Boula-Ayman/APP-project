import { Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="Home/HeaderComponents/FilterButton"
        options={{
          title: "All Properties",
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {},
});
