import { View, Text, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CustomHeader from '../../commonComponent/Header/CustomHeader';
import DropDownPicker from 'react-native-dropdown-picker';
import i18n from '../../i18n/i18n';
import Button from '@/commonComponent/button/Button';
import { Formik } from 'formik';
import { ProfileImagePicker } from './components/ProfileImagePicker';
import { useAccountForm } from './hooks/useAccountForm';
import * as Yup from 'yup';

const accountInfoValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required(i18n.t('signUp.firstNameRequired'))
    .trim(),
  lastName: Yup.string()
    .required(i18n.t('signUp.lastNameRequired'))
    .trim(),
  gender: Yup.string()
    .oneOf(['male', 'female'])
    .required(),
  dateOfBirth: Yup.string()
    .matches(/^(\d{2}\/\d{2}\/\d{4})?$/, i18n.t('settings.useDateFormat'))
    .nullable(),
  mobileNumber: Yup.string()
    .matches(/^\d*$/, i18n.t('settings.invalidPhoneNumber'))
    .nullable(),
  countryCode: Yup.string(),
  photo: Yup.string().nullable(),
}); 

const AccountInfoScreen = () => {
  const { isLoadingProfile, isUpdating, getInitialValues, handleSubmit } = useAccountForm();
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderItems] = useState([
    { label: i18n.t('settings.male'), value: 'male' },
    { label: i18n.t('settings.female'), value: 'female' }
  ]);

  if (isLoadingProfile) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#8BC240" />
      </View>
    );
  }

  const renderNameFields = ({ handleChange, handleBlur, values, errors, touched }) => (
    <View style={styles.row}>
      <View style={styles.halfInput}>
        <Text style={styles.label}>{i18n.t('settings.firstName')}</Text>
        <TextInput
          style={[styles.input, touched.firstName && errors.firstName && styles.inputError]}
          value={values.firstName}
          onChangeText={handleChange('firstName')}
          onBlur={() => handleBlur('firstName')}
          placeholder={i18n.t('settings.enterFirstName')}
        />
        {touched.firstName && errors.firstName && (
          <Text style={styles.errorText}>{errors.firstName}</Text>
        )}
      </View>
      <View style={styles.halfInput}>
        <Text style={styles.label}>{i18n.t('settings.lastName')}</Text>
        <TextInput
          style={[styles.input, touched.lastName && errors.lastName && styles.inputError]}
          value={values.lastName}
          onChangeText={handleChange('lastName')}
          onBlur={() => handleBlur('lastName')}
          placeholder={i18n.t('settings.enterLastName')}
        />
        {touched.lastName && errors.lastName && (
          <Text style={styles.errorText}>{errors.lastName}</Text>
        )}
      </View>
    </View>
  );

  const renderGenderField = ({ values, setFieldValue }) => (
    <>
      <Text style={styles.label}>{i18n.t('settings.gender')}</Text>
      <DropDownPicker
        open={genderOpen}
        value={values.gender}
        items={genderItems}
        setOpen={setGenderOpen}
        setValue={(callback) => {
          const value = callback(values.gender);
          setFieldValue('gender', value);
        }}
        style={styles.dropdownStyle}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownText}
      />
    </>
  );

  const renderDateOfBirthField = ({ handleChange, handleBlur, values, errors, touched }) => (
    <View>
      <Text style={styles.label}>{i18n.t('settings.dateOfBirth')}</Text>
      <TextInput
        style={[styles.input, touched.dateOfBirth && errors.dateOfBirth && styles.inputError]}
        value={values.dateOfBirth}
        onChangeText={handleChange('dateOfBirth')}
        onBlur={() => handleBlur('dateOfBirth')}
        placeholder={i18n.t('settings.enterDateOfBirth')}
        keyboardType="numeric"
      />
      {touched.dateOfBirth && errors.dateOfBirth && (
        <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
      )}
    </View>
  );

  const renderPhoneField = ({ handleChange, handleBlur, values, errors, touched }) => (
    <View>
      <Text style={styles.label}>{i18n.t('settings.mobileNumber')}</Text>
      <View style={styles.phoneContainer}>
        <TextInput
          style={styles.countryCode}
          value={values.countryCode}
          onChangeText={handleChange('countryCode')}
          editable={false}
        />
        <TextInput
          style={[
            styles.phoneInput,
            touched.mobileNumber && errors.mobileNumber && styles.inputError
          ]}
          value={values.mobileNumber}
          onChangeText={handleChange('mobileNumber')}
          onBlur={() => handleBlur('mobileNumber')}
          placeholder={i18n.t('settings.enterMobileNumber')}
          keyboardType="phone-pad"
        />
      </View>
      {touched.mobileNumber && errors.mobileNumber && (
        <Text style={styles.errorText}>{errors.mobileNumber}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader title={i18n.t('settings.accountInfo')}/>
      
      <Formik
        initialValues={getInitialValues()}
        validationSchema={accountInfoValidationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <View style={styles.content}>
            <ProfileImagePicker
              value={formikProps.values.photo}
              onChange={(value) => formikProps.setFieldValue('photo', value)}
            />

            <View style={styles.form}>
              {renderNameFields(formikProps)}
              {renderGenderField(formikProps)}
              {renderDateOfBirthField(formikProps)}
              {renderPhoneField(formikProps)}
            </View>

            <Button 
              onPress={formikProps.handleSubmit} 
              style={styles.updateButton}
              disabled={isUpdating}
              isLoading={isUpdating}
            >
              {i18n.t('settings.update')}
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AccountInfoScreen; 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  form: {
    flex: 1,
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfInput: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: 'Inter_500Medium',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1A1A1A',
    fontFamily: 'Inter_400Regular',
  },
  dropdownStyle: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    overflow: 'hidden',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    overflow: 'hidden',
  },
  dropdownText: {
    fontSize: 16,
    color: '#1A1A1A',
    fontFamily: 'Inter_400Regular',
  },
  phoneContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  countryCode: {
    width: 80,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1A1A1A',
    fontFamily: 'Inter_400Regular',
  },
  phoneInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1A1A1A',
    fontFamily: 'Inter_400Regular',
  },
  inputError: {
    borderColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
  },
  updateButton: {
    marginBottom: 24,
  },
} as const);