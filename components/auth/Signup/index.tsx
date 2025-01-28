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
import DropDownPicker from "react-native-dropdown-picker";

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
  phoneNumber: Yup.string()
    .required(i18n.t("signup.required"))
    .matches(/^\d+$/, i18n.t("signup.invalidPhoneNumber")),
  birthDate: Yup.date()
    .required(i18n.t("signup.required"))
    .typeError(i18n.t("signup.invalidDate")),
});

const SignUpPage: React.FC = () => {
  const { t } = { t: i18n.t.bind(i18n) };
  const [postSignUp] = usePostSignUpMutation();
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState("+20");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
      console.log("Signup values:", values);
      const response = await postSignUp({
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        password: values.password,
        phone_number: values.phoneNumber,
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
      console.error("Signup error:", error);

      if (error?.status === 409) {
        actions.setErrors({ email: t("signup.emailExists") });
      } else if (
        error?.status === 400 &&
        error?.message?.includes("phone_number")
      ) {
        actions.setErrors({ phoneNumber: t("signup.invalidPhoneNumber") });
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
                <Text style={styles.Name}>{t("signup.email")}</Text>
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
              <View>
                <Text style={styles.Name}>{t("signup.password")}</Text>
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
              </View>
              <View>
                <Text style={styles.Name}>{t("signup.phoneNumber")}</Text>
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
                    style={styles.phoneNumberInput}
                    keyboardType="phone-pad"
                    onChangeText={handleChange("phoneNumber")}
                    onBlur={handleBlur("phoneNumber")}
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
                  style={styles.input}
                  placeholder={t("signup.birthDatePlaceholder")}
                  onChangeText={handleChange("birthDate")}
                  onBlur={handleBlur("birthDate")}
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
                  By continuing you are indicating that you agree to the{" "}
                  <Text style={styles.Text}>Terms</Text> and{" "}
                  <Text style={styles.Text}> Privacy Policy.</Text>
                </Text>
              </View>
              <View style={styles.signUpButton}>
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
