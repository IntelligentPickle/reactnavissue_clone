import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import * as Sentry from 'sentry-expo';
import * as localauth from 'expo-local-authentication'

import { Block, Checkbox, Text } from "galio-framework";
import { Button, Icon, Input } from "../components";
import {
  Dimensions,
  KeyboardAvoidingView,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import { argonTheme } from "../constants";
import React, { useEffect, useState } from "react";
import { useTheme } from 'react-native-paper';
import { announcementAtom, authAtom, studentDataAtom, touchIDStatusAtom } from "../state";
import { getHeartbeat, getUserData, login } from '../utils'

import i18n from 'i18n-js';
import { showMessage } from "react-native-flash-message";
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from "recoil";
import * as SplashScreen from "expo-splash-screen"

const { width, height } = Dimensions.get("screen");

function Login() {

    const [authData, setAuthData] = useRecoilState(authAtom)
    const [studentData, setStudentData] = useRecoilState(studentDataAtom)
    const [announcement, setAnnouncement] = useRecoilState(announcementAtom)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [remMeBoxValue, setRemMeBoxValue] = useState(false)
    const [loginLoading, setLoginLoading] = useState(false)
    const navigation = useNavigation(); // Allows navigation between our screens
    const theme = useTheme();
  
    const initLogin = async (usr, psw) => {
      setLoginLoading(true);
      if (remMeBoxValue === true) {
        await SecureStore.setItemAsync('ssoUsername', usr);
        await SecureStore.setItemAsync('ssoPassword', psw);
      }

      let authData = await login(usr, psw); // Get session token
      if (authData instanceof Error) {
        showMessage({
          message: i18n.t('Errors.LoginErrorTitle'),
          // When we pass the error, it will be displayed in the message body. If Edformer (server) has an error message, we will display that. Otherwise, we will display the JS error given from Axios.
          description: i18n.t('Errors.LoginErrorSubtitle', { error: authData.response.data.error ? authData.response.data.error : authData.message }),
          type: "danger",
          icon: "danger",
          duration: 5000
        })
        return setLoginLoading(false)
      }

      setAuthData(authData)
      await SecureStore.setItemAsync('authToken', authData.accessToken);

      let registrationData = await getUserData(authData.accessToken);
      setStudentData({
        registration: registrationData.registration,
        attendance: registrationData.attendance,
        transportation: registrationData.transportation,
        misc: registrationData.misc
      }) // Set all user data

      const hashedUsername = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.MD5,
        registrationData.misc.studentUsername
      );

      Sentry.Native.configureScope(scope => scope.setUser({ username: hashedUsername }));
      navigation.navigate("App", { screen: "Profile" }) // Go to the profile page
      setLoginLoading(false) // Loading done
    }

    const onPressLogin = async () => {
      initLogin(username, password)
    }

    // Check if the server is up.
    useEffect(() => {
      async function checkHeartbeat() {
        let heartbeatStats = await getHeartbeat(); //
        if (heartbeatStats instanceof Error) {
          setLoginLoading(false);
          showMessage({
            message: i18n.t('Errors.ServerDownTitle'),
            description: i18n.t('Errors.ServerDownSubtitle'),
            type: "danger",
            icon: "danger",
            duration: 5000
          })
        } else {
          if (heartbeatStats.data.server.announcement) {
            setAnnouncement(heartbeatStats.data.server.announcement)
          }
        }
      }
      checkHeartbeat()
    }, [])
    // Check for saved passwords or tokens.
    useEffect(() => {
      async function checkPreExistingCreds() {
        let storedUsername = await SecureStore.getItemAsync('ssoUsername');
        let storedPassword = await SecureStore.getItemAsync('ssoPassword');
        if (storedUsername && storedPassword) {
          await initLogin(storedUsername, storedPassword)
          return await SplashScreen.hideAsync()
        } else {
          return await SplashScreen.hideAsync()
        }
        
      }
      checkPreExistingCreds()
    }, []);

    return (
      <Block flex middle style={{backgroundColor: theme.colors.BACKGROUND_COLOR}} ke>
        <StatusBar hidden />
        {/* <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
          resizeMode='contain'
        > */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Block safe flex middle>
            <Block style={{...styles.registerContainer, backgroundColor: theme.colors.LOGIN_CONTAINER_BACKGROUND_COLOR}}>
              <Block flex>
                <Block flex={0.18} middle>
                  <Text color={theme.colors.SCREEN_BODY_TEXT} size={12}>
                    {i18n.t('Login.Header')}
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 0 }}>
                      <Input
                        borderless
                        autoCapitalize="none"
                        autoCorrect={false}
                        color={theme.colors.SCREEN_BODY_TEXT}
                        backgroundColor={theme.colors.LOGIN_INPUT_BACKGROUND_COLOR}
                        placeholder={i18n.t('Login.UsernamePlaceholder')}
                        onChangeText={setUsername}
                        value={username}
                        editable={!loginLoading}
                        iconContent={
                          <Icon
                            size={16}
                            color={theme.colors.LOGIN_INPUT_ICON_COLOR}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        borderless
                        password
                        autoCapitalize='none'
                        autoCorrect={false}
                        color={theme.colors.SCREEN_BODY_TEXT}
                        backgroundColor={theme.colors.LOGIN_INPUT_BACKGROUND_COLOR}
                        viewPass
                        placeholder={i18n.t('Login.PasswordPlaceholder')}
                        onChangeText={setPassword}
                        value={password}
                        editable={!loginLoading}
                        iconContent={
                          <Icon
                            size={16}
                            color={theme.colors.LOGIN_INPUT_ICON_COLOR}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block middle>
                      <Checkbox color="primary" label={i18n.t('Login.RememberMe')} labelStyle={{ color: theme.colors.SCREEN_BODY_TEXT}} value={remMeBoxValue} onChange={setRemMeBoxValue}/>
                    </Block>
                    <Block middle>
                      <Button color={loginLoading ? 'placeholder' : 'primary'} style={styles.createButton} onPress={() => onPressLogin()} loading={loginLoading} disabled={loginLoading}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          {i18n.t('Login.Submit')}
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
            {/* <Text size={14} bold style={{ position: 'absolute', bottom: 8}}>Privacy Policy</Text> */}
          </Block>
        </TouchableWithoutFeedback>
        {/* </ImageBackground> */}
      </Block>
    );
  
  }

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.360,
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  inputIcons: {
    marginRight: 12
  },
  createButton: {
    width: width * 0.5,
    marginTop: 10
  }
});

export default Login;
