import About from "../screens/About";
import CourseInfo from "../screens/CourseInfo";
import Courses from "../screens/Courses";
// drawer
import CustomDrawerContent from "./Menu";
import Debug from "../screens/Debug";
import { Dimensions } from "react-native";
// header for screens
import { Header } from "../components";
import Login from "../screens/Login";
// screens
import Profile from "../screens/Profile";
import React from "react";
import Settings from "../screens/Settings"
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
// Localizations
import i18n from 'i18n-js';
import { useTheme } from "react-native-paper";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AssignmentsStack(props) {
  const theme = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CoursesScreen"
        component={Courses}
        options={{
          headerMode: "screen",
          header: ({ navigation, scene }) => (
            <Header title={i18n.t('Menu.Courses')} navigation={navigation} scene={scene} color={theme.colors.HEADER_COLOR} bgColor={theme.colors.HEADER_BACKGROUND_COLOR}/>
          ),
          cardStyle: { backgroundColor: theme.colors.BACKGROUND_COLOR }
        }}
      />
    </Stack.Navigator>
  );
}

function CourseInfoStack(props) {
  const theme = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CourseInfoScreen"
        component={CourseInfo}
        options={{
          headerMode: "screen",
          header: ({ navigation, scene }) => (
            <Header title={i18n.t('Menu.CourseInformation')} navigation={navigation} scene={scene} color={theme.colors.HEADER_COLOR} bgColor={theme.colors.HEADER_BACKGROUND_COLOR} back/>
          ),
          cardStyle: { backgroundColor: theme.colors.BACKGROUND_COLOR }
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack(props) {
  const theme = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsScreen"
        component={Settings}
        options={{
          headerMode: "screen",
          header: ({ navigation, scene }) => (
            <Header title={i18n.t('Menu.Settings')} navigation={navigation} scene={scene} color={theme.colors.HEADER_COLOR} bgColor={theme.colors.HEADER_BACKGROUND_COLOR}/>
          ),
          cardStyle: { backgroundColor: theme.colors.BACKGROUND_COLOR }
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  const theme = useTheme();

  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          headerMode: "screen",
          header: ({ navigation, scene }) => (
            <Header
              transparent
              color={theme.colors.HEADER_COLOR}
              title={i18n.t('Menu.Profile')}
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: theme.colors.BACKGROUND_COLOR },
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}


function LoginStack(props) {
  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: false, headerShown: false }}>
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}

function AboutStack(props) {
  const theme = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AboutScreen"
        component={About}
        options={{
          headerMode: "screen",
          header: ({ navigation, scene }) => (
            <Header title={i18n.t('Menu.About')} navigation={navigation} scene={scene} color={theme.colors.HEADER_COLOR} bgColor={theme.colors.HEADER_BACKGROUND_COLOR} back/>
          ),
          cardStyle: { backgroundColor: theme.colors.BACKGROUND_COLOR }
        }}
      />
    </Stack.Navigator>
  );
}

function DebugStack(props) {
  const theme = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DebugScreen"
        component={Debug}
        options={{
          headerMode: "screen",
          header: ({ navigation, scene }) => (
            <Header title={i18n.t('Menu.Debug')} navigation={navigation} scene={scene} color={theme.colors.HEADER_COLOR} bgColor={theme.colors.HEADER_BACKGROUND_COLOR} back/>
          ),
          cardStyle: { backgroundColor: theme.colors.BACKGROUND_COLOR }
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      initialRouteName="Login"
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        },
        headerStyle: {
          backgroundColor: "red"
        },
        headerTitleStyle: {
          color: "green"
        }
      }}
      backBehavior="history"
    >
      <Drawer.Screen name="Login" component={LoginStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Courses" component={AssignmentsStack} />
      <Drawer.Screen name="Settings" component={SettingsStack} />
      <Drawer.Screen name="About" component={AboutStack} />
      <Drawer.Screen name="CourseInfo" component={CourseInfoStack} />
      <Drawer.Screen name="Debug" component={DebugStack} />

    </Drawer.Navigator>
  );
}

export default AppStack;