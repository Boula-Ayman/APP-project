import React from "react";
import { Stack } from "expo-router";

const TabLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen options={{ headerShown: false }} name="[id]" />
      </Stack>
    </>
  );
};

export default TabLayout;
