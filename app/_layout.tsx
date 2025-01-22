import React, { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { router, Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { Persistor } from "../src/store/index";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  useEffect(() => {
    const timer = setTimeout(async () => {
      await SplashScreen.hideAsync();
      router.push("Home/Homescreen" as any);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator size="large" color="#0000ff" />}
        persistor={Persistor}
      >
        <Stack>
          {/* <Stack.Screen
            name="verify"
            options={{
              title: "All Properties",
              headerShown: false,
            }}
          /> */}
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
