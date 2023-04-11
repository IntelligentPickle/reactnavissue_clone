import 'react-native-gesture-handler';

import * as Localization from 'expo-localization';
import * as Sentry from 'sentry-expo';

import { Block, GalioProvider } from "galio-framework";
import { DarkTheme, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import React, { useRef, useState } from 'react';

import { AlertsProvider } from 'react-native-paper-alerts';
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from 'recoil';
import Screens from './navigation/Screens'
import { argonTheme } from "./constants";
import { enableScreens } from "react-native-screens";
import i18n from 'i18n-js';
import { Alert, useColorScheme } from 'react-native'
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import * as Updates from 'expo-updates'

// Keep splash screen shown
SplashScreen.preventAutoHideAsync();

// Define the theme used by React Native Paper.
const lightTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    // Background color for the whole app.
    BACKGROUND_COLOR: '#FFFFFF',
    // Header colors
    HEADER_COLOR: '#000000',
    HEADER_BACKGROUND_COLOR: '#FFFFFF',
    DRAWER_ITEM_TEXT_COLOR: '#000000',
    // Text used within screens.
    SCREEN_HEADER_TEXT: '#525F7F',
    SCREEN_BODY_TEXT: '#000000',
    // Colors used specially in the login screen.
    LOGIN_CONTAINER_BACKGROUND_COLOR: '#f2f2f2',
    LOGIN_INPUT_BACKGROUND_COLOR: '#DCDCDC',
    LOGIN_INPUT_ICON_COLOR: '#000000',
    // Colors used specially in the profile screen.
    PROFILE_BACKGROUND_COLOR: '#FFFFFF',
    PROFILE_DETAIL_TITLE_TEXT_COLOR: '#000000',
    PROFILE_DETAIL_VALUE_TEXT_COLOR: "#4382d9",
    PROFILE_NAME_TEXT_COLOR: "#4382d9",
    PROFILE_GRADE_TEXT_COLOR: "#4382d9",
    // Colors used specially in the Courses screen (not CourseInfo!)
    COURSES_HELP_BUTTON_COLOR: "#000000",
    COURSES_PERIOD_BADGE_COLOR: '#000000',
    COURSES_EXCELLING_INDICATOR_COLOR: '#BF40BF',
    COURSES_PASSING_INDICATOR_COLOR: '#43B02A',
    COURSES_FAILING_INDICATOR_COLOR: '#F5365C'
  },
};

const darkTheme = {
  ...DarkTheme,
  roundness: 2,
  colors: {
    ...DarkTheme.colors,
    // Background color for the whole app.
    BACKGROUND_COLOR: '#1E1E1E',
    // Header colors
    HEADER_COLOR: '#FFFFFF',
    HEADER_BACKGROUND_COLOR: '#1E1E1E',
    DRAWER_ITEM_TEXT_COLOR: '#FFFFFF',
    // Text used within screens.
    SCREEN_HEADER_TEXT: '#6783c9',
    SCREEN_BODY_TEXT: '#FFFFFF',
    // Colors used specially in the login screen.
    LOGIN_CONTAINER_BACKGROUND_COLOR: '#252526',
    LOGIN_INPUT_BACKGROUND_COLOR: '#3E3E42',
    LOGIN_INPUT_ICON_COLOR: '#4C6AB5',
    // Colors used specially in the profile screen.
    PROFILE_BACKGROUND_COLOR: '#252526',
    PROFILE_DETAIL_TITLE_TEXT_COLOR: '#FFFFFF',
    PROFILE_DETAIL_VALUE_TEXT_COLOR: "#4382d9",
    PROFILE_NAME_TEXT_COLOR: "#4382d9",
    PROFILE_GRADE_TEXT_COLOR: "#4382d9",
    // Colors used specially in the Courses screen (not CourseInfo!)
    COURSES_HELP_BUTTON_COLOR: "#FFFFFF",
    COURSES_PERIOD_BADGE_COLOR: '#FFFFFF',
    COURSES_EXCELLING_INDICATOR_COLOR: '#BF40BF',
    COURSES_PASSING_INDICATOR_COLOR: '#43B02A',
    COURSES_FAILING_INDICATOR_COLOR: '#F5365C'

  },
};

// Localization
i18n.translations = {
  en: require('./locales/en.json')
};
i18n.locale = Localization.locale // Define the system's locale.
i18n.fallbacks = true; // If text localization doesn't exist, fallback to a locale that does have it.

const routingInstrumentation = new Sentry.Native.ReactNavigationInstrumentation(); // Create a navigation instrumentation for Sentry.

// Initialize Sentry.
Sentry.init({
  dsn: 'https://d59e7d1d02b84179ac870505aa2b2fb2@o1069103.ingest.sentry.io/6063441',
  integrations: [
    new Sentry.Native.ReactNativeTracing({
      tracingOrigins: ["localhost", /^\//],
      routingInstrumentation
    })
  ],
  tracesSampleRate: .4, // CHANGE THIS IN PRODUCTION!
  enableInExpoDevelopment: false,
  enableAutoSessionTracking: true,
  dist: Updates.updateId,
  debug: true,
  beforeSend(event) {
    // In the future, we can show an error report dialog on an error event.
    if (event.exception) {
      showMessage({
        message: i18n.t('Errors.InternalErrorTitle'),
        description: i18n.t('Errors.InternalErrorSubtitle', { error: event.exception.values[0].value }),
        type: 'danger',
        icon: 'danger',
      })
    }
    return event;
  },
});

// Before rendering any navigation stack
enableScreens();


const App = () => {
  const navigationRef = useRef(); // Reference for the navigation container
  const scheme = useColorScheme(); // Get the current color scheme.
  const [isLoadingComplete, setLoading] = useState(false);

  Font.loadAsync('ArgonExtra', require('./assets/font/argon.ttf'))

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        // Register the navigation container with the instrumentation
        routingInstrumentation.registerNavigationContainer(navigationRef);
      }}>
      <PaperProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
        <AlertsProvider>
          <RecoilRoot>
            <GalioProvider theme={argonTheme}>
              <Block flex>
                <Screens />
                <FlashMessage position='bottom' />
              </Block>
            </GalioProvider>
          </RecoilRoot>
        </AlertsProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}

export default Sentry.Native.wrap(App);