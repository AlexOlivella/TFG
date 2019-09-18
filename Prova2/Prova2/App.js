import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import Input from './components/Input'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});


export default class App extends Component {
  render() {
    const username = "username"
    const password = "password"
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to the app!</Text>
        <Input style={flex=1, alignSelf= 'stretch'}/>
        <Input style={alignSelf= 'stretch'}></Input>
        <Button title = "Login"> </Button>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBEAFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
