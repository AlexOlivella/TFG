import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import FirstView from './screens/FirstView'
import Register from './screens/Register'
import Calendar from './screens/CalendarScreen'
import LogOut from './screens/LogOutScreen'
import provaMenu from './screens/provaMenu'
import HamburgerMenu from './components/HamburgerMenu'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';



const MainNavigator = createStackNavigator({
  FirstView: {screen: FirstView},
  Login: {screen: LoginScreen},
  Drawer: {screen: createDrawerNavigator({
    Home:{
      screen: HomeScreen,
      navigationOptions: {
        headerTitle: 'Hoe',
      },
    },
    Calendar:{
      screen: Calendar
    }
  },
   )},
  Register: {screen: Register},
  LogOut: {screen:LogOut},
  Calendar:{screen:Calendar},
  provaMenu:{screen:provaMenu}
},
);

const App = createAppContainer(MainNavigator);

export default App;