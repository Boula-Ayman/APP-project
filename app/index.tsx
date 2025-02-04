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
import Profile from "./profile/Profile";
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

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
    
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
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

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,

                tabBarStyle: {
                    width: "96%",
                    height: 74,
                    backgroundColor: "#061C27",
                    borderTopWidth: 0,
                    borderRadius: 40,
                    elevation: 0,
                    gap: 10,
                    flex: 1,
                    marginBottom: 6,
                    position: "absolute",
                    bottom: 0,
                    transform: [{ translateX: "2%" }],
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
