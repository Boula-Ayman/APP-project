import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking,
} from "react-native";
import { Tabs } from "expo-router";
import { useNavigation } from "@react-navigation/native";
const TabLayout = () => {
  const navigation = useNavigation();

  const handleGoogleClick = () => {
    // redirect to Google
    Linking.openURL("https://www.google.com");
  };

  const handlePlaceholderClick = () => {
    console.log("Placeholder button clicked");
  };
  return (
    <>
      <Tabs screenOptions={{ headerShown: false }}>
        {/* <Tabs.Screen
          name="carddetails/[id]"
          options={{
            href: "/carddetails/[id]",
            tabBarStyle: { display: "none" },
          }}
        /> */}
      </Tabs>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.buttonGreen}
          onPress={handleGoogleClick}
        >
          <Text style={styles.buttonText}>Schedule a call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonDark}
          onPress={handlePlaceholderClick}
        >
          <Text style={styles.buttonText}>Register Interest</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  buttonGreen: {
    backgroundColor: "#8BC240",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonDark: {
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TabLayout;
