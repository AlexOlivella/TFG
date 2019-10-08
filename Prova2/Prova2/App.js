import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import FirstView from './screens/FirstView'
import Register from './screens/Register'

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';


const MainNavigator = createStackNavigator({
  FirstView: {screen: FirstView},
  Login: {screen: LoginScreen},
  Home: {screen: HomeScreen},
  Register: {screen: Register}
});

const App = createAppContainer(MainNavigator);

export default App;