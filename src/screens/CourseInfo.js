//galio
import { Block, Text, theme } from "galio-framework";
import {
  Dimensions,
  ScrollView,
  StyleSheet
} from "react-native";
import { List, useTheme } from 'react-native-paper';

import React from "react";
import argonTheme from "../constants/Theme";
import i18n from 'i18n-js'
import uuid from 'react-native-uuid';

//argon

const { width } = Dimensions.get("screen");

const cardWidth = width - theme.SIZES.BASE * 2;

function CourseInfo({ route }) {
  console.log(route) // Will return: {"key": "CourseInfoScreen-xxxxxxxxxxxx...", "name": "CourseInfoScreen", "params": **undefined**}. Params is undefined, despite being specified in navigation function.
  const { course } = route.params
  const theme = useTheme()
  const renderCourseInformation = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title} color={theme.colors.SCREEN_HEADER_TEXT}>
          {course.subject}
        </Text>
        <Text bold size={16} style={styles.teacherDetail} color={theme.colors.SCREEN_BODY_TEXT}>
          {course.teacher}
        </Text>
        <Text bold size={16} style={styles.teacherDetail} color={theme.colors.SCREEN_BODY_TEXT}>
          {course.teacherEmail}
        </Text>
        <List.Section style={{ width: width }}>
          {
            course && course.assignments.map(assignment => {
              return (
                <List.Item
                  key={uuid.v4()}
                  title={assignment.assignmentName}
                  description={
                    (() => {
                      if (typeof assignment.percentage !== 'number') {
                        // Non-number grade. Try to match conditions.
                        if (assignment.score === 'Z') {
                          // Assignment was never turned in
                          return `${i18n.t('CourseInfo.' + assignment.category)} - ${i18n.t('CourseInfo.AssignmentMissing')}`
                        } else if (assignment.score === 'X') {
                          return `${i18n.t('CourseInfo.' + assignment.category)} - ${i18n.t('CourseInfo.AssignmentExempt')}`
                        } else if (assignment.score === '-') {
                          return `${i18n.t('CourseInfo.' + assignment.category)} - ${i18n.t('CourseInfo.AssignmentUngraded')}`
                        }
                      } else {
                        return `${i18n.t('CourseInfo.' + assignment.category)} - ${assignment.score}`
                      }
                    })()
                  }
                  left={() => {
                      if (typeof assignment.percentage !== 'number') {
                        // Non-number grade. Try to match conditions.
                        if (assignment.score === 'Z' || assignment.score === 'X') {
                          // Problem with assignment.
                          return (<List.Icon icon="clipboard-clock-outline" color={argonTheme.COLORS.WARNING}/>)
                        } else {
                          return (<List.Icon icon="clipboard" color={argonTheme.COLORS.MUTED}/>)
                        }  
                    } else if (assignment.percentage <= 70) {
                      return (<List.Icon icon="clipboard-alert" color={argonTheme.COLORS.ERROR}/>)
                    } else {
                      return (<List.Icon icon="clipboard-check" color={argonTheme.COLORS.SUCCESS}/>)
                    }
                  }}
                />
              )
            }
            )
          }
        </List.Section>
      </Block>
      
    );
  };

  return (
    <Block flex center>
      <ScrollView
        showsVerticalScrollIndicator={true}
      >
        {renderCourseInformation()}
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: theme.SIZES.BASE,
    marginTop: 22,
    alignSelf: "center",
    color: argonTheme.COLORS.HEADER
  },
  group: {
    paddingTop: theme.SIZES.BASE
  },
  teacherDetail: {
    width: cardWidth - theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
  }
});

export default CourseInfo;