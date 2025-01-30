import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  usePostVerifyMutation,
  useResendVerifyMutation,
} from "../../../src/auth/veirfy/verify";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OtpInput } from "react-native-otp-entry";
import { router, useLocalSearchParams } from "expo-router";
import i18n from "../../../i18n/i18n";
import { useFonts } from "expo-font";
import Arrow from "../../../assets/icons/Arrow.svg";
import Toast from "react-native-toast-message";
import { usePostSignInMutation } from "@/src/auth/signin/signinApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/src/auth/signin/userSlice";

const VerificationScreen: React.FC = () => {
  const [timer, setTimer] = useState<number>(90);
  const { email, password } = useLocalSearchParams();
  const [postSignIn] = usePostSignInMutation();
  const [loading, setLoading] = useState(false);
  const { t } = { t: i18n.t.bind(i18n) };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [otp, setOtp] = useState<string>();

  const [PostVerify] = usePostVerifyMutation();
  const [resendVerify] = useResendVerifyMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const handleVerify = async () => {
    setErrorMessage("");
    if (!otp || otp.length !== 4) {
      setErrorMessage("OTP must be exactly 4 digits");
      return;
    }

    const formData = {
      otp: Number(otp),
    };

    try {
      setLoading(true);
      await PostVerify(formData).unwrap();
      const response = await postSignIn({ email, password }).unwrap();
      dispatch(setUser(response.data));
      router.push("/" as any);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setErrorMessage(error.data.message);
    }
  };

  const handleResendCode = async () => {
    setErrorMessage("");
    try {
      await resendVerify({}).unwrap();
      Toast.show({
        type: "success",
        text1: "Verification code sent successfully",
      });
      setTimer(90);
    } catch (error: any) {
      setErrorMessage(error.data.message);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? seconds : seconds}`;
  };

  const [fontsLoaded] = useFonts({
    Inter_400Regular: require("../../../assets/fonts/Inter/Inter_24pt-Regular.ttf"),
    Inter_600SemiBold: require("../../../assets/fonts/Inter/Inter_24pt-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  const handleBackPress = () => {
    router.push("/Welcome" as any);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Arrow />
      </TouchableOpacity>
      <ScrollView style={styles.scrollContent}>
        <Text style={[styles.title, { fontFamily: "Inter_600SemiBold" }]}>
          {t("verify.verify_email_title")}
        </Text>
        <Text style={[styles.subtitle, { fontFamily: "Inter_400Regular" }]}>
          {t("verify.enter_otp_message")}
        </Text>
        <View style={styles.otpInputContainer}>
          <OtpInput
            numberOfDigits={4}
            onTextChange={(text) => setOtp(text)}
            theme={{
              focusedPinCodeContainerStyle: styles.activePinCodeContainer,
              filledPinCodeContainerStyle: styles.filledPinCodeContainer,
              pinCodeTextStyle: styles.pinCodeText,
              pinCodeContainerStyle: styles.pinCodeContainer,
            }}
          />
        </View>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.resendButton}
          onPress={handleResendCode}
          disabled={timer > 0 ? true : false}
        >
          {timer > 0 ? (
            <Text style={styles.resendText}>
              Resend code in:
              <Text style={styles.counter}> {formatTime(timer)} </Text>
            </Text>
          ) : (
            <Text style={styles.resendText}>Resend code</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.verifyButtonText}>Verify</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    marginTop: 20,
    backgroundColor: "white",
  },
  backButton: {
    width: 48,
    height: 48,
    top: 10,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    flexGrow: 1,
    marginTop: 40,
  },
  title: {
    marginBottom: 16,
    fontFamily: "Inter",
    fontSize: 32,
    fontWeight: "600",
    lineHeight: 39,
    textAlign: "left",
  },
  subtitle: {
    width: 327,
    height: 38,
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    textAlign: "left",
    marginBottom: 32,
    color: "#9B9B9B",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 24,
  },
  activePinCodeContainer: {
    borderWidth: 1,
    borderColor: "#8BC240",
    borderRadius: 8,
  },
  filledPinCodeContainer: {
    width: 55,
    height: 55,
    borderColor: "#8BC240",
  },

  pinCodeText: {
    color: "#04021DCC",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 22.5,
  },
  pinCodeContainer: {
    width: 55,
    height: 55,
  },
  resendButton: {
    alignSelf: "center",
    marginBottom: 40,
    marginTop: 20,
    top: 20,
  },
  resendText: {
    fontSize: 16,
    color: "#8BC240",
  },
  counter: {
    color: "#8BC240",
  },
  verifyButton: {
    backgroundColor: "#8BC240",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 16,
  },
  otpInputContainer: {
    padding: 10,
    paddingHorizontal: 20,
  },
});

export default VerificationScreen;
