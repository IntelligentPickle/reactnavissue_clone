import { Block, Button, NavBar, Text, theme } from 'galio-framework';
import { Dimensions, Platform, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

import Icon from './Icon';
import React from 'react';
import argonTheme from '../constants/Theme';
import i18n from 'i18n-js';
import { useAlerts } from 'react-native-paper-alerts';
import { useTheme } from 'react-native-paper';
import { withNavigation } from '@react-navigation/compat';

// TODO: Rework this entire thing. Dear lord.

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const CoursesScreenHelpButton = ({isWhite, style}) => {
  let alerts = useAlerts()
  let theme = useTheme()
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={() => {
      alerts.alert('Courses List Help', `✓✓: ${i18n.t('Courses.ExcellingClassSubtitle')}\n✓: ${i18n.t(`Courses.PassingClassSubtitle`)}\n✕: ${i18n.t(`Courses.FailingClassSubtitle`)}`)
    }}>
      <Icon
        family="MaterialIcons"
        size={22}
        name="help"
        color={theme.colors.COURSES_HELP_BUTTON_COLOR}
      />
    </TouchableOpacity>
  );
}

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (back ? navigation.goBack() : navigation.openDrawer());
  }
  renderRight = () => {
    const { white, title, navigation } = this.props;
    if (title === 'Courses') {
      return [
        <CoursesScreenHelpButton key='crs-help-button' navigation={navigation} isWhite={true}/>,
      ]
    }
  }
  renderOptions = () => {
    const { navigation, optionLeft, optionRight } = this.props;

    return (
      <Block row style={styles.options}>
        <Button shadowless style={[styles.tab, styles.divider]}>
          <Block row middle>
            <Icon name="diamond" family="ArgonExtra" style={{ paddingRight: 8 }} color={argonTheme.COLORS.ICON} />
            <Text size={16} style={styles.tabTitle}>{optionLeft || 'Daily'}</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab}>
          <Block row middle>
            <Icon size={16} name="bag-17" family="ArgonExtra" style={{ paddingRight: 8 }} color={argonTheme.COLORS.ICON}/>
            <Text size={16} style={styles.tabTitle}>{optionRight || 'Major'}</Text>
          </Block>
        </Button>
      </Block>
    );
  }
  
  renderHeader = () => {
    const { search, options, tabs } = this.props;
    if (search || tabs || options) {
      return (
        <Block center>
          {options ? this.renderOptions() : null}
        </Block>
      );
    }
  }
  render() {
    const { back, title, color, transparent, bgColor, iconColor, titleColor, navigation, ...props } = this.props;
    const headerStyles = [
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor }
    ];

    return (
      <Block style={headerStyles} safe>
        <NavBar
          back={true}
          title={title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: 'center' }}
          left={
            <Icon 
              name={back ? 'chevron-left' : "menu"} family="MaterialCommunityIcons"
              size={20} onPress={this.handleLeftPress} 
              color={iconColor || color}
              style={{ marginTop: 2 }}
            />
          }
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          titleStyle={[
            styles.title,
            { color: color },
            titleColor && { color: titleColor }
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 2 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: argonTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: argonTheme.COLORS.PRIMARY
  },
});

export default withNavigation(Header);
