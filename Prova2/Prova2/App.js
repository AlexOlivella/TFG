import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button,SafeAreaView, TouchableOpacity, Alert, StatusBar  } from 'react-native';
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
import Impediments from './screens/Impediments'
import ZonaCap from './screens/ZonaCap'
import Causes from './screens/Causes'
import Exercici from './screens/Exercici'
import Medicaments from './screens/Medicaments'
import Menstruacio from './screens/Menstruacio'
import Simptomes from './screens/Simptomes'
import Summary from './screens/Summary'
import HoraMigranya from './screens/HoraMigranya'
import LlistaData from './screens/LlistaUsuaris'
import InfoPacient from './screens/InfoPacient'
import Pendings from './screens/Pendings'
import InfoMigranya from './screens/InfoMigranya'
import LlistaMigranyes from './screens/LlistaMigranyes'


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

const LlistaUsuaris = createStackNavigator({
  LlistaData:{screen:LlistaData},
  InfoPacient:{screen:InfoPacient},
  LlistaMigranyes:{screen:LlistaMigranyes},
  InfoMigranya:{screen:InfoMigranya},
  Pendings: {screen:Pendings},
})


const MainDrawer = createDrawerNavigator({
  MainTabs: MainTabs,
  Profile: Profile,
  Calendar: {screen:Calendar},
  Weather: {screen:Weather},
  Communication: LlistaUsuaris,
  
  //LogOut:{screen:LogOut},
  
}, 
{hideStatusBar:true,
  contentComponent:(props) => (
      <View style={{height:"90%"}}>
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
          <Text style={{marginLeft:16 , fontWeight: 'bold', fontSize: 14, marginVertical: 5}}>Logout</Text>
        </TouchableOpacity>
      </View>
),});

const Migranya = createStackNavigator({
  HoraMigranya:{screen:HoraMigranya},
  IntensitatDolor:{screen:IntensitatDolor},
  Impediments: {screen:Impediments},
  ZonaCap: {screen: ZonaCap},
  Causes:{screen:Causes},
  Exercici:{screen:Exercici},
  Medicaments: {screen:Medicaments},
  Menstruacio:{screen:Menstruacio},
  Simptomes:{screen:Simptomes},
  Summary:{screen:Summary},
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
