import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { usePostSignInMutation } from "@/src/auth/signin/signinApiSlice";
import { router, useRouter } from "expo-router";
import i18n from "../../../i18n/i18n";
import styles from "./signInStyle";
import User1 from "../../../assets/icons/User1.svg";
import Lock from "../../../assets/icons/Lock.svg";
import Arrow from "../../../assets/icons/arrow.svg";
import { useFonts } from "expo-font";
import Checkbox from "expo-checkbox";
import { setUser } from "@/src/auth/signin/userSlice";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SigninPage: React.FC = () => {
  const { t } = { t: i18n.t.bind(i18n) };
  const [postSignIn] = usePostSignInMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    Inter_400Regular: require("../../../assets/fonts/Inter/Inter_24pt-Regular.ttf"),
    Inter_600SemiBold: require("../../../assets/fonts/Inter/Inter_24pt-SemiBold.ttf"),
  });

  if (!fontsLoaded) return null;
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const handleSubmit = async (values, actions) => {
    try {
      const response = await postSignIn({ body: values }).unwrap();
      dispatch(
        setUser({
          user: response?.data?.user,
          token: response?.data?.access_token,
        })
      );
      router.replace("/");
      setErrorMessage(null);
    } catch (e) {
      setErrorMessage(t("invalidSignin"));
    } finally {
      actions.setSubmitting(false);
    }
  };
  const handleFocus = (inputName: string) => {
    setFocusedInput(inputName);
  };

  const handleBlurInput = () => {
    setFocusedInput(null);
  };

  return (
    <SafeAreaView
      style={[
        styles.SaveAreaView,
        { direction: i18n.language === "ar" ? "rtl" : "ltr" },
      ]}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "height" : "height"}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/Welcome" as any)}
        >
          {i18n.language === "en" ? (
            <Arrow />
          ) : (
            <Arrow style={{ transform: [{ rotate: "180deg" }] }} />
          )}
        </TouchableOpacity>
        <ScrollView style={styles.scrollContent}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>{t("signIn.title")}</Text>
            <Formik
              initialValues={{ email: "", password: "" }}
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
                    <Text style={styles.header}>{t("signIn.email")}</Text>
                    <View style={styles.iconContainer1}>
                      <User1
                        style={[
                          styles.icon,
                          i18n.language === "ar" ? { right: 15 } : { left: 15 },
                        ]}
                      />
                      <TextInput
                        style={[
                          styles.input,
                          {
                            borderColor:
                              errors.email && touched.email
                                ? "red"
                                : focusedInput === "email" || values.email
                                ? "#8BC240"
                                : "#EFEFEF",
                            direction: i18n.language === "ar" ? "rtl" : "ltr",
                            textAlign:
                              i18n.language === "ar" ? "right" : "left",
                          },
                        ]}
                        // placeholder={t("signIn.emailPlaceholder")}

                        onChangeText={handleChange("email")}
                        onFocus={() => handleFocus("email")}
                        onBlur={() => {
                          handleBlur("firstName");
                          handleBlurInput();
                        }}
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
                      <Lock
                        style={[
                          styles.icon2,
                          i18n.language === "ar" ? { right: 15 } : { left: 15 },
                        ]}
                      />
                      <TextInput
                        style={[
                          styles.input,
                          {
                            borderColor:
                              errors.password && touched.password
                                ? "red"
                                : focusedInput === "password" || values.password
                                ? "#8BC240"
                                : "#EFEFEF",
                            direction: i18n.language === "ar" ? "rtl" : "ltr",
                            textAlign:
                              i18n.language === "ar" ? "right" : "left",
                          },
                        ]}
                        // placeholder={t("signIn.passwordPlaceholder")}
                        onChangeText={handleChange("password")}
                        onFocus={() => handleFocus("password")}
                        onBlur={() => {
                          handleBlur("password");
                          handleBlurInput();
                        }}
                        value={values.password}
                        secureTextEntry={!showPassword}
                      />
                      {values.password && (
                        <TouchableOpacity
                          onPress={() => setShowPassword(!showPassword)}
                          style={[
                            {
                              position: "absolute",
                              height: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            },
                            i18n.language === "en"
                              ? { right: 15 }
                              : { left: 15 },
                          ]}
                        >
                          <Ionicons
                            name={showPassword ? "eye" : "eye-off"}
                            size={24}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                  <View style={styles.rememberMeContainer}>
                    <View style={styles.rememberMe}>
                      <Checkbox
                        style={styles.checkbox}
                        value={rememberMe}
                        onValueChange={setRememberMe}
                        color={rememberMe ? "#8BC240" : undefined}
                      />
                      <Text style={styles.Remember}>{t("rememberMe")}</Text>
                    </View>
                    <Text style={styles.forgotPassword}>
                      {t("forgotPassword")}
                    </Text>
                  </View>
                  {errorMessage && (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                  )}
                  <TouchableOpacity
                    disabled={isSubmitting}
                    style={styles.button}
                    onPress={submitForm}
                  >
                    <Text style={styles.buttonText}>
                      {isSubmitting ? (
                        <ActivityIndicator color="white" />
                      ) : (
                        t("signIn.buttonText")
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {!isKeyboardVisible && (
        <TouchableOpacity
          onPress={() => {
            router.push("/(auth)/Signup" as any);
          }}
        >
          <Text style={styles.signUpText}>
            {t("signIn.signUpText")}{" "}
            <Text style={styles.signUp}>{t("signIn.signUp")}</Text>
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default SigninPage;
