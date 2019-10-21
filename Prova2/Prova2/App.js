import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import FirstView from './screens/FirstView'
import Register from './screens/Register'
import Calendar from './screens/CalendarScreen'
import LogOut from './screens/LogOutScreen'
import provaMenu from './screens/provaMenu'

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';


const MainNavigator = createStackNavigator({
  FirstView: {screen: FirstView},
  Login: {screen: LoginScreen},
  Home: {screen: HomeScreen},
  Register: {screen: Register},
  LogOut: {screen:LogOut},
  Calendar:{screen:Calendar},
  provaMenu:{screen:provaMenu}
});

const App = createAppContainer(MainNavigator);

export default App;