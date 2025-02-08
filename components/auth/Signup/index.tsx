import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { usePostSignUpMutation } from "../../../src/auth/signup/signuupApiSlice";
import { router } from "expo-router";
import i18n from "../../../i18n/i18n";
import styles from "./signupStyle";
import Button from "@/commonComponent/button/Button";
import Arrow from "../../../assets/icons/Arrow.svg";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useDispatch, UseDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-number-input";
import { setAccessToken, setUser } from "@/src/auth/signin/userSlice";
import { usePostSignInMutation } from "@/src/auth/signin/signinApiSlice";

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().trim().required(i18n.t("signUp.firstNameRequired")),
  lastName: Yup.string().trim().required(i18n.t("signUp.lastNameRequired")),
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
  birthDate: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, i18n.t("signUp.invalidDate"))
    .required(i18n.t("signUp.birthDateRequired")),
});

const SignUpPage: React.FC = () => {
  const { t } = { t: i18n.t.bind(i18n) };
  const [postSignUp] = usePostSignUpMutation();
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const phoneInput = useRef<any>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState("");
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("");
  const [postSignIn] = usePostSignInMutation();

  const dispatch = useDispatch();
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
    setShowMessage(false);
    setError("");

    try {
      if (!phoneInput.current?.isValidNumber(values.phoneNumber)) {
        actions.setFieldError("phoneNumber", "Invalid phone number");
        return setShowMessage(true);
      }

      const body = {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        password: values.password,
        phone_number: formattedPhoneNumber,
        birth_date: values.birthDate,
      };

      const response = await postSignUp(body).unwrap();
      const accessToken = response?.data?.access_token;
      console.log("accessToken", accessToken);

      dispatch(setAccessToken(accessToken));

      router.push(
        `/(auth)/verify?email=${values.email}&password=${values.password}`
      );
    } catch (error: any) {
      const errorData = error.data.message;

      setError(errorData || "An unknown error occurred");
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{...styles.scrollContent}}>
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
          validateOnBlur
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
              {error && (
                <Text
                  style={{
                    color: "red",
                    fontSize: 14,
                    textAlign: "center",
                  }}
                >
                  {error}
                </Text>
              )}
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
                              : "#EFEFEF",
                        },
                      ]}
                      onChangeText={handleChange("firstName")}
                      onFocus={() => handleFocus("firstName")}
                      onBlur={() => {
                        handleBlur("firstName");
                        handleBlurInput();
                      }}
                      placeholder={t("signUp.firstName")}
                      placeholderTextColor="#68677799"
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
                              : "#EFEFEF",
                        },
                      ]}
                      onChangeText={handleChange("lastName")}
                      onFocus={() => handleFocus("lastName")}
                      placeholderTextColor="#68677799"
                      placeholder={t("signUp.lastName")}
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
                          : "#EFEFEF",
                    },
                  ]}
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => {
                    handleBlur("email");
                    handleBlurInput();
                  }}
                  placeholderTextColor="#68677799"
                  placeholder={t("signUp.email")}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>
              <View style={{ position: "relative" }}>
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
                          : "#EFEFEF",
                    },
                  ]}
                  onChangeText={handleChange("password")}
                  onFocus={() => handleFocus("password")}
                  onBlur={() => {
                    handleBlur("password");
                    handleBlurInput();
                  }}
                  value={values.password}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#68677799"
                  placeholder="******"
                />

                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                    style={{
                      position: "absolute",
                      right: 10,
                      top: -47,
                    }}
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <TouchableOpacity>
                <Text style={styles.Name}>{t("signUp.phoneNumber")}</Text>
                <PhoneInput
                  ref={phoneInput}
                  defaultCode="EG"
                  defaultValue={values.phoneNumber}
                  placeholder=" "
                  onChangeFormattedText={(text) =>
                    setFormattedPhoneNumber(text)
                  }
                  onChangeText={(text) => {
                    setFieldValue("phoneNumber", text);
                  }}
                  containerStyle={{
                    width: "100%",
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor:
                      touched.phoneNumber && errors.phoneNumber
                        ? "#FF4D4D"
                        : focusedInput === "phoneNumber" || values.phoneNumber
                        ? "#8BC240"
                        : "#EFEFEF",
                    borderRadius: 8,
                    padding: 2,
                  }}
                  textContainerStyle={{
                    backgroundColor: "white",
                    borderLeftWidth: 1,
                    borderLeftColor: "#EFEFEF",
                    height: 52,
                    width: "100%",
                  }}
                  textInputProps={{
                    placeholderTextColor: "#68677799",
                    keyboardType: "numeric",
                    onFocus: () => {
                      handleFocus("phoneNumber");
                    },
                    onBlur: () => {
                      handleBlur("phoneNumber");
                      handleBlurInput();
                    },
                  }}
                  textInputStyle={{
                    padding: 0,
                    fontSize: 14,
                    fontFamily: "Inter500Medium",
                    color: "black",
                    width: "100%",
                    height: 56,
                    backgroundColor: "white",
                    fontWeight: "500",
                  }}
                  codeTextStyle={{
                    color: "black",
                    fontSize: 14,
                  }}
                />

                {touched.phoneNumber && errors.phoneNumber && (
                  <Text style={styles.errorTextPhone}>
                    {errors.phoneNumber}
                  </Text>
                )}
                {showMessage && (
                  <Text style={styles.errorTextPhone}>
                    {t("signUp.invalidCountryNumber")}
                  </Text>
                )}
              </TouchableOpacity>
              <View>
                <Text style={styles.Name}>{t("signUp.birthDate")}</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor:
                        errors.birthDate && touched.birthDate
                          ? "red"
                          : focusedInput === "birthDate" || values.birthDate
                          ? "#8BC240"
                          : "#EFEFEF",
                    },
                  ]}
                  // placeholder={t("signUp.birthDatePlaceholder")}
                  onChangeText={handleChange("birthDate")}
                  onFocus={() => handleFocus("birthDate")}
                  onBlur={() => {
                    handleBlur("birthDate");
                    handleBlurInput();
                  }}
                  placeholderTextColor="#68677799"
                  placeholder="YYYY-MM-DD"
                  value={values.birthDate}
                />
                {touched.birthDate && errors.birthDate && (
                  <Text style={styles.errorText}>{errors.birthDate}</Text>
                )}
              </View>

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
                  {isSubmitting ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text>{t("signUp.signUpButton")}</Text>
                  )}
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
