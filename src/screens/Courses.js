//galio
import { Block, Text, theme } from "galio-framework";
import { List, useTheme } from 'react-native-paper';
import {
  Dimensions,
  ScrollView,
  StyleSheet
} from "react-native";
import React, { useEffect } from "react";
import { authAtom, currentSelectedCourseAtom, userAssignmentsAtom } from "../state";
import { useRecoilState, useRecoilValue } from "recoil";

//argon
import { getUserAssignments } from "../utils"
import i18n from 'i18n-js';
import { showMessage } from "react-native-flash-message";
import { useAlerts } from "react-native-paper-alerts";
import { useNavigation } from "@react-navigation/core";
import uuid from 'react-native-uuid';

const { width } = Dimensions.get("screen");

function Courses() {
  
  const authData = useRecoilValue(authAtom);
  const [userAssignments, setUserAssignments] = useRecoilState(userAssignmentsAtom)
  const [currentSelectedCourse, setCurrentSelectedCourse] = useRecoilState(currentSelectedCourseAtom)
  const navigation = useNavigation(); // Allows navigation between our screens
  const theme = useTheme()
  useEffect(() => {
    async function syncAssignments() {
      setUserAssignments(await getUserAssignments(authData.accessToken))
    }
    syncAssignments()
  }, [])

  const listContents = () => {
    if(userAssignments instanceof Error) {
      showMessage({
        message: i18n.t('Errors.CoursesUnavailableTitle'),
        description: i18n.t('Errors.CoursesUnavailableSubtitle', { error: userAssignments.response.data.error ? userAssignments.response.data.error : userAssignments.message }),
        type: 'danger',
        icon: 'danger',
      })
      return null
    } else {
        return userAssignments && userAssignments.classAverages.map(course => {
          return (
            <List.Item
              key={uuid.v4()}
              title={course.subject}
              description={`${course.average} - ${course.teacher}`}
              onPress={() => {
                navigation.push('App', {
                  screen: 'CourseInfo',
                  params: { course }
                })
              }}
              left={() => <List.Icon icon={`numeric-${course.period}-box`} color={theme.colors.COURSES_PERIOD_BADGE_COLOR}/>}
              right={() => {
                  if (course.average > 100) {
                    return (<List.Icon icon="check-all" color={theme.colors.COURSES_EXCELLING_INDICATOR_COLOR}/>)
                  } else if (course.average >= 70) {
                    return (<List.Icon icon="check" color={theme.colors.COURSES_PASSING_INDICATOR_COLOR}/>)
                  } else return (<List.Icon icon="close" color={theme.colors.COURSES_FAILING_INDICATOR_COLOR}/>)
                }
              }
            />
          )
        }
        )
    }
  }
  let alerts = useAlerts()
  
  return (
    <Block flex center>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Block flex style={styles.group}>
          <Text size={12} flex center style={styles.subtitle} color={theme.colors.SCREEN_BODY_TEXT}>
            {i18n.t(`Courses.TipSubtitle`)}
          </Text>
          <List.Section style={{ width: width }}>
            {listContents()}
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
    alignSelf: "center"
  },
  subtitle: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 4,
    marginHorizontal: 0,
    alignSelf: "center",
  },
  group: {
    paddingTop: theme.SIZES.BASE,
    position: 'relative'
  }
});

export default Courses;