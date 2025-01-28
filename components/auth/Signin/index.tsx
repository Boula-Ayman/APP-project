import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { usePostSignInMutation } from "@/src/auth/signin/signinApiSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import i18n from "../../../src/i18n/i18n";
import styles from "./signInStyle";
import User1 from "../../../assets/icons/User1.svg";
import Lock from "../../../assets/icons/Lock.svg";
import Arrow from "../../../assets/icons/Arrow.svg";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import Checkbox from "expo-checkbox";

interface SignInFormValues {
  email: string;
  password: string;
}

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SigninPage: React.FC = () => {
  const { t } = { t: i18n.t.bind(i18n) };
  const initialValues: SignInFormValues = { email: "", password: "" };
  const [postSignIn] = usePostSignInMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const [fontsLoaded] = useFonts({
    Inter_400Regular: require("../../../assets/fonts/Inter/Inter_24pt-Regular.ttf"),
    Inter_600SemiBold: require("../../../assets/fonts/Inter/Inter_24pt-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSubmit = async (
    values: SignInFormValues,
    actions: FormikHelpers<SignInFormValues>
  ) => {
    const credentials = {
      email: values.email,
      password: values.password,
    };
    console.log("Credentials being sent:", credentials);
    try {
      const response = await postSignIn(credentials).unwrap();
      console.log("API Response:", response);

      const token = response?.data?.access_token;
      console.log(response);
      if (token) {
        await AsyncStorage.setItem("access_token", token);
        console.log("Token stored successfully");
        router.push("/" as any);
        setErrorMessage(null);
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      setErrorMessage("Invalid email or password");
      const errorDetails = (error as any)?.data;
      if (errorDetails) {
      }
    }
    console.log(values);
    actions.setSubmitting(false);
  };

  const handleBackPress = () => {
    router.push("/Welcome" as any);
  };

  return (
    <SafeAreaView style={styles.SaveAreaView}>
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        behavior={Platform.OS === "ios" ? "height" : "height"}
      >
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Arrow />
        </TouchableOpacity>
        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
            <Text style={[styles.title, { fontFamily: "Inter_600SemiBold" }]}>
              {t("signIn.title")}
            </Text>

            {errorMessage && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}
            <Formik
              initialValues={initialValues}
              validationSchema={SignInSchema}
              onSubmit={handleSubmit}
            >
              {({
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                submitForm,
                isSubmitting,
              }) => (
                <View>
                  <View style={styles.headerContainer}>
                    <Text
                      style={[
                        styles.header,
                        { fontFamily: "Inter_400Regular" },
                      ]}
                    >
                      {t("signIn.email")}
                    </Text>
                    <View style={styles.iconContainer1}>
                      <User1 style={styles.icon} />

                      <TextInput
                        style={styles.input}
                        // placeholder={t("signIn.emailPlaceholder")}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        keyboardType="email-address"
                      />
                    </View>
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                  <View style={styles.headerContainer}>
                    <Text
                      style={[
                        styles.header,
                        { fontFamily: "Inter_400Regular" },
                      ]}
                    >
                      {t("signIn.password")}
                    </Text>

                    <View style={styles.iconContainer2}>
                      <Lock style={styles.icon2} />

                      <TextInput
                        style={styles.input}
                        // placeholder={t("signIn.passwordPlaceholder")}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        secureTextEntry
                      />
                    </View>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                  <View style={styles.rememberMeContainer}>
                    <Checkbox
                      style={styles.checkbox}
                      value={rememberMe}
                      onValueChange={setRememberMe}
                      color={rememberMe ? "#4630EB" : undefined}
                    />
                    <Text
                      style={[
                        styles.Remember,
                        { fontFamily: "Inter_400Regular" },
                      ]}
                    >
                      Remember Me
                    </Text>
                    <Text
                      style={[
                        styles.forgotPassword,
                        { fontFamily: "Inter_600SemiBold" },
                      ]}
                    >
                      Forgot Password?
                    </Text>
                  </View>

                  <TouchableOpacity
                    disabled={isSubmitting}
                    style={styles.button}
                    onPress={submitForm}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        { fontFamily: "Inter_600SemiBold" },
                      ]}
                    >
                      {isSubmitting ? (
                        <ActivityIndicator color={"white"} />
                      ) : (
                        t("signIn.buttonText")
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            <TouchableOpacity>
              <Text
                style={[styles.signUpText, { fontFamily: "Inter_400Regular" }]}
              >
                {t("signIn.signUpText")}{" "}
                <Text
                  style={[styles.signUp, { fontFamily: "Inter_400Regular" }]}
                  onPress={() => router.push("/(auth)/Signup" as any)}
                >
                  {t("signIn.signUp")}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SigninPage;
