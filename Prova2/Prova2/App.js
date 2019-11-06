import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button,SafeAreaView, TouchableOpacity, Alert  } from 'react-native';
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import FirstView from './screens/FirstView'
import Register from './screens/Register'
import Calendar from './screens/CalendarScreen'
import { createAppContainer, createSwitchNavigator,  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import Weather from './screens/Weather'
import MyProfile from './screens/MyProfile'
import firebase from 'firebase'
import UpdateEmailPass from './screens/UpdateEmailPass'
import IntensitatDolor from './screens/IntensitatDolor'
import EstatAnim from './screens/EstatAnim'
import ZonaCap from './screens/ZonaCap'
import Causes from './screens/Causes'
import Exercici from './screens/Exercici'
import Medicament from './screens/Medicaments'
import Menstruacio from './screens/Menstruacio'
import Simptomes from './screens/Simptomes'

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
  
  Weather: {
    screen: Weather,
    navigationOptions: {
      tabBarLabel: 'Weather',
    },
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
    },
  },
  Calendar: {
    screen: Calendar,
    navigationOptions: {
      tabBarLabel: 'Calendar',
    },
  },
});

const Profile = createStackNavigator({
  MyProfile:{screen: MyProfile},
  UpdateEmailPass:{screen: UpdateEmailPass}
})

const MainDrawer = createDrawerNavigator({
  MainTabs: MainTabs,
  Profile: Profile
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

const Migranya = createStackNavigator({
  IntensitatDolor:{screen:IntensitatDolor},
  EstatAnim: {screen:EstatAnim},
  ZonaCap: {screen: ZonaCap},
  Causes:{screen:Causes},
  Exercici:{screen:Exercici},
  Medicament: {screen:Medicament},
  Menstruacio:{screen:Menstruacio},
  Simptomes:{screen:Simptomes},
})
const App = createSwitchNavigator(
  {
    Auth: {
      screen: AuthStack
    },
    Migranya:{
      screen: Migranya
    },
    App: {
      screen: MainDrawer
    },
  }
)

export default createAppContainer(App);
