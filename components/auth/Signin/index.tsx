import React from "react";
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
        await AsyncStorage.removeItem("access_token");
        await AsyncStorage.setItem("access_token", token);
        router.push("/Home/homescreen" as any);
      } else {
        console.error("Invalid access token");
      }
    } catch (error) {
      console.error("Sign in failed:", error);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontFamily: "Inter",
    fontSize: 32,
    fontWeight: "600",
    lineHeight: 38.73,
    letterSpacing: 0.5,
    textAlign: "center",
    right: 100,
    top: -70,
    color: "#000000",
  },
  header: {
    width: 100,
    height: 16,
    top: -14,
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 16,
    letterSpacing: 0.5,
    textAlign: "left",
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 25,
    paddingHorizontal: 8,
    borderColor: "#EFEFEF",
  },
  button: {
    backgroundColor: "#8BC240",
    padding: 10,
    alignItems: "center",
    marginBottom: 12,
    width: 335,
    height: 60,
    borderRadius: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    top: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    borderRadius: 5,
  },
  signUpText: {
    width: 242,
    height: 20,
    textAlign: "center",
    color: "black",
    top: 170,
    left: 30,
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 25.6,
  },
  signUp: {
    color: "#8BC240",
    textAlign: "center",
    height: 30,
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 25.6,
  },
});

export default SigninPage;
