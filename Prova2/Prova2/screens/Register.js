import React, { Component } from 'react';
import { Picker, Platform, StyleSheet, Text, View, Button, TextInput, ScrollView, Alert, ToastAndroid, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker'
import * as FirebaseAPI from '../modules/firebaseAPI';
import { TextField } from 'react-native-material-textfield';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Dropdown } from 'react-native-material-dropdown';

export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      birthday: "",
      gender: "",
      type: "",
      email: "",
      isDateTimePickerVisible: false,
    }

  };
  static navigationOptions = {
    header: null,
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = (date) => {
    //console.log("A date inicial has been picked: ", date);
    this.setState({ birthday: date.getTime() })
    this.hideDateTimePicker();

  };

  CheckTextInput = () => {
    //Handler for the Submit onPress
    if (this.state.username != '') {
      //Check for the Name TextInput
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
      alert('Please enter username');
    }
    return false;
  };
  async createUser() {
    var { navigation } = this.props;
    var navigate = navigation.navigate;
    if (this.CheckTextInput()) {
      let response = await FirebaseAPI.createUser(
        this.state.username.trim(),
        this.state.password,
        this.state.email.trim(),
        this.state.gender,
        this.state.type,
        this.state.birthday);
      console.log("birthday", this.state.birthday)
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
        ToastAndroid.show("Welcome to the MigranyApp", ToastAndroid.SHORT)
        navigate("Home")
      }
    }
  }
  transformaData(time) {
    if (time) {
        let data = new Date(time);
        var date = data.getDate(); //Current Date
        var month = data.getMonth() + 1; //Current Month
        var year = data.getFullYear() ; //Current Year
        return date + '-' + month + '-' + year 
    }
    else return ""
}
  render() {

    ////console.log(this.props)

    return (
      <View style={styles.container}>
        <View style={styles.seccioTitol}>
          <Text style={{ fontSize: 30 }}>Sign up</Text>
        </View>
        <View style={styles.textinput}>
          <View style={{ width: "100%" }}>
            <TextField
              label="Username"
              onChangeText={username => this.setState({ username })}
              value={this.state.username}
            />
          </View>

          <View style={{ width: "100%" }}>
            <TextField
              label="Password"
              onChangeText={(v) => this.setState({ password: v })}
              autoCapitalize="none"
              value={this.state.password}
              secureTextEntry={true} />
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
          <View style={{ width: "100%" }}>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
              mode='date'
            />                    

            <TouchableOpacity onPress={this.showDateTimePicker} >
              <Text >Select birthday {this.transformaData(this.state.birthday)}</Text>
            </TouchableOpacity>
            {/*<DatePicker
              date={this.state.birthday}
              mode="date"
              placeholder="Select date of birth"
              format="MM-DD-YYYY"
              minDate="01-01-1919"
              maxDate="12-31-2009"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              style={{ width: "100%" }}
              customStyles={{
                dateText: {
                  color: "rgba(0, 0, 0, .87)",
                  fontSize: 16,
                  alignItems: 'flex-start',
                  width: "100%"
                },
                dateInput: {
                  marginTop: 20,
                  borderWidth: 0,
                  fontSize: 18,
                  color: "rgba(0, 0, 0, .87)",
                  borderBottomWidth: 0.5,
                  alignItems: 'flex-start'
                }
              }}
              onDateChange={date => { this.setState({ birthday: date }) }}
            />*/}
          </View>
        </View>
        <View style={styles.seccioBotons}>
          <View style={{ width: "90%" }} >
            <Button onPress={() => {
              //alert(/*this.state.username + " " + this.state.password + " " + this.state.email + " " + this.state.gender + " " + this.state.birthday*/)
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
    backgroundColor: '#7BF0E6',
  },
  seccioTitol: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7BF0E6',
  },
  textinput: {
    flex: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#7BF0E6',
    paddingHorizontal: 10,
  },

  seccioBotons: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#7BF0E6',
    marginTop: 10,

  },

});