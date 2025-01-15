// index.tsx
import React from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Home/Homescreen";
import SettingsScreen from "./Settings/SettingScreen";
import Favorite from "./Favourite/Favourite";
import HomeIcon from "../assets/icons/home-wifi.svg";
import FavouriteIcon from "../assets/icons/fav.svg";
import Building from "../assets/icons/building.svg";
import ProfileIcon from "../assets/icons/profile.svg";
import Profile from "./profile/Profile";
import styles from "./indexStyle";

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -50}
    >
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            width: 335,
            height: 74,
            backgroundColor: "#061C27",
            borderTopWidth: 0,
            borderRadius: 40,
            elevation: 0,
            gap: 10,
            alignSelf: "center",
            marginBottom: 6,
            position: "absolute",
            bottom: 0,
            left: "50%",
            marginLeft: 8,
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
          name="Settings"
          component={SettingsScreen}
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
    </KeyboardAvoidingView>
  );
};

export default App;
