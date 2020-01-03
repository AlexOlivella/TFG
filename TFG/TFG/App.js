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
import WeatherScreen from './screens/WeatherScreen'
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
import LlistaTotsDoctors from './screens/LlistaTotsDoctors'
import MigranyesPropies from './screens/MigranyesPropies'
import InfoMigranyesPropies from './screens/InfoMigranyesPropies'
import InfoMigranyesCalendari from './screens/InfoMigranyesCalendari'
import AfegirCitaPacient from './screens/AfegirCitaPacient'
import AppointmentDetails from './screens/AppointmentDetails'
import EditAppointment from './screens/EditAppointment'
import ForgotPassword from './screens/ForgotPassword'


const AuthStack = createStackNavigator(
  {
    FirstView: {screen: FirstView},
    Login: {screen: LoginScreen},
    Register: {screen: Register},
    ForgotPassword:{screen:ForgotPassword}
  },
);

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
  LlistaTotsDoctors:{screen: LlistaTotsDoctors}
})

const Migraines = createStackNavigator({
  Migraines:{screen: MigranyesPropies},
  InfoMigranyesPropies:{screen: InfoMigranyesPropies},

})

const Calendari = createStackNavigator({
  Calendar:{screen:Calendar},
  InfoMigranyesCalendari:{screen:InfoMigranyesCalendari},
  AfegirCitaPacient:{screen:AfegirCitaPacient},
  AppointmentDetails: {screen: AppointmentDetails},
  EditAppointment: {screen: EditAppointment},
})
const MainDrawer = createDrawerNavigator({
  Home: {screen:HomeScreen},
  Migraines:Migraines,
  Calendar: Calendari,
  Weather: {screen:WeatherScreen},
  Communication: LlistaUsuaris,
  Profile: Profile,

  
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
