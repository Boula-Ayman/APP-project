import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { usePostSignInMutation } from "@/src/auth/signin/signinApiSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import i18n from "../../../src/i18n/i18n";

import styles from "./signInStyle";

interface SignInFormValues {
  email: string;
  password: string;
}

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const SigninPage: React.FC = () => {
  const { t } = { t: i18n.t.bind(i18n) };
  const initialValues: SignInFormValues = { email: "", password: "" };
  const [postSignIn] = usePostSignInMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      console.log("Access Token:", token);

      if (token) {
        await AsyncStorage.setItem("access_token", token);
        console.log("Token stored successfully");
        router.push("/" as any);
        setErrorMessage(null);
      } else {
        console.error("Invalid access token");
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      console.error("Sign in failed:", error);
      setErrorMessage("Invalid email or password");
      const errorDetails = (error as any)?.data;
      if (errorDetails) {
        console.error("Error details:", errorDetails);
      }
    }
    console.log(values);
    actions.setSubmitting(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{t("signIn.title")}</Text>
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
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
          }) => (
            <View>
              <Text style={styles.header}>{t("signIn.email")}</Text>
              <TextInput
                style={styles.input}
                placeholder={t("signIn.emailPlaceholder")}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <Text style={styles.header}>{t("signIn.password")}</Text>
              <TextInput
                style={styles.input}
                placeholder={t("signIn.passwordPlaceholder")}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TouchableOpacity style={styles.button} onPress={submitForm}>
                <Text style={styles.buttonText}>{t("signIn.buttonText")}</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <TouchableOpacity>
          <Text style={styles.signUpText}>
            {t("signIn.signUpText")}{" "}
            <Text
              style={styles.signUp}
              onPress={() => router.push("/(auth)/Signup" as any)}
            >
              {t("signIn.signUp")}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SigninPage;
