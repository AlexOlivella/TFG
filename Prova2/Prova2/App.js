import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import FirstView from './screens/FirstView'
import Register from './screens/Register'
import Calendar from './screens/CalendarScreen'
import LogOut from './screens/LogOutScreen'
import HamburgerMenu from './components/HamburgerMenu'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Weather from './screens/Weather'
import MyProfile from './screens/MyProfile'


const AuthStack = createStackNavigator(
  {
    FirstView: {
      screen: FirstView
    },
    Login: {
      screen: LoginScreen
    },
    Register: {
      screen: Register
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      header: null,
    })
  }
);

const MainTabs = createMaterialBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
    },
  },
  Weather: {
    screen: Weather,
    navigationOptions: {
      tabBarLabel: 'Weather',
    },
  },
  Calendar: {
    screen: Calendar,
    navigationOptions: {
      tabBarLabel: 'Calendar',
    },
  },
});

const MainDrawer = createDrawerNavigator({
  MainTabs: MainTabs,
  MyProfile:{screen:MyProfile},
  LogOut:{screen:LogOut},
  
});


const App = createSwitchNavigator(
  {
    Auth: {
      screen: AuthStack
    },

    App: {
      screen: MainDrawer
    },
  }
)

export default createAppContainer(App);
