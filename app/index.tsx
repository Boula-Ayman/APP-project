import React, { useEffect, useState } from "react";
import { View, Keyboard } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Home";
import PortfolioPage from "./PortfolioSreen/index";
import Favorite from "./Favourite";
import HomeIcon from "../assets/icons/home-wifi.svg";
import FavouriteIcon from "../assets/icons/fav.svg";
import Building from "../assets/icons/building.svg";
import ProfileIcon from "../assets/icons/profile.svg";
import Profile from "./profile";
import styles from "./indexStyle";
import "../i18n/i18n";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/rootReducer";
import { router, useRootNavigationState } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import Toast from "react-native-toast-message";

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    InterRegular: require("@/assets/fonts/Inter/Inter_24pt-Regular.ttf"),
    InterSemiBold: require("@/assets/fonts/Inter/Inter_24pt-SemiBold.ttf"),
    InterBold: require("@/assets/fonts/Inter/Inter_24pt-Bold.ttf"),
    InterMedium: require("@/assets/fonts/Inter/Inter_24pt-Medium.ttf"),
    PoppinsRegular: require("@/assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsMedium: require("@/assets/fonts/Poppins/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("@/assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    PoppinsBold: require("@/assets/fonts/Poppins/Poppins-Bold.ttf"),
    PlusJakartaSansSemiBold: require("@/assets/fonts/PlusJakartaSans/PlusJakartaSans-SemiBold.ttf"),
    PlusJakartaSansMedium: require("@/assets/fonts/PlusJakartaSans/PlusJakartaSans-Medium.ttf"),
    NunitoSansRegular: require("@/assets/fonts/NunitoSans/NunitoSans_7pt-Regular.ttf"),
  });

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const user = useSelector((state: RootState) => state?.user);

  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    const initializeApp = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    initializeApp();
  }, [fontsLoaded]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!user.accessToken && rootNavigationState?.key) {
      router.push("/Welcome");
    }
  }, [user.accessToken, rootNavigationState?.key]);

  useEffect(() => {
    if (!user.accessToken && rootNavigationState?.key) {
      router.push("/Welcome");
    }
  }, [user.accessToken, rootNavigationState?.key]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          width: "93%",
          height: 74,
          backgroundColor: "#061C27",
          borderRadius: 40,
          elevation: 0,
          marginBottom: "3%",
          alignSelf: "center",
          display: isKeyboardVisible ? "none" : "flex",
        },
        tabBarItemStyle: {
          paddingVertical: 10,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.iconContainerFocused,
              ]}
            >
              <HomeIcon width={24} height={24} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.iconContainerFocused,
              ]}
            >
              <FavouriteIcon width={24} height={24} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="PortfolioPage"
        component={PortfolioPage}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.iconContainerFocused,
              ]}
            >
              <Building width={24} height={24} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.iconContainerFocused,
              ]}
            >
              <ProfileIcon width={24} height={24} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default App;
