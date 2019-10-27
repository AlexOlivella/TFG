import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button,SafeAreaView, TouchableOpacity, Alert  } from 'react-native';
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import FirstView from './screens/FirstView'
import Register from './screens/Register'
import Calendar from './screens/CalendarScreen'
import HamburgerMenu from './components/HamburgerMenu'
import { createAppContainer, createSwitchNavigator,  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import Weather from './screens/Weather'
import MyProfile from './screens/MyProfile'
import firebase from 'firebase'


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
  //LogOut:{screen:LogOut},
  
}, 
{contentComponent:(props) => (
  <View style={{flex:1}}>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...props} />
        <TouchableOpacity onPress={()=>
          Alert.alert(
            'Log out',
            'Do you want to Log out?',
            [
              {text: 'Cancel', onPress: () => {return null}},
              {text: 'Confirm', onPress: () => {
                firebase.auth().signOut().then(function () {
                  // Sign-out successful.
                  props.navigation.navigate('Login')

              }).catch(function (error) {
                  // An error happened.
              });
                
              }},
            ],
            { cancelable: false }
          )  
        }>
          <Text style={{marginLeft:16 , fontWeight: 'bold', fontSize: 15, marginVertical: 5}}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
  </View>
),});


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
