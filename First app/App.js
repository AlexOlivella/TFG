import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import LoginScreen from './screens/LoginScreen'
import Prova from './screens/prova'

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  Login: {screen: LoginScreen},
  ProvaP: {screen: Prova}
});

const App = createAppContainer(MainNavigator);

export default App;