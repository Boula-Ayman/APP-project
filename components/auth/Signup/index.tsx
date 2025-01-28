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
import styles from "./signupStyle";
import Button from "@/commonComponent/button/Button";
import Arrow from "../../../assets/icons/Arrow.svg";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required(i18n.t("signup.required")),
  lastName: Yup.string().required(i18n.t("signup.required")),
  email: Yup.string()
    .email(i18n.t("signup.invalidEmail"))
    .required(i18n.t("signup.required")),
  password: Yup.string()
    .min(8, i18n.t("signup.passwordTooShort"))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-]).{8,}$/,
      i18n.t("signup.invalidPassword")
    )
    .required(i18n.t("signup.required")),
  birthDate: Yup.string().required(i18n.t("signup.required")),
});

const SignUpPage: React.FC = () => {
  const { t } = { t: i18n.t.bind(i18n) };
  const [postSignUp] = usePostSignUpMutation();
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleSignUp = async (
    values: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      birthDate: string;
    },
    actions: FormikHelpers<any>
  ) => {
    try {
      console.log(values);
      const response = await postSignUp({
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        password: values.password,
        birth_date: values.birthDate,
      }).unwrap();

      await AsyncStorage.setItem("access_token", response?.data?.access_token);
      router.push("/(auth)/verify");
    } catch (error: any) {
      if (error?.status === 409) {
        actions.setErrors({ email: t("signup.emailExists") });
      } else if (
        error?.status === 400 &&
        error?.message?.includes("birth_date")
      ) {
        actions.setErrors({ birthDate: t("signup.invalidBirthDate") });
      } else {
        setGeneralError(t("signup.signupFailed"));
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            birthDate: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={handleSignUp}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <>
              <View style={styles.backContainer}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => router.push("/Welcome")}
                >
                  <Arrow />
                </TouchableOpacity>
                <Text style={styles.backText}>
                  <Text style={styles.one}>1</Text> / 2
                </Text>
              </View>
              <Text style={styles.title}>{t("signup.title")}</Text>

              <View style={styles.row}>
                <View style={styles.inputContainer}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.Name}>{t("signup.firstName")}</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="First Name"
                      onChangeText={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                      value={values.firstName}
                    />
                    {touched.firstName && errors.firstName && (
                      <Text style={styles.errorText}>{errors.firstName}</Text>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.Name}>{t("signup.lastName")}</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Last Name"
                      onChangeText={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                      value={values.lastName}
                    />
                    {touched.lastName && errors.lastName && (
                      <Text style={styles.errorText}>{errors.lastName}</Text>
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.emailContainer}>
                <Text>{t("signup.email")}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t("signup.emailPlaceholder")}
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              <TextInput
                style={styles.input}
                placeholder={t("signup.birthDatePlaceholder")}
                onChangeText={handleChange("birthDate")}
                onBlur={handleBlur("birthDate")}
                value={values.birthDate}
              />
              {touched.birthDate && errors.birthDate && (
                <Text style={styles.errorText}>{errors.birthDate}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder={t("signup.passwordPlaceholder")}
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              {generalError && (
                <Text style={styles.errorText}>{generalError}</Text>
              )}
              <View>
                <Button onPress={() => handleSubmit()} disabled={isSubmitting}>
                  <Text>{t("signup.signUpButton")}</Text>
                </Button>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpPage;
