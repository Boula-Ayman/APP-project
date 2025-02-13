import { View, Text, Switch } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import CustomHeader from '../../commonComponent/Header/CustomHeader';
import SoundEffect from '../../assets/icons/soundEffect.svg';
import NotificationIcon from '../../assets/icons/notification.svg';
import LanguageIcon from '../../assets/icons/language.svg';
import AccountIcon from '../../assets/icons/account.svg';
import PasswordIcon from '../../assets/icons/password.svg';
import TermsIcon from '../../assets/icons/privacy.svg';
import PolicyIcon from '../../assets/icons/privacy.svg';
import i18n from '../../i18n/i18n';
import SettingButton from '../../commonComponent/button/SettingButton';

const SettingsScreen = () => {
  const [soundEffects, setSoundEffects] = useState(true);
  const [notifications, setNotifications] = useState(false);

  const ToggleSettingItem = ({ icon: Icon, title, value, onPress }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingItemLeft}>
        <Icon width={24} height={24} />
        <Text style={styles.settingItemText}>{title}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onPress}
        trackColor={{ false: '#767577', true: '#8BC240' }}
        thumbColor={value ? '#fff' : '#f4f3f4'}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader title={i18n.t('settings.title')} showBackButton />
      
      {/* Main Settings */}
      <ToggleSettingItem
        icon={SoundEffect}
        title={i18n.t('settings.soundEffects')}
        value={soundEffects}
        onPress={() => setSoundEffects(!soundEffects)}
      />
      <ToggleSettingItem
        icon={NotificationIcon}
        title={i18n.t('settings.notifications')}
        value={notifications}
        onPress={() => setNotifications(!notifications)}
      />
      <SettingButton
        icon={LanguageIcon}
        title={i18n.t('settings.language')}
        onPress={() => {/* Handle language change */}}
      />

      {/* More Settings */}
      <Text style={styles.sectionTitle}>{i18n.t('settings.moreSettings')}</Text>
      
      <SettingButton
        icon={AccountIcon}
        title={i18n.t('settings.accountInfo')}
        onPress={() => router.push('/settings/accountInfo')}
      />
      <SettingButton
        icon={PasswordIcon}
        title={i18n.t('settings.changePassword')}
        onPress={() => router.push('/settings/changePassword')}
      />

      {/* Policy */}
      <Text style={styles.sectionTitle}>{i18n.t('settings.policy')}</Text>
      
      <SettingButton
        icon={TermsIcon}
        title={i18n.t('settings.termsOfService')}
        onPress={() => {/* Handle terms */}}
      />
      <SettingButton
        icon={PolicyIcon}
        title={i18n.t('settings.userPolicy')}
        onPress={() => {/* Handle policy */}}
      />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "85%",
    alignSelf: "center",
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,

  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingItemText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#1A1A1A',
  },
  settingItemValue: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#8BC240',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 24,
    marginBottom: 8,
  },
}); 