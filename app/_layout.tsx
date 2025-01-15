import { Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { Persistor } from "../src/store/index";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="Home/Homescreen.tsx"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home/HeaderComponents/ViewAll"
            options={{
              title: "All Properties",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="carddetailss/[id]"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
