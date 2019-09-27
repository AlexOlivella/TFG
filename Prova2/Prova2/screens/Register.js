import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, ScrollView, Alert } from 'react-native';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import DatePicker from 'react-native-datepicker'


export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      birthday: "",
      gender: "",
      email:"",
    }  
  }

  render() {
    var {navigation} = this.props;
    var navigate = navigation.navigate;
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
            value={this.state.password}
            secureTextEntry={true} />
        <TextInput
            style={styles.textinput}
            onChangeText={(v) => this.setState({ email: v })}
            placeholder={"Email"}
            value={this.state.email}
        />
        <MenuProvider style={styles.textinput} value={this.state.gender}>
            <Menu onSelect={value => this.setState({gender: value})}>
                <MenuTrigger>
                    <Text>Select gender</Text>
                </MenuTrigger >
                <MenuOptions>
                    <MenuOption value={"Male"}>
                    <Text >Male</Text>
                    </MenuOption>
                    <MenuOption value={"Female"}>
                    <Text >Female</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </MenuProvider>   
        <DatePicker
            value={this.state.birthday}
            style={styles.datepicker}
            mode="date"
            placeholder="Select date of birth"
            format="YYYY-MM-DD"
            minDate="1919-01-01"
            maxDate="2009-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
            dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
            }}
            onDateChange={date => {this.setState({birthday: date})}}
        />
        <Button style={styles.boto} onPress={() => { 
          navigate("ProvaP"); 
          alert(this.state.username + " " + this.state.password + " " + this.state.email + " " + this.state.gender + " " + this.state.birthday)
           }} title="Sign up" > </Button>
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
  textinput:{
    height: 40,
    width: "40%",
    marginTop: 10,
    alignItems: 'stretch',
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  boto :{
      width: "40%"
  },
  daypicker:{
    height: 40,
    width: "40%",
    marginTop: 10,
    borderColor: 'gray',

  }
});