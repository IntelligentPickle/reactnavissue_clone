import { Block, Text, theme } from "galio-framework";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet
} from "react-native";

import { AnnouncementBanner } from "../components";
import React, { useState, useEffect } from "react";
import i18n from "i18n-js";
import { studentDataAtom } from "../state";
import { useRecoilValue } from "recoil";
import { useTheme } from "react-native-paper";
import * as SecureStore from 'expo-secure-store'
const { width, height } = Dimensions.get("screen");


function Profile() {

  const studentData = useRecoilValue(studentDataAtom);
  const theme = useTheme()
  const [preferedName, setPreferedName] = useState(null)

  useEffect(() => {
    async function checkPreferredName() {
      let name = await SecureStore.getItemAsync('preferedName')
      if (name) {
        setPreferedName(name)
      }
    }
    checkPreferredName()
  }, [])
  
  return (
    <Block flex style={styles.profile}>
      <Block flex>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width, marginTop: '25%' }}
        >
          <Block flex style={{...styles.profileCard, backgroundColor: theme.colors.PROFILE_BACKGROUND_COLOR}}>
            <Block middle style={styles.avatarContainer}>
              <Image
                source={{ uri: studentData.registration.studentPicture }}
                style={styles.avatar}
              />
            </Block>
            <Block style={styles.info}>
              <Block row space="between">
                <Block middle flex={1}>
                  <Text
                    bold
                    size={15}
                    color={theme.colors.PROFILE_DETAIL_VALUE_TEXT_COLOR}
                    style={{ marginBottom: 4, marginTop: 10 }}
                  >
                    {studentData.attendance.totalAbsences}
                  </Text>
                  <Text size={11} color={theme.colors.PROFILE_DETAIL_TITLE_TEXT_COLOR}>{i18n.t('Profile.Absences')}</Text>
                </Block>
                <Block middle flex={1} style={{ marginHorizontal: 35 }}>
                  <Text
                    bold
                    color={theme.colors.PROFILE_DETAIL_VALUE_TEXT_COLOR}
                    size={15}
                    style={{ marginBottom: 4, marginTop: 10 }}
                  >
                    {studentData.attendance.totalTardies}
                  </Text>
                  <Text size={11} color={theme.colors.PROFILE_DETAIL_TITLE_TEXT_COLOR}>{i18n.t('Profile.Tardies')}</Text>
                </Block>
                <Block middle flex={1}>
                  <Text
                    bold
                    color={theme.colors.PROFILE_DETAIL_VALUE_TEXT_COLOR}
                    size={15}
                    style={{ marginBottom: 4, marginTop: 10 }}
                  >
                    {studentData.misc.lunchFunds}
                  </Text>
                  <Text size={11} color={theme.colors.PROFILE_DETAIL_TITLE_TEXT_COLOR}>{i18n.t('Profile.Balance')}</Text>
                </Block>
              </Block>
            </Block>
            <Block flex>
              <Block middle style={styles.nameInfo}>
                <Text bold size={28} color={theme.colors.PROFILE_NAME_TEXT_COLOR}>
                  {/* {studentData.registration.name} */}
                  {preferedName ? preferedName : studentData.registration.name}
                </Text>
                <Text size={16} color={theme.colors.PROFILE_GRADE_TEXT_COLOR} style={{ marginTop: 10 }}>
                  {i18n.t('Profile.GradeLevel', { level: studentData.registration.grade })}
                </Text>
              </Block>
              <Block>
                <AnnouncementBanner />
              </Block>
            </Block>
          </Block>
        </ScrollView>
      </Block>
    </Block>
  );
}


const styles = StyleSheet.create({
  profile: {
    // marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1,
    elevation: 0
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 12,
    shadowOpacity: 0.2,
    elevation: 12,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 133,
    height: 133,
    borderRadius: 10,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 10 // adjust this to change distance between name and three number fields
  },
  divider: { // Currently unused, but keeping this here in case it's ever needed
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
});

export default Profile;
