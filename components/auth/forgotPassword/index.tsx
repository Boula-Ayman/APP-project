import React, { useState } from 'react';
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
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import i18n from '../../../i18n/i18n';
import styles from './frogotpasswordStyle';
import { useTranslation } from 'react-i18next';
import Arrow from '../../../assets/icons/arrow.svg';
import { useRequestPasswordResetMutation } from '../../../src/auth/forgotPassword/forgotPasswordApiSlice';
import PopupMessage from './PopupMessage';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const router = useRouter();
  const [requestPasswordReset, { isLoading }] =
    useRequestPasswordResetMutation();

  const handleSubmit = async (values, actions) => {
    try {
      await requestPasswordReset({
        email: values.email,
        reset_password_page_pathname: '/reset-password',
      }).unwrap();

      setErrorMessage(null);
      setSuccessMessage(t('ForgotPassword.successMessage'));

      // 3 seconds before redirecting
      setTimeout(() => {
        router.push('/(auth)/signIn' as any);
      }, 3000);
    } catch (error: any) {
      if (error.status === 404) {
        setErrorMessage(t('ForgotPassword.errorMessage'));
      } else {
        setErrorMessage(t('ForgotPassword.genericError'));
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
    <SafeAreaView style={styles.SaveAreaView}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Arrow />
        </TouchableOpacity>

        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <View style={styles.innerContainer}>
            <Text style={styles.title}>{t('ForgotPassword.title')}</Text>

            <Formik
              initialValues={{ email: '' }}
              validationSchema={ForgotPasswordSchema}
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
                  {/* Email Input */}
                  <View style={styles.headerContainer}>
                    <Text style={styles.header}>
                      {t('ForgotPassword.email')}
                    </Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange('email')}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlurInput}
                      value={values.email}
                      keyboardType="email-address"
                    />
                  </View>

                  <TouchableOpacity
                    disabled={isSubmitting}
                    style={styles.button}
                    onPress={submitForm}
                  >
                    <Text style={styles.buttonText}>
                      {isLoading ? (
                        <ActivityIndicator color="white" />
                      ) : (
                        t('ForgotPassword.resetButton')
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {successMessage && (
        <PopupMessage
          message={successMessage}
          type="success"
          onClose={() => setSuccessMessage(null)}
        />
      )}
      {errorMessage && (
        <PopupMessage
          message={errorMessage}
          type="error"
          onClose={() => setErrorMessage(null)}
        />
      )}
    </SafeAreaView>
  );
};

export default ForgotPasswordPage;
