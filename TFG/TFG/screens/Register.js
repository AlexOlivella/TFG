import React, { Component } from 'react';
import { Picker, Platform, StyleSheet, Text, View, Button, TextInput, ScrollView, Alert, ToastAndroid, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import DatePicker from 'react-native-datepicker'
import * as FirebaseAPI from '../modules/firebaseAPI';
import { TextField } from 'react-native-material-textfield';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Dropdown } from 'react-native-material-dropdown';
import PasswordInputText from 'react-native-hide-show-password-input';
import Constants from 'expo-constants';

export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      password: "",
      birthday: "",
      gender: "",
      type: "",
      email: "",
      isDateTimePickerVisible: false,
      photo: "",
    }

  };
  static navigationOptions = {
    title: 'Sign up',
    headerStyle: {
      backgroundColor: '#2089dc'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 20,
    },
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = (date) => {
    //console.log("A date inicial has been picked: ", date);
    this.setState({ birthday: date.getTime(), dateSelected: true })
    this.hideDateTimePicker();

  };

  CheckTextInput = () => {
    //Handler for the Submit onPress
    if (this.state.firstName != '') {
      //Check for the Name TextInput
      if (this.state.firstName != '') {
        if (this.state.password != '') {
          //Check for the Email TextInput
          if (this.state.email != '') {
            if (this.state.gender != '') {
              if (this.state.type != '') {
                if (this.state.birthday != '') {
                  //alert('Success')
                  return true;
                } else {
                  alert('Please enter a birthday');
                }
              }
              else {
                alert("Please enter a type of user")
              }
            } else {
              alert('Please enter a gender');
            }
          } else {
            alert('Please enter email');
          }
        } else {
          alert('Please enter password');
        }
      } else {
        alert('Please enter last name');
      }
    } else {
      alert('Please enter first name');
    }
    return false;
  };
  async createUser() {
    var { navigation } = this.props;
    var navigate = navigation.navigate;
    if (this.CheckTextInput()) {
      let response = await FirebaseAPI.createUser(
        this.state.firstName.trim(),
        this.state.lastName.trim(),
        this.state.password,
        this.state.email.trim(),
        this.state.gender,
        this.state.type,
        this.state.birthday);
      //console.log("birthday", this.state.birthday)
      if (response.isError) {
        //if(response.error == 200)
        if (response.error.code == "auth/invalid-email") {
          alert("The format of email is invalid\nTry something like: example@mail.com")
        }
        else if (response.error.code == "auth/weak-password") {
          alert("Your password is too short, it must have 6 characters at least")
        }
        else alert(response.error.code)
      } else {
        ToastAndroid.show("Welcome to the Mygraine", ToastAndroid.SHORT)
        navigate("Home")
      }
    }
  }
  transformaData(time) {
    if (time) {
      let data = new Date(time);
      var date = data.getDate(); //Current Date
      var month = data.getMonth() + 1; //Current Month
      var year = data.getFullYear(); //Current Year
      return date + '-' + month + '-' + year
    }
    else return ""
  }



  render() {

    //console.log(this.props)

    return (
      <View style={styles.container}>


        <View style={styles.textinput}>
          <View style={{ width: "100%" }}>
            <TextField
              label="First name"
              onChangeText={firstName => this.setState({ firstName })}
              value={this.state.firstName}
            />
          </View>
          <View style={{ width: "100%" }}>
            <TextField
              label="Last name"
              onChangeText={lastName => this.setState({ lastName })}
              value={this.state.lastName}
            />
          </View>

          <View style={{ width: "100%" }}>
            <PasswordInputText
              getRef={input => this.input = input}
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
            />
          </View>

          <View style={{ width: "100%" }}>
            <TextField
              label="Email"
              onChangeText={(v) => this.setState({ email: v })}
              autoCapitalize="none"
              value={this.state.email}
            />
          </View>

          <View style={{ width: "100%" }}>
            <Dropdown
              label='Select gender'
              data={[{
                value: "Male"
              }, {
                value: "Female"
              }, {
                value: "Other"
              }]}
              value={this.state.gender}
              onChangeText={(itemValue) => this.setState({ gender: itemValue })}
            />
          </View>
          <View style={{ width: "100%" }}>
            <Dropdown
              label='Type of user'
              data={[{
                value: "Doctor"
              }, {
                value: "Pacient"
              }]}
              value={this.state.type}
              onChangeText={(itemValue) => this.setState({ type: itemValue })}
            />
          </View>
          <View style={{ width: "100%", paddingTop: 20 }}>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
              mode='date'
            />

            <TouchableOpacity onPress={this.showDateTimePicker} >
              {!this.state.dateSelected && <Text style={{ fontSize: 16, color: '#B9ACAC', borderBottomColor: '#D3D0D0', borderBottomWidth: 1 }}>Select date of birth</Text>}

              {this.state.dateSelected && <View>
                <Text style={{ fontSize: 12, color: '#0091EA' }}>Select date of birth</Text>
                <Text style={{ fontSize: 16, borderBottomColor: '#D3D0D0', borderBottomWidth: 1, }}>{this.transformaData(this.state.birthday)}</Text>
              </View>}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.seccioBotons}>
          <View style={{ width: "90%" }} >
            <Button onPress={() => {
              this.createUser();

            }} title="Sign up"> </Button>
          </View>
        </View>

      </View >

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  textinput: {
    flex: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  seccioBotons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },

});