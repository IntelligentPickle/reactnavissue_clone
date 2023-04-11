import CourseInfo from "../screens/CourseInfo";
import Courses from "../screens/Courses";
// drawer
import { Dimensions } from "react-native";
// header for screens
import { Header } from "../components";
// screens
import React from "react";
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
      <Stack.Screen name="App" component={AppStack} />
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

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      initialRouteName="Courses"
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
      <Drawer.Screen name="Courses" component={AssignmentsStack} />
      <Drawer.Screen name="CourseInfo" component={CourseInfoStack} />

    </Drawer.Navigator>
  );
}

export default AppStack;