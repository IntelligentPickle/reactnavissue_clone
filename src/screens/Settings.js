import * as SecureStore from 'expo-secure-store';

//galio
import { Block, Text, theme } from "galio-framework";
import {
  Dimensions,
  ScrollView,
  StyleSheet
} from "react-native";
import React, { useState } from "react";

import { List } from 'react-native-paper';
//argon
import { argonTheme } from "../constants/";
// Localization
import i18n from "i18n-js";
//Messages
import { showMessage } from "react-native-flash-message";
import { touchIDStatusAtom } from "../state";
import { useAlerts } from "react-native-paper-alerts";
import { useNavigation } from "@react-navigation/core";
import { useRecoilValue } from "recoil";

const { width } = Dimensions.get("screen");

function Settings() {

  const navigation = useNavigation(); // Allows navigation between our screens
  const alerts = useAlerts();
  const touchIDStatus = useRecoilValue(touchIDStatusAtom)
  const [touchIdSwitch, setTouchIdSwitch] = useState(touchIDStatus)

  const toggleFingerprint = async (v) => {
    if (v === true) {
      setTouchIdSwitch(true)
      SecureStore.setItemAsync('usingFingerprintLogin', JSON.stringify(true))
    } else {
      setTouchIdSwitch(false)
      SecureStore.setItemAsync('usingFingerprintLogin', JSON.stringify(false))
    }
  }
  
  return (
    <Block flex center>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex style={styles.group}>
          <List.Section style={{ width: width }}>
            {/* <List.Item
              title="Touch ID Login"
              description="Ask for fingerprint when using remember me."
              left={() => <List.Icon icon={touchIdSwitch ? 'fingerprint' : 'fingerprint-off'} color={argonTheme.COLORS.PRIMARY}/>}
              right={() => <Switch value={touchIdSwitch} onValueChange={toggleFingerprint}/>}/> */}
            {/* <List.Item
              title="Language"
              description="Set the language that Edforma will use."
              left={() => <List.Icon icon={`comment-text-outline`} color={argonTheme.COLORS.SUCCESS}/>}
              onPress={() => { 
                navigation.navigate('Language')
              }}/> */}
            <List.Item
              title={i18n.t('Settings.EditProfileTitle')}
              description={i18n.t('Settings.EditProfileSubtitle')}
              left={() => <List.Icon icon={`pencil`} color={argonTheme.COLORS.PRIMARY}/>}
              onPress={() => {
                alerts.prompt(
                  'Edit Profile',
                  'Enter the name you would like Edforma to use.',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Reset',
                      style: 'destructive',
                      onPress: async (name) => {
                        await SecureStore.deleteItemAsync('preferedName');
                        showMessage({
                          message: i18n.t('Settings.ProfileResetTitle'),
                          description: i18n.t('Settings.ProfileResetSubtitle'),
                          type: 'info',
                          icon: 'info'
                        })
                      },
                    },
                    {
                      text: 'Change',
                      onPress: async (name) => {
                        await SecureStore.setItemAsync('preferedName', name);
                        showMessage({
                          message: i18n.t('Settings.ProfileSetTitle'),
                          description: i18n.t('Settings.ProfileSetSubtitle', { name: name }),
                          type: 'success',
                          icon: 'success',
                        })
                      },
                    },
                  ],
                  'plain-text',
                  '',
                  'default',
                  { inputLabel: 'Name', inputAppearance: 'outlined' }
                );
              }}/>
            <List.Item
              title={i18n.t('Settings.LogOutTitle')}
              description={i18n.t('Settings.LogOutSubtitle')}
              left={() => <List.Icon icon={`logout`} color={argonTheme.COLORS.ERROR}/>}
              onPress={() => {
                alerts.alert(
                  i18n.t('Settings.LogOutDialogTitle'),
                  i18n.t('Settings.LogOutDialogBody'),
                  [
                    {
                      text: i18n.t('Settings.LogOutDialogCancel'),
                      style: "cancel"
                    },
                    {
                      text: i18n.t('Settings.LogOutDialogConfirm'),
                      style: "destructive",
                      onPress: async () => {
                        SecureStore.deleteItemAsync('authToken'); // Delete the token.
                        SecureStore.deleteItemAsync('ssoUsername') // Delete stored username, if existant
                        SecureStore.deleteItemAsync('ssoPassword') // Delete stored password, if existant
                        navigation.closeDrawer(); // From here, it's just UI stuff being handled; close drawer
                        showMessage({
                          message: i18n.t('Settings.LogOutSuccessTitle'),
                          description: i18n.t('Settings.LogOutSuccessSubtitle'),
                          type: 'success',
                          icon: 'success',
                        })
                        navigation.reset({ // Reset back to login
                          index: 0,
                          routes: [{ name: 'Login' }],
                        });
                      }
                    }
                  ]
                );
              }}/>
            <List.Item
              title={i18n.t('Settings.AboutTitle')}
              description={i18n.t('Settings.AboutSubtitle')}
              left={() => <List.Icon icon={`information-outline`} color={argonTheme.COLORS.SUCCESS}/>}
              onPress={() => { navigation.push('App', {
                screen: 'About'
              })}}/>
          </List.Section>
        </Block>
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 22,
    marginHorizontal: 120,
    alignSelf: "center",
    color: argonTheme.COLORS.HEADER
  },
  group: {
    paddingTop: theme.SIZES.BASE,
    flexGrow: 1,
    flexDirection: 'column'
  },
  settingsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default Settings;