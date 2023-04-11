import * as SecureStore from 'expo-secure-store';

//galio
import { Block, Text, theme } from "galio-framework";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Alert
} from "react-native";
import { authAtom, studentDataAtom } from "../state";
import { useRecoilState, useRecoilValue } from "recoil";

import { List } from 'react-native-paper';
import React from "react";
//argon
import { argonTheme } from "../constants/";
import i18n from 'i18n-js';
import { useNavigation } from "@react-navigation/core";
import * as Updates from 'expo-updates'
import * as Sentry from 'sentry-expo';

const { width } = Dimensions.get("screen");

function Debug() {

  const [authData, setAuthData] = useRecoilState(authAtom)
  const studentData = useRecoilValue(studentDataAtom)

  return (
    <Block flex center>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex style={styles.group}>
          <List.Section style={{ width: width }}>
            <List.Subheader>{i18n.t('Debug.ToolsTitle')}</List.Subheader>
            <List.Item
              title={i18n.t('Debug.InvalidateSessionTitle')}
              description={i18n.t('Debug.InvalidateSessionSubtitle')}
              left={() => <List.Icon icon='delete-forever' color={argonTheme.COLORS.ERROR}/>}
              onPress={async () => {
                // Clear storage
                await SecureStore.setItemAsync('authToken', 'xxxxxxxx-0000-0000-x000-b41c333cc653')
              }}/>
            <List.Item
              title={i18n.t('Debug.ReloadAppTitle')}
              description={i18n.t('Debug.ReloadAppSubtitle')}
              left={() => <List.Icon icon='reload' color={argonTheme.COLORS.SUCCESS}/>}
              onPress={async () => {
                await Updates.reloadAsync();
              }}/>
            <List.Item
              title={i18n.t('Debug.ForceUpdateTitle')}
              description={i18n.t('Debug.ForceUpdateSubtitle')}
              left={() => <List.Icon icon='download' color={argonTheme.COLORS.PRIMARY}/>}
              onPress={async () => {
                try {
                  const update = await Updates.checkForUpdateAsync();
                  if (update.isAvailable) {
                    await Updates.fetchUpdateAsync();
                    await Updates.reloadAsync();
                  }
                } catch (error) {
                  Alert.alert('Failed to update Edforma', `Error fetching latest Expo update: ${error}`);
                }
              }}/>
            <List.Item
              title={i18n.t('Debug.ThrowErrorTitle')}
              description={i18n.t('Debug.ThrowErrorSubtitle')}
              left={() => <List.Icon icon='alert-circle' color={argonTheme.COLORS.ERROR}/>}
              onPress={() => {
                Sentry.Native.captureException(new Error('User-induced error from Debug menu.'))
              }}/>
          </List.Section>
          <List.Section style={{ width: width }}>
            <List.Subheader>{i18n.t('Debug.ValuesTitle')}</List.Subheader>
            <List.Item
              title={i18n.t('Debug.CurrentUserTitle')}
              description={`${studentData.registration.name} (${studentData.misc.studentUsername}, ${studentData.misc.studentID})`}
              left={() => <List.Icon icon='account' color={argonTheme.COLORS.PRIMARY}/>}/>
            <List.Item
              title={i18n.t('Debug.AuthTokenTitle')}
              description={authData.accessToken}
              left={() => <List.Icon icon='key' color={argonTheme.COLORS.PRIMARY}/>}/>
            <List.Item
              title={i18n.t('Debug.UpdateInformationTitle')}
              description={`${Updates.channel ? Updates.channel : 'NO_CHANNEL'} ~ ${Updates.createdAt ? Updates.createdAt.toUTCString() : 'NO_DATE'} ~ ${Updates.updateId ? Updates.updateId : 'NO_ID'}`}
              left={() => <List.Icon icon='update' color={argonTheme.COLORS.PRIMARY}/>}
              />
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
    alignSelf: "center",
    color: argonTheme.COLORS.HEADER
  },
  subtitle: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 10,
    marginHorizontal: 0,
    alignSelf: "center",
    color: argonTheme.COLORS.HEADER
  },
  group: {
    paddingTop: theme.SIZES.BASE,
    flexGrow: 1,
    flexDirection: 'column'
  }
});

export default Debug;