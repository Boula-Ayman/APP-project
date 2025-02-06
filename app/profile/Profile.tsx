import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useLogoutMutation } from "../../src/auth/logout/logoutApiSlice";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { clearUser } from "@/src/auth/signin/userSlice";
import { clearWishlist } from "@/src/wishList/wishlistSlice";

const Profile = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [postLogout, { isLoading, isSuccess, isError, error }] = useLogoutMutation();
  
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await postLogout().unwrap();
      
      dispatch(clearUser());
      dispatch(clearWishlist());
      
      router.push("/Welcome");
      
      setErrorMessage(null);
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
