import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, TouchableHighlight, Image } from 'react-native';
import firebase from 'firebase'
import * as FirebaseAPI from '../modules/firebaseAPI';
import { TextField } from 'react-native-material-textfield';
import { Icon } from 'react-native-elements'
import PasswordInputText from 'react-native-hide-show-password-input';




export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
      contador: 0,
    }
  }


  static navigationOptions = {
    //To hide the ActionBar/NavigationBar
    header: null,
  };
  CheckTextInput = (email, password) => {
    //Handler for the Submit onPress
    //Check for the Name TextInput
    if (email != '') {
      //Check for the Email TextInput
      if (password != '') {
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


  async signInA(email, password) {
    var { navigation } = this.props;
    var navigate = navigation.navigate;
    if (this.CheckTextInput(email, password)) {
      let response = await FirebaseAPI.signInUser(email.trim(), password)
      if (response.isError) {
        //if(response.error == 200)
        if (response.error.code == "auth/invalid-email") {
          alert("The format of email is invalid\nTry something like: example@mail.com")
        }
        if (response.error.code == "auth/user-not-found") {
          alert("This user is not in the database")
        }
        if (response.error.code == "auth/wrong-password") {
          alert("The password is incorrect")
        }
        else alert(response.error.code)

      } else {
        navigate("Home")
        //this.props.navigation.navigate('MyProfile', {uid_user: user.uid})
        // //console.log(user)
      }
    }
  }
  signIn() {
    this.signInA(this.state.email, this.state.password)
  }
  render() {
    var { navigation } = this.props;
    var navigate = navigation.navigate;
    return (
      <View style={styles.container}>
        <View style={styles.seccioTitol}>
          <Image style={{ width: 200, height: 200 }} source={require('./images/LogoMygraine.png')}></Image>
        </View>
        <View style={styles.seccioEscriure}>
          <View style={{}}>

            <TextField
              label="Email"
              onChangeText={email => this.setState({ email })}
              autoCapitalize="none"
              value={this.state.email}
              style={{ width: '80%' }}
            />
          </View>
          <View style={{}}>
            <PasswordInputText
              getRef={input => this.input = input}
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
            />
          </View>
        </View>
        <View style={{ flex: 2, justifyContent: 'center', paddingHorizontal: 10 }}>
          <Button onPress={() => {
            this.signIn();
            //console.log(this.state.contador)
          }} title="Sign in"

          > </Button>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', }}>
          <Text style={{ fontSize: 16, color: 'orange' }} onPress={() => { navigate("Register") }}>No account yet? Create one</Text>
          <Text style={{ fontSize: 16, color: 'blue' }} onPress={() => { navigate("ForgotPassword") }}>Forgot Password?</Text>
        </View>
        <View style={{flex:1}}></View>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  seccioTitol: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    

  },
  seccioEscriure: {
    flex: 2,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },

});