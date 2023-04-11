import { Block, Text, theme } from "galio-framework";
import { StyleSheet, TouchableOpacity } from "react-native";

import Icon from "./Icon";
import React from "react";
import argonTheme from "../constants/Theme";

class DrawerItem extends React.Component {
  
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case "Profile":
        return (
          <Icon
            name="person"
            family="MaterialIcons"
            size={16}
            color={focused ? "white" : argonTheme.COLORS.SUCCESS}
          />
        );
      case "Courses":
        return (
          <Icon
            name="assignment"
            family="MaterialIcons"
            size={16}
            color={focused ? "white" : argonTheme.COLORS.PRIMARY}
          />
        );
      case "Settings":
        return (<Icon
          name="settings"
          family="MaterialIcons"
          size={16}
          color={focused ? "white" : argonTheme.COLORS.PRIMARY}
          />);
    }
  };

  render() {
    const { focused, title, screen, navigation, color } = this.props;
    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null
    ];

    return (
      <TouchableOpacity
        style={{ height: 60 }}
        onPress={() => {
          switch (screen) {
            // If you need to override the default behavior for a Drawer button, add a case using the name of the button.
            default:
              navigation.navigate("App", { screen: screen })
          }
        }
      }
      >
        <Block flex row style={containerStyles}>
          <Block middle flex={0.1} style={{ marginRight: 5 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              size={15}
              bold={focused ? true : false}
              color={color}
            >
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  activeStyle: {
    backgroundColor: argonTheme.COLORS.ACTIVE,
    borderRadius: 4
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.1
  }
});

export default DrawerItem;
