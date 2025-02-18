import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  StyleProp,
  ViewStyle,
} from "react-native";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface CustomHeaderProps {
  title: string;
  showBackButton?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}

export const CustomHeader = ({
  title,
  showBackButton = true,
  contentStyle,
}: CustomHeaderProps) => {
  return (
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitle: title,
        headerShadowVisible: false,
        headerTransparent: true,
        headerTitleAlign: "center",
        contentStyle: [
          {
            paddingTop: Platform.OS === "ios" ? "30%" : "25%",
            backgroundColor: "white",
          },
          contentStyle,
        ],
        headerLeft: showBackButton
          ? () => (
              <TouchableOpacity
                style={styles.iconButton}
                onPressOut={() => router.back()}
              >
                <Ionicons name="chevron-back" size={16} color="black" />
              </TouchableOpacity>
            )
          : undefined,
      }}
    />
  );
};

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
    height: 44,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomHeader;
