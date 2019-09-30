import React, { Component } from 'react';
import { Picker,Platform, StyleSheet, Text, View, Button, TextInput, ScrollView, Alert } from 'react-native';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import DatePicker from 'react-native-datepicker'
import { TextField } from 'react-native-material-textfield';


export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      username2: "",
      password: "",
      birthday: "",
      gender: "",
      email: "",
    }
  }

  render() {
    var { navigation } = this.props;
    var navigate = navigation.navigate;
    //console.log(this.props)

    return (
      <ScrollView style={styles.container}>
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
          value={this.state.password}
          secureTextEntry={true} />
        <TextInput
          style={styles.textinput}
          onChangeText={(v) => this.setState({ email: v })}
          placeholder={"Email"}
          value={this.state.email}
        />

        <Picker
          selectedValue={this.state.gender}
          placeholder = "Gender"
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
          showIcon = {false}
          customStyles={{
            dateInput:{ 
              width:"100%"
          }
          }
          
          }

          onDateChange={date => { this.setState({ birthday: date }) }}
        />
        <Button style={styles.boto} onPress={() => {
          navigate("ProvaP");
          alert(this.state.username + " " + this.state.password + " " + this.state.email + " " + this.state.gender + " " + this.state.birthday)
        }} title="Sign up" > </Button>
      </ScrollView>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
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
    width:"100%",
    paddingBottom: 100
  },
  daypicker: {
    height: 40,
    marginTop: 10,
    borderColor: 'gray',

  }
});