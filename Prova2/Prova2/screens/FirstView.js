import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class LoginScreen extends Component {

  render() {
    var {navigation} = this.props;
    var navigate = navigation.navigate;
    //console.log(this.props)

    return (
        <View style={styles.container}>
            <Text style= {styles.titol}> MigrañApp </Text>
            <Button onPress ={ () => {navigate("Login")}} title= "Enter" style={styles.button}> </Button>
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
  titol: {
    alignSelf: "center",
    fontSize: 30,
    paddingBottom: 100
  },
  button: {
    width: "50%"
  }
});