import React, { useState } from "react";

import { Banner } from 'react-native-paper'
import Icon from "./Icon";
import { StyleSheet } from "react-native";
import { announcementAtom } from "../state";
import { argonTheme } from '../constants';
import { useRecoilValue } from "recoil";

function AnnouncementBanner() {
  const [visible, setVisible] = useState(true)
  const announcement = useRecoilValue(announcementAtom)
  if (announcement) {
    return (
      <Banner
        style={styles}
        visible={visible}
        icon={({size}) => (
          <Icon
            name="announcement"
            family="MaterialIcons"
            size={28}
            color={argonTheme.COLORS.ERROR}
          />
        )}
        actions={[
          {
            label: 'Dismiss',
            onPress: () => setVisible(false)         
          }
        ]}>
        {announcement}
      </Banner>
    );
  } else {
    return null;
  }
}


const styles = StyleSheet.create({
  marginTop: 10,
  marginBottom: 10,
  elevation: 2
});

export default AnnouncementBanner;
