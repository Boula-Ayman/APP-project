import React, { useEffect, useCallback } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { router, Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { Persistor } from "../src/store/index";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

SplashScreen.preventAutoHideAsync();
// SplashScreen.setOptions({
//   duration: 200,
//   fade: true,
// });
// const [fontsLoaded] = useFonts({
//   // Inter_400Regular: require("../../../assets/fonts/Inter/Inter_24pt-Regular.ttf"),
//   // Inter_600SemiBold: require("../../../assets/fonts/Inter/Inter_24pt-SemiBold.ttf"),
// });
export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const logout = async () => {
    await AsyncStorage.removeItem("access_token");
    router.push("/Welcome" as any);
  };
  logout();
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
  container: {
    flex: 1,
  },
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
    fontFamily: "Inter_400Regular",
  },
});
