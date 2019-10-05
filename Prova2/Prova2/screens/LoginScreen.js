import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import firebase from 'firebase'
import * as FirebaseAPI from '../modules/firebaseAPI';


export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
    }
  }
  CheckTextInput = () => {
    //Handler for the Submit onPress
    //Check for the Name TextInput
    if (this.state.email != '') {
      //Check for the Email TextInput
      if (this.state.password != '') {
        //alert('Success')
        return true;
      } else {
        alert('Please enter password');
      }
    } else {
      alert('Please enter email');
    }
    return false;
  };

  async signIn() {
    var { navigation } = this.props;
    var navigate = navigation.navigate;
    if (this.CheckTextInput()) {
      let response = await FirebaseAPI.signInUser(this.state.email.trim(), this.state.password)
      if (response.isError) {
        //if(response.error == 200)
          if(response.error.code=="auth/invalid-email"){
            alert("The format of email is invalid\nTry something like: example@mail.com")
          }
          if(response.error.code == "auth/user-not-found"){
            alert("This user is not in the database")
          }
          if(response.error.code == "auth/wrong-password"){
            alert("The password is incorrect")
          }
          else alert(response.error.code)

      } else {        
        navigate("ProvaP")
      }
    }
  }

  render() {
    var { navigation } = this.props;
    var navigate = navigation.navigate;
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 40 }}>Login</Text>
        <TextInput
          style={{
            height: 40,
            width: "100%",
            alignItems: 'stretch',
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 50
          }}
          onChangeText={email => this.setState({ email })}
          placeholder={"Email"}
          autoCapitalize="none"
          value={this.state.email}
        />
        <TextInput
          style={{
            height: 40,
            width: "100%",
            marginTop: 10,
            alignItems: 'stretch',
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 50
          }}
          onChangeText={(v) => this.setState({ password: v })}
          placeholder={"Password"}
          autoCapitalize="none"
          value={this.state.password}
          secureTextEntry={true} />

        <Button onPress={() => {
          this.signIn();
        }} title="Sign in" style={styles.boto}> </Button>
        <Button onPress={() => { navigate("Register") }} title="Sign up" style={styles.boto}></Button>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FBEAFF',
    padding: 10,
    paddingBottom: 10
  },
  boto: {
    width: "100%",
    marginBottom: 20,
  }
});