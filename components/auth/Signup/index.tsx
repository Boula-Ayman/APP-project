import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePostSignUpMutation } from "../../../src/auth/signup/signuupApiSlice";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../../src/i18n/i18n";

const SignUpPage: React.FC = () => {
  const { t } = { t: i18n.t.bind(i18n) };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [phone_number, setPhone_Number] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [postSignUp] = usePostSignUpMutation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async () => {
    const formData = {
      name: `${firstName} ${lastName}`,
      email,
      password,
      birth_date: birthDate,
      // phone_number,
    };

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage(t("signup.invalidEmail"));
      return;
    }

    // password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?`~\-])[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>\/?`~\-]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(t("signup.invalidPassword"));
      return;
    }

    // birth date validation
    const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
    if (!birthDateRegex.test(birthDate)) {
      setErrorMessage(t("signup.invalidBirthDate"));
      return;
    }

    try {
      const response = await postSignUp(formData).unwrap();
      setErrorMessage("");

      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.setItem("access_token", response?.data?.access_token);
      router.push("/(auth)/verify" as any);
    } catch (error: any) {
      console.error("Sign up failed:", error);

      if ((error as { status?: number }).status === 409) {
        setErrorMessage(t("signup.emailExists"));
      } else if (
        (error as { status?: number; message?: string }).status === 400 &&
        error.message.includes("birth_date")
      ) {
        setErrorMessage(t("signup.invalidBirthDate"));
      } else {
        setErrorMessage(t("signup.signupFailed"));
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity> */}
        <Text style={styles.title}>{t("signup.title")}</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder={t("signup.emailPlaceholder")}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder={t("signup.birthDatePlaceholder")}
          value={birthDate}
          onChangeText={setBirthDate}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.passwordInput]}
            placeholder={t("signup.passwordPlaceholder")}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        {/* <TextInput
          style={styles.input}
          placeholder="+20"
          keyboardType="phone-pad"
          value={phone_number}
          onChangeText={setPhone_Number}
        /> */}
        <Text style={styles.termsText}>
          {t("signup.termsText")}{" "}
          <Text style={styles.linkText}>{t("signup.terms")}</Text>{" "}
          {t("signup.and")}{" "}
          <Text style={styles.linkText}>{t("signup.privacyPolicy")}</Text>.
        </Text>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>
            {t("signup.signUpButton")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
    flexGrow: 1,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
  },
  termsText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginVertical: 20,
  },
  linkText: {
    color: "#8BC240",
  },
  signUpButton: {
    backgroundColor: "#8BC240",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 10,
  },
});

export default SignUpPage;
