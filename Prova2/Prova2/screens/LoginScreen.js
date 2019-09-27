import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});



export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  render() {
    var {navigation} = this.props;
    var navigate = navigation.navigate;
    //console.log(this.props)

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to the app!</Text>
        <TextInput
          style={{
            height: 40,
            width: "40%",
            alignItems: 'stretch',
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 50
          }}
          onChangeText={username => this.setState({ username })}
          placeholder={"Username"}
          value={this.state.username}
        />
        <TextInput
          style={{
            height: 40,
            width: "40%",
            marginTop: 10,
            alignItems: 'stretch',
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 50
          }}
          onChangeText={(v) => this.setState({ password: v })}
          placeholder={"Password"}
          value={this.state.password}
          secureTextEntry={true} />

        <Button onPress={() => {navigate("ProvaP")}} title="Sign in" stlye={styles.boto}> </Button>
        <Button onPress={() => {navigate("Register")}} title = "Sign up" stlye={styles.boto}></Button>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBEAFF',
    
  },
  boto: {
    width: "50%",
    marginBottom: 20,
  }
});