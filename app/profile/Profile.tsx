import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React from "react";
import { usePostLogoutMutation } from "../../src/auth/logout/logoutApiSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const Profile = () => {
  const [postLogout, { isLoading, isSuccess, isError, error }] =
    usePostLogoutMutation();

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      console.log("Token before logout:", token); // Log the token

      if (!token) {
        console.error("No token found, cannot logout.");
        return;
      }

      // Pass the token to postLogout
      await postLogout(token).unwrap();
      console.log("Logout successful");
      await AsyncStorage.removeItem("access_token");
      router.push("/Welcome" as any);
    } catch (err) {
      console.error("Failed to logout:", err);
      if (err && typeof err === "object" && "data" in err) {
        console.error("Error details:", err.data);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <TouchableOpacity onPress={handleLogout} disabled={isLoading}>
        <Text>{isLoading ? "Logging out..." : "Logout"}</Text>
      </TouchableOpacity>
      {isSuccess && <Text>Logout successful!</Text>}
      {isError && (
        <Text>
          Error:
          {error && "data" in error
            ? (error.data as { message: string }).message
            : "Failed to logout"}
        </Text>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
});
