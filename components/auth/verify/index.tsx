import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { usePostVerifyMutation } from "../../../src/auth/veirfy/verify";
import { number } from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OtpInput } from "react-native-otp-entry";
import { router } from "expo-router";
import i18n from "../../../src/i18n/i18n";

const VerificationScreen: React.FC = () => {
  const [timer, setTimer] = useState<number>(90); // 1 minute and 30 seconds

  const { t } = { t: i18n.t.bind(i18n) };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [otp, setOtp] = useState<string>();

  const [PostVerify] = usePostVerifyMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const handleVerify = async () => {
    console.log("OTP entered:", otp);
    if (!otp || otp.length !== 4) {
      setErrorMessage("OTP must be exactly 4 digits");
      return;
    }

    const formData = {
      otp: Number(otp),
    };

    try {
      console.log("Access Token:", await AsyncStorage.getItem("access_token"));
      const verify = await PostVerify(formData).unwrap();
      setErrorMessage("");
      console.log("Success verify", verify);
      await AsyncStorage.removeItem("access_token");
      router.push("/Home/homescreen" as any);
    } catch (error) {
      if (typeof error === "object" && error !== null && "data" in error) {
        setErrorMessage("The OTP is incorrect. Please try again.");
        console.error(
          "Verify failed:",
          (error as { data: { message: string } }).data.message
        );
      } else {
        setErrorMessage("Verification failed. Please try again.");
        console.error("Verify failed:", error);
      }
    }
  };

  const handleResendCode = () => {
    console.log("Resend Code");
    setTimer(90);

    //  resend code logic here
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 60 ? `0${seconds}` : seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("verify.verify_email_title")}</Text>
      <Text style={styles.subtitle}>{t("verify.enter_otp_message")}</Text>
      <OtpInput
        numberOfDigits={4}
        onTextChange={(text) => setOtp(text)}
        theme={{
          focusedPinCodeContainerStyle: styles.activePinCodeContainer,
          filledPinCodeContainerStyle: styles.filledPinCodeContainer,
          pinCodeTextStyle: styles.pinCodeText,
        }}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{t(errorMessage)}</Text>
      ) : null}

      <TouchableOpacity style={styles.resendButton} onPress={handleResendCode}>
        <Text style={styles.resendText}>
          Resend code in:{" "}
          <Text style={styles.counter}> {formatTime(timer)} </Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    width: 327,
    height: 78,
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
    borderStyle: "solid",

    borderRadius: 8,
  },
  filledPinCodeContainer: {
    width: 55,
    height: 55,
  },

  pinCodeText: { color: "#8BC240" },
  resendButton: {
    alignSelf: "center",
    marginBottom: 40,
    marginTop: 20,
    top: 20,
  },
  resendText: {
    fontSize: 16,
    color: "#666",
  },
  counter: {
    color: "#8BC240",
  },
  verifyButton: {
    backgroundColor: "#8BC240",
    padding: 16,
    borderRadius: 8,
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
});

export default VerificationScreen;
