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
import { usePostSignUpMutation } from "../../../src/auth/signup/signuupApiSlice";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../../i18n/i18n";
import styles from "./signupStyle";
import Button from "@/commonComponent/button/Button";
import Arrow from "../../../assets/icons/Arrow.svg";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import DropDownPicker from "react-native-dropdown-picker";

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required(i18n.t("signUp.firstNameRequired")),
  lastName: Yup.string().required(i18n.t("signUp.lastNameRequired")),
  email: Yup.string()
    .email(i18n.t("signUp.invalidEmail"))
    .required(i18n.t("signUp.emailRequired")),
  password: Yup.string()
    .min(8, i18n.t("signUp.passwordTooShort"))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-]).{8,}$/,
      i18n.t("signUp.invalidPassword")
    )
    .required(i18n.t("signUp.passwordRequired")),
  phoneNumber: Yup.string()
    .required(i18n.t("signUp.phoneNumberRequired"))
    .matches(/^\d+$/, i18n.t("signUp.invalidPhoneNumber")),
  birthDate: Yup.date()
    .required(i18n.t("signUp.birthDateRequired"))
    .typeError(i18n.t("signUp.invalidDate")),
});

const SignUpPage: React.FC = () => {
  const { t } = { t: i18n.t.bind(i18n) };
  const [postSignUp] = usePostSignUpMutation();
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState("+20");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSignUp = async (
    values: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      phoneNumber: string;
      birthDate: string;
    },
    actions: FormikHelpers<any>
  ) => {
    try {
      const fullPhoneNumber = `${countryCode}${values.phoneNumber}`;

      const response = await postSignUp({
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        password: values.password,
        phone_number: fullPhoneNumber,
        birth_date: new Date(values.birthDate).toISOString(),
      }).unwrap();

      console.log("Signup response:", response);

      const accessToken = response?.data?.access_token;
      if (accessToken) {
        await AsyncStorage.setItem("access_token", accessToken);
        console.log("Access token stored:", accessToken);
      } else {
        console.error("Access token is undefined");
      }

      router.push("/(auth)/verify");
    } catch (error: any) {
      console.error("signUp error:", error);

      if (error.status === "FETCH_ERROR") {
        console.error(
          "Network error: Failed to fetch. Please check your connection and try again."
        );
      } else {
        console.error("An unexpected error occurred:", error);
      }

      if (error?.status === 409) {
        actions.setErrors({ email: t("signUp.emailExists") });
      } else if (
        error?.status === 400 &&
        error?.message?.includes("phone_number")
      ) {
        actions.setErrors({ phoneNumber: t("signUp.invalidPhoneNumber") });
      } else {
        setGeneralError(t("signUp.signupFailed"));
      }
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
            phoneNumber: "",
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
            setFieldValue,
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
              <Text style={styles.title}>{t("signUp.title")}</Text>

              <View style={styles.row}>
                <View style={styles.inputContainer}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.Name}>{t("signUp.firstName")}</Text>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          borderColor:
                            errors.firstName && touched.firstName
                              ? "red"
                              : focusedInput === "firstName" || values.firstName
                              ? "#8BC240"
                              : "#ccc",
                        },
                      ]}
                      onChangeText={handleChange("firstName")}
                      onFocus={() => handleFocus("firstName")}
                      onBlur={() => {
                        handleBlur("firstName");
                        handleBlurInput();
                      }}
                      value={values.firstName}
                    />
                    {touched.firstName && errors.firstName && (
                      <Text style={styles.errorText}>{errors.firstName}</Text>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.Name}>{t("signUp.lastName")}</Text>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          borderColor:
                            errors.lastName && touched.lastName
                              ? "red"
                              : focusedInput === "lastName" || values.lastName
                              ? "#8BC240"
                              : "#ccc",
                        },
                      ]}
                      onChangeText={handleChange("lastName")}
                      onFocus={() => handleFocus("lastName")}
                      onBlur={() => {
                        handleBlur("lastName");
                        handleBlurInput();
                      }}
                      value={values.lastName}
                    />
                    {touched.lastName && errors.lastName && (
                      <Text style={styles.errorText}>{errors.lastName}</Text>
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.emailContainer}>
                <Text style={styles.Name}>{t("signUp.email")}</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor:
                        errors.email && touched.email
                          ? "red"
                          : focusedInput === "email" || values.email
                          ? "#8BC240"
                          : "#ccc",
                    },
                  ]}
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => {
                    handleBlur("email");
                    handleBlurInput();
                  }}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>
              <View>
                <Text style={styles.Name}>{t("signUp.password")}</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor:
                        errors.password && touched.password
                          ? "red"
                          : focusedInput === "password" || values.password
                          ? "#8BC240"
                          : "#ccc",
                    },
                  ]}
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  onFocus={() => handleFocus("password")}
                  onBlur={() => {
                    handleBlur("password");
                    handleBlurInput();
                  }}
                  value={values.password}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>
              <View>
                <Text style={styles.Name}>{t("signUp.phoneNumber")}</Text>
                <View style={styles.phoneInputContainer}>
                  <DropDownPicker
                    open={isDropdownOpen}
                    value={countryCode}
                    items={[
                      { label: "+20", value: "+20" },
                      { label: "+1", value: "+1" },
                    ]}
                    setOpen={setIsDropdownOpen}
                    setValue={setCountryCode}
                    style={[styles.dropdown, { width: 80 }]}
                    dropDownContainerStyle={{
                      width: 80,
                      maxHeight: 100,
                    }}
                    containerStyle={{ width: 100 }}
                    listMode="SCROLLVIEW"
                    arrowIconContainerStyle={{
                      marginRight: 5,
                    }}
                  />
                  <TextInput
                    style={[
                      styles.phoneNumberInput,
                      {
                        borderColor:
                          errors.phoneNumber && touched.phoneNumber
                            ? "red"
                            : focusedInput === "phoneNumber" ||
                              values.phoneNumber
                            ? "#8BC240"
                            : "#ccc",
                      },
                    ]}
                    keyboardType="phone-pad"
                    onChangeText={handleChange("phoneNumber")}
                    onFocus={() => handleFocus("phoneNumber")}
                    onBlur={() => {
                      handleBlur("phoneNumber");
                      handleBlurInput();
                    }}
                    value={values.phoneNumber}
                  />
                </View>

                {touched.phoneNumber && errors.phoneNumber && (
                  <Text style={styles.errorTextPhone}>
                    {errors.phoneNumber}
                  </Text>
                )}
              </View>
              <View>
                <Text style={styles.Name}>Birth Date</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor:
                        errors.birthDate && touched.birthDate
                          ? "red"
                          : focusedInput === "birthDate" || values.birthDate
                          ? "#8BC240"
                          : "#ccc",
                    },
                  ]}
                  // placeholder={t("signUp.birthDatePlaceholder")}
                  onChangeText={handleChange("birthDate")}
                  onFocus={() => handleFocus("birthDate")}
                  onBlur={() => {
                    handleBlur("birthDate");
                    handleBlurInput();
                  }}
                  value={values.birthDate}
                />
                {touched.birthDate && errors.birthDate && (
                  <Text style={styles.errorText}>{errors.birthDate}</Text>
                )}
              </View>

              {generalError && (
                <Text style={styles.errorText}>{generalError}</Text>
              )}
              <View style={styles.TextContainer}>
                <Text style={styles.MainText}>
                  {t("signUp.agreeToTermsPrefix")}
                  <Text style={styles.Text}>{t("signUp.terms")}</Text>
                  {t("signUp.and")}
                  <Text style={styles.Text}>{t("signUp.privacyPolicy")}</Text>
                </Text>
              </View>
              <View style={styles.signUpButton}>
                <Button onPress={() => handleSubmit()} disabled={isSubmitting}>
                  <Text>{t("signUp.signUpButton")}</Text>
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
