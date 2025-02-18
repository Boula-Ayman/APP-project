import {
  View,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import CustomHeader from "../../commonComponent/Header/CustomHeader";
import i18n from "../../i18n/i18n";
import Button from "@/commonComponent/button/Button";
import { useUpdatePasswordMutation } from "@/src/api/userApiSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import PasswordInput from "./components/PasswordInput";

const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required(
    i18n.t("settings.currentPasswordRequired")
  ),
  newPassword: Yup.string()
    .min(8, i18n.t("signUp.passwordTooShort"))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-]).{8,}$/,
      i18n.t("signUp.invalidPassword")
    )
    .required(i18n.t("settings.newPasswordRequired")),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], i18n.t("settings.passwordMismatch"))
    .required(i18n.t("settings.confirmPasswordRequired")),
});

const ChangePasswordScreen = () => {
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const handleUpdate = async (values: any) => {
    try {
      await updatePassword({
        current_password: values.currentPassword,
        new_password: values.newPassword,
      }).unwrap();

      Alert.alert(
        i18n.t("common.success"),
        i18n.t("settings.passwordUpdateSuccess"),
        [{ text: i18n.t("common.ok"), onPress: () => router.back() }]
      );
    } catch (error) {
      console.error("Error updating password:", error);
      Alert.alert(
        i18n.t("common.error"),
        i18n.t("settings.passwordUpdateError")
      );
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={i18n.t("settings.changePassword")} showBackButton />

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={ChangePasswordSchema}
          onSubmit={handleUpdate}
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
              <View style={styles.form}>
                <PasswordInput
                  label={i18n.t("settings.currentPassword")}
                  value={values.currentPassword}
                  onChangeText={handleChange("currentPassword")}
                  onBlur={() => {
                    handleBlur("currentPassword");
                    setFocusedInput(null);
                  }}
                  error={errors.currentPassword}
                  touched={touched.currentPassword}
                  placeholder={i18n.t("settings.enterCurrentPassword")}
                  onFocus={() => setFocusedInput("currentPassword")}
                  isFocused={focusedInput === "currentPassword"}
                />

                <PasswordInput
                  label={i18n.t("settings.newPassword")}
                  value={values.newPassword}
                  onChangeText={handleChange("newPassword")}
                  onBlur={() => {
                    handleBlur("newPassword");
                    setFocusedInput(null);
                  }}
                  error={errors.newPassword}
                  touched={touched.newPassword}
                  placeholder={i18n.t("settings.enterNewPassword")}
                  onFocus={() => setFocusedInput("newPassword")}
                  isFocused={focusedInput === "newPassword"}
                />

                <PasswordInput
                  label={i18n.t("settings.confirmNewPassword")}
                  value={values.confirmNewPassword}
                  onChangeText={handleChange("confirmNewPassword")}
                  onBlur={() => {
                    handleBlur("confirmNewPassword");
                    setFocusedInput(null);
                  }}
                  error={errors.confirmNewPassword}
                  touched={touched.confirmNewPassword}
                  placeholder={i18n.t("settings.confirmNewPassword")}
                  onFocus={() => setFocusedInput("confirmNewPassword")}
                  isFocused={focusedInput === "confirmNewPassword"}
                />
              </View>

              <Button
                onPress={() => handleSubmit()}
                style={styles.updateButton}
                disabled={isSubmitting || isLoading}
                isLoading={isLoading || isSubmitting}
              >
                {i18n.t("settings.update")}
              </Button>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  form: {
    flex: 1,
    gap: 24,
    paddingTop: 16,
  },
  updateButton: {
    marginBottom: 24,
  },
});

export default ChangePasswordScreen;
