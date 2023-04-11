//galio
import { Block, Text, theme } from "galio-framework";
import { List, useTheme } from 'react-native-paper';
import {
  Dimensions,
  ScrollView,
  StyleSheet
} from "react-native";
import React from "react";
import i18n from 'i18n-js';
import { showMessage } from "react-native-flash-message";
import { useAlerts } from "react-native-paper-alerts";
import { useNavigation } from "@react-navigation/core";
import uuid from 'react-native-uuid';

const { width } = Dimensions.get("screen");

function Courses() {
  let userAssignments = {
    "status": "success",
    "classAverages": [
      {
        "period": "1",
        "subject": "Fundamentals of Something",
        "course": "477B",
        "teacher": "Cool Guy Joe",
        "teacherEmail": "coolguyjoe@someisd.net",
        "average": 100,
        "assignments": [
          {
            "dueDate": "3/21",
            "assignedDate": "3/12",
            "assignmentName": "Something",
            "category": "Major",
            "score": 5,
            "totalPoints": 1,
            "percentage": 100
          }
        ]
      },
      {
        "period": "2",
        "subject": "Pyrotechnics Theory",
        "course": "875A",
        "teacher": "Billy Joel",
        "teacherEmail": "billyjoel@someisd.net",
        "average": 100,
        "assignments": [
          {
            "dueDate": "3/11",
            "assignedDate": "3/1",
            "assignmentName": "Starting a Fire",
            "category": "Major",
            "score": 5,
            "totalPoints": 1,
            "percentage": 100
          }
        ]
      },
      {
        "period": "3",
        "subject": "Culinary",
        "course": "765A",
        "teacher": "The Reaper",
        "teacherEmail": "thereaper@someisd.net",
        "average": 100,
        "assignments": [
          {
            "dueDate": "3/11",
            "assignedDate": "3/1",
            "assignmentName": "Blue Oysters",
            "category": "Daily",
            "score": 5,
            "totalPoints": 1,
            "percentage": 100
          }
        ]
      },
    ]
  }

  const navigation = useNavigation(); // Allows navigation between our screens
  const theme = useTheme()

  const listContents = () => {
        return userAssignments && userAssignments.classAverages.map(course => {
          return (
            <List.Item
              key={uuid.v4()}
              title={course.subject}
              description={`${course.average} - ${course.teacher}`}
              onPress={() => {
                navigation.push('App', { screen: "CourseInfo", params: { course } })
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