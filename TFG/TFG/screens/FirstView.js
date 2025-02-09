import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, ActivityIndicator,Image } from 'react-native';
import firebase from 'firebase'


export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true

    }
  }

  static navigationOptions = {
    //To hide the ActionBar/NavigationBar
    header: null,
  };

  handleLoad = () => {

    var { navigation } = this.props;
    var navigate = navigation.navigate;


    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        navigate("Home")
        //console.log("logged bruh")
        //console.log(user.uid)
      } else {
        //console.log("not logged bruh")
      }
      this.setState({ isLoading: false })

    }.bind(this));
  }

  render() {
    var { navigation } = this.props;
    var navigate = navigation.navigate;
    //console.log(this.props)
    if (this.state.isLoading) {
      this.handleLoad();
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
          <ActivityIndicator size="large" color="black" />
        </View>

      );
    }
    else {
      return (
        <View style={styles.container}>
          <View style={styles.seccioTitol}>
            <Text style={{ fontSize: 30 }}> Mygraine </Text>
          </View>
          <View style={{justifyContent:'center', alignItems:'center', }}>
            <Image style={{width:400,height:400}} source={require('./images/LogoMygraine.png')}></Image>
          </View>
          <View style={styles.seccioBoto}>
            <View style={{ width: "90%", paddingBottom: 10 }}>
              <Button onPress={() => { navigate("Login") }} title="Enter" > </Button>
            </View>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  seccioTitol: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  seccioBoto: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

});