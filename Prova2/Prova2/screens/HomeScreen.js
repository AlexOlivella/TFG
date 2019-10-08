import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, BackHandler } from 'react-native';
import firebase from 'firebase'





export default class prova extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    BackHandler.exitApp(); // works best when the goBack is async
    return true;
  }

  render() {
    var {navigation} = this.props;
    var navigate = navigation.navigate;
    //console.log(this.props)

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to the prova!</Text>
        <Button title="log out" onPress ={()=>{
          firebase.auth().signOut().then(function() {
            // Sign-out successful.
            navigate("Login")
          }).catch(function(error) {
            // An error happened.
          });
        }}></Button>
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
  }
});