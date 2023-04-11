import { Block, Text, theme } from "galio-framework";
import { Image, Pressable, ScrollView, StyleSheet } from "react-native";

import { DrawerItem as DrawerCustomItem } from "../components";
import React from "react";
import i18n from "i18n-js";
import { useTheme } from "react-native-paper";
import * as Updates from 'expo-updates'

let debugCounter = 0

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  const screens = ["Courses"];
  const theme = useTheme()
  return (
    <Block
      style={{...styles.container, backgroundColor: theme.colors.BACKGROUND_COLOR}}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.06} style={styles.header}>
        <Pressable
          onPress={() => {
            debugCounter++

            if (debugCounter === 4) {
              navigation.push('App', {
                screen: 'Debug'
              })
              debugCounter = 0
            }
          }}>
        </Pressable>
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={i18n.t(`Menu.${item}`)}
                color={theme.colors.DRAWER_ITEM_TEXT_COLOR}
                screen={item}
                key={index}
                navigation={navigation}
                focused={state.index === index +1 ? true : false}
              />
            );
          })}
          {/* <Block
            flex
            style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}
          >
            <Block
              style={{
                borderColor: "rgba(0,0,0,0.2)",
                width: "100%",
                borderWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Text color="#8898AA" style={{ marginTop: 16, marginLeft: 8 }}>
              DOCUMENTATION
            </Text>
          </Block>
          <DrawerCustomItem title="Getting Started" navigation={navigation} /> */}
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: "center",
  },
  logo: {
    resizeMode: "contain"
  }
});

export default CustomDrawerContent;