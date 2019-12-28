import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, TouchableHighlight } from 'react-native';
import firebase from 'firebase'
import * as FirebaseAPI from '../modules/firebaseAPI';
import { TextField } from 'react-native-material-textfield';




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
          <Text style={{ fontSize: 30 }}>Logo</Text>
        </View>
        <View style={styles.seccioEscriure}>
          <View style={{ width: "100%" }}>
            <TextField
              label="Email"
              onChangeText={email => this.setState({ email })}
              autoCapitalize="none"
              value={this.state.email}
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
        </View>
        <View style={styles.seccioBotons}>
          <View style={{ width: "90%", paddingBottom: 10 }}>
            <Button onPress={() => {
              this.signIn();
              //console.log(this.state.contador)
            }} title="Sign in"> </Button>

          </View>
          <Text style={{ fontSize: 15 }}>  No account yet?
          <Text onPress={() => { navigate("Register") }} style={{ fontWeight: 'bold', fontSize: 15 }} > Create one</Text>
          </Text>
        </View>
      </View>

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
  seccioEscriure: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#7BF0E6',
    paddingHorizontal: 10

  },
  seccioBotons: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#7BF0E6',

  },
  boto: {
    width: "100%",
    marginBottom: 20,
  }
});