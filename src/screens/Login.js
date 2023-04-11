import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
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

      let authData = await login(usr, psw); // Get session token
      setAuthData(authData)
      await SecureStore.setItemAsync('authToken', authData.accessToken);

      let registrationData = await getUserData(authData.accessToken);
      setStudentData({
        registration: registrationData.registration,
        attendance: registrationData.attendance,
        transportation: registrationData.transportation,
        misc: registrationData.misc
      }) // Set all user data

      navigation.navigate("App", { screen: "Courses" }) // Go to the profile page
      setLoginLoading(false) // Loading done
    }

    const onPressLogin = async () => {
      initLogin(username, password)
    }

    return (
      <Block flex middle style={{backgroundColor: theme.colors.BACKGROUND_COLOR}} ke>
        <StatusBar hidden />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Block safe flex middle>
            <Block>
              <Block flex>
                <Block flex={0.18} middle>
                  <Text color={theme.colors.SCREEN_BODY_TEXT} size={12}>
                    {i18n.t('Login.Header')}
                  </Text>
                </Block>
                <Block flex center>
                  <Button color={loginLoading ? 'placeholder' : 'primary'} style={styles.createButton} onPress={() => onPressLogin()} loading={loginLoading} disabled={loginLoading}>
                    <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                      {i18n.t('Login.Submit')}
                    </Text>
                  </Button>
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
