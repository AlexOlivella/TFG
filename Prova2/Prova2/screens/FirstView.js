import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, ActivityIndicator } from 'react-native';
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

  handleLoad = ()=>{

    var { navigation } = this.props;
    var navigate = navigation.navigate;


    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        navigate("ProvaP")
        console.log("logged bruh")
      } else {
        console.log("not logged bruh")
      }
      this.setState({isLoading:false})

    }.bind(this));
  }

  render() {
    var {navigation} = this.props;
    var navigate = navigation.navigate;
    //console.log(this.props)
if(this.state.isLoading)
    {
      this.handleLoad();
      return (
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
<ActivityIndicator size ="large" color="black"/>
        </View>

    );}
  else{
    return(
      <View style={styles.container}>
      <Text style= {styles.titol}> MigrañApp </Text>
      <Button onPress ={ () => {navigate("Login")}} title= "Enter" style={styles.button}> </Button>
  </View>
    )
  }
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