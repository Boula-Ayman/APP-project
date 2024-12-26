import React from "react";
import { StyleSheet, View } from "react-native";
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
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { Persistor } from "../src/store/index";
import OpportunitiesComponent from "./components/OpportunitiesComponent";

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false, // hide header for all tabs
            tabBarStyle: {
              width: 335,
              height: 74,
              backgroundColor: "#061C27",
              borderTopWidth: 0,
              borderRadius: 40,
              elevation: 0,
              alignSelf: "center",
              gap: 10,
              marginBottom: 6,
            },
            tabBarItemStyle: {
              paddingVertical: 10,
            },
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
            name="OpportunitiesComponent"
            component={OpportunitiesComponent}
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
      </PersistGate>
    </Provider>
  );
};

export default App;
