import React, { Component } from 'react';
import { Picker, Platform, StyleSheet, Text, View, Button, TextInput, ScrollView, Alert, ToastAndroid } from 'react-native';
import DatePicker from 'react-native-datepicker'
import * as FirebaseAPI from '../modules/firebaseAPI';
import { TextField } from 'react-native-material-textfield';


export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      birthday: "",
      gender: "",
      email: "",

    }

  };


  CheckTextInput = () => {
    //Handler for the Submit onPress
    if (this.state.username != '') {
      //Check for the Name TextInput
      if (this.state.password != '') {
        //Check for the Email TextInput
        if (this.state.email != '') {
          if (this.state.gender != '' || this.state.gender == "select") {
            if (this.state.birthday != '') {
              //alert('Success')
              return true;
            } else {
              alert('Please enter a birthday');
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
        this.state.username,
        this.state.password,
        this.state.email,
        this.state.gender,
        this.state.birthday);
      if (response.isError) {
        //if(response.error == 200)
        if (response.error.code == "auth/invalid-email") {
          alert("The format of email is invalid\nTry something like: example@mail.com")
        }
        else alert(response.error.code)
      } else {
        navigate("Home")
      }
    }
  }

  render() {

    //console.log(this.props)

    return (
      <View style={styles.container}>
        <View style={styles.seccioTitol}>
          <Text style={{ fontSize: 40 }}>Sign up</Text>
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

          <Picker
            selectedValue={this.state.gender}
            placeholder="Gender"
            style={{ height: 40 }}
            onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })}>
            <Picker.Item label="Select gender" value="select" />
            <Picker.Item label="Male" value="m" />
            <Picker.Item label="Female" value="f" />
            <Picker.Item label="Other" value="o" />

          </Picker>

          <View style={{ width: "100%" }}>
            <DatePicker
              date={this.state.birthday}
              style={styles.datepicker}
              mode="date"
              placeholder="Select date of birth"
              format="YYYY-MM-DD"
              minDate="1919-01-01"
              maxDate="2009-12-31"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateInput: {
                  width: "100%"
                }
              }

              }

              onDateChange={date => { this.setState({ birthday: date }) }}
            />
          </View>
        </View>
        <View style={styles.seccioBotons}>
          <View style={{ width: "90%" }} >
            <Button onPress={() => {
              //alert(this.state.username + " " + this.state.password + " " + this.state.email + " " + this.state.gender + " " + this.state.birthday)
              this.createUser();

            }} title="Sign up" > </Button>
          </View>
        </View>
      </View >

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBEAFF',
  },
  seccioTitol: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBEAFF',
  },
  textinput: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FBEAFF',
    paddingHorizontal: 10,
  },

  seccioBotons: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FBEAFF',
    marginTop: 10,

  },
  datepicker: {
    height: 40,
    marginTop: 10,
    borderColor: 'gray',
  }
});