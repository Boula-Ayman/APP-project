import React, { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, Text, Pressable } from "react-native";
import { Link, router, Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { Persistor } from "../src/store/index";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  useEffect(() => {
    const timer = setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator size="large" color="#0000ff" />}
        persistor={Persistor}
      >
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Home/index" />
            <Stack.Screen 
                name="AllProperties/index"
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
  splashScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  splashText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
