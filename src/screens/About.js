//galio
import { Block, Text, theme } from "galio-framework";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet
} from "react-native";
import { List, useTheme } from 'react-native-paper';

import Images from "../constants/Images";
import React from "react";
//argon
import { argonTheme } from "../constants/";
import i18n from "i18n-js";
import { studentDataAtom } from "../state";
import { useRecoilValue } from "recoil";

const { width } = Dimensions.get("screen");

function About() {
  const theme = useTheme()
  const stuName = useRecoilValue(studentDataAtom).registration.name
  return (
    <Block flex center>
      <ScrollView
        showsVerticalScrollIndicator={true}
      >
        <Block flex center style={styles.group}>
          <Image source={theme.dark ? Images.ColoredLogo : Images.Logo} style={{ flex: 1, marginTop: 32, resizeMode: 'contain' }}></Image>
          <Text bold size={16} style={styles.title}>{i18n.t("About.Header")}</Text>
          <List.Section style={{ width: width }}>
            <List.Item
              title={i18n.t("About.LeadDeveloperTitle")}
              description={i18n.t("About.LeadDeveloperSubtitle")}
              left={() => <List.Icon icon={`code-tags`} color={argonTheme.COLORS.ERROR} />} />
            {/* I'll put the people who helped here soon. */}
            <List.Item
              title={i18n.t("About.ThankYouTitle", { name: stuName })}
              description={i18n.t("About.ThankYouSubtitle")}
              left={() => <List.Icon icon={`heart`} color={argonTheme.COLORS.ERROR} />} />
          </List.Section>
        </Block>
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 1,
    marginTop: 15,
    alignSelf: "center",
    textAlign: 'center', // <-- the magic
    color: argonTheme.COLORS.HEADER
  },
  group: {
    paddingTop: theme.SIZES.BASE,
    flexGrow: 1,
    flexDirection: 'column'
  },
});

export default About;