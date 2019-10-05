import React, { Component } from 'react';
import { Picker, Platform, StyleSheet, Text, View, Button, TextInput, ScrollView, Alert, ToastAndroid } from 'react-native';
import DatePicker from 'react-native-datepicker'
import * as FirebaseAPI from '../modules/firebaseAPI';

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
        if(response.error.code=="auth/invalid-email"){
          alert("The format of email is invalid\nTry something like: example@mail.com")
        }
        else alert(response.error.code)
      } else {
        navigate("ProvaP")
      }
    }
  }

render() {

  //console.log(this.props)

  return (
    <View style={styles.container}>

      <Text style={styles.welcome}>Sign up</Text>
      <TextInput
        style={styles.textinput}
        onChangeText={username => this.setState({ username })}
        placeholder={"Username"}
        value={this.state.username}
      />
      <TextInput
        style={styles.textinput}
        onChangeText={(v) => this.setState({ password: v })}
        placeholder={"Password"}
        autoCapitalize="none"
        value={this.state.password}
        secureTextEntry={true} />
      <TextInput
        style={styles.textinput}
        onChangeText={(v) => this.setState({ email: v })}
        placeholder={"Email"}
        autoCapitalize="none"
        value={this.state.email}
      />

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
      <Button style={styles.boto} onPress={() => {
        //alert(this.state.username + " " + this.state.password + " " + this.state.email + " " + this.state.gender + " " + this.state.birthday)
        this.createUser();

      }} title="Sign up" > </Button>
    </View>

  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBEAFF',
    padding: 10,
    paddingBottom: 10
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBEAFF',
    padding: 10,
    paddingBottom: 10

  },
  textinput: {
    height: 40,
    marginTop: 10,
    alignItems: 'stretch',
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  boto: {
    width: "100%",
    paddingBottom: 100
  },
  daypicker: {
    height: 40,
    marginTop: 10,
    borderColor: 'gray',

  }
});