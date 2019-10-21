import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Image, TextInput, BackHandler, DrawerLayoutAndroid } from 'react-native';
import Hamburger from 'react-native-hamburger';


export default class HamburgerMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active:false,
    }
  }
  
  render() {
    return (
      <View>
          <Hamburger active={this.state.active}
          type="spinArrow"
          onPress={()=>this.setState({active: !this.state.active})} />
      </View>
    );
  }
}


const styles = StyleSheet.create({

});
