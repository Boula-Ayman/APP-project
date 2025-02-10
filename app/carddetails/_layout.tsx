import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking,
  Modal,
  Dimensions,
} from "react-native";
import { Stack, Tabs, useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useOpportunityRegisterInterestMutation } from "@/src/api/opportunitiesApiSlice";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import BgRightCircle from "../../assets/icons/bgRightCircle.svg";
import { Ionicons } from "@expo/vector-icons";
import { t } from "i18next";
const TabLayout = () => {
  const [handleRegisterInterest] = useOpportunityRegisterInterestMutation();
  const { id, type } = useLocalSearchParams();
  const [isRegistered, setIsRegistered] = React.useState(false);
  const user = useSelector((state: any) => state?.user.user);

  const handleGoogleClick = () => {
    Linking.openURL("https://www.google.com");
  };

  const handlePlaceholderClick = async () => {
    try {
      const body = {
        email: user?.email,
        phone: user?.phone_number,
        fullName: user?.name,
      };
      await handleRegisterInterest({
        id,
        body,
      });

      await setIsRegistered(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen options={{ headerShown: false }} name="[id]" />
      </Stack>
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
        <Modal visible={isRegistered} transparent={true} animationType="slide">
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: "rgba(0,0,0,0.5)",
              height: Dimensions.get("window").height,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                height: 300,
              }}
            >
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: -80,
                  right: 20,
                  height: 48,
                  width: 48,
                  borderRadius: 24,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#0E0E0E",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.04,
                  shadowRadius: 1,
                  elevation: 1,
                }}
                onPress={() => setIsRegistered(false)}
              >
                <Ionicons name="close" size={20} color="#171513" />
              </TouchableOpacity>
              <View>
                <BgRightCircle />
              </View>

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "semibold",
                  fontFamily: "InterSemiBold",
                  marginBottom: 5,
                  color: "#191D1A",
                  marginVertical: 20,
                }}
              >
                {t("thankYouForYourInterest")}
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  color: "#464851",
                  fontFamily: "NunitoSansRegular",
                  fontWeight: "400",
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                {t("registrationSuccess1")}
                {t("registrationSuccess2")}
              </Text>
            </View>
          </View>
        </Modal>
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
    padding: 20,
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
    backgroundColor: "#061C27",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "interMedium",
  },
});

export default TabLayout;
