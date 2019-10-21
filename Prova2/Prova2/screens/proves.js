import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Image, TextInput, BackHandler, DrawerLayoutAndroid } from 'react-native';
import firebase from 'firebase'
import CalendarPicker from 'react-native-calendar-picker';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { StatusBar } from 'react-native';
import provaMenu from './provaMenu'
import HamburgerMenu from '../components/HamburgerMenu';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class prova extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    }
  }

  static navigationOptions = {
    headerLeft: null,
    header: null,
    headerStyle: {
      backgroundColor: '#FBEAFF',
      borderBottomWidth: 0,

    }
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    StatusBar.setHidden(true);
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    BackHandler.exitApp(); // works best when the goBack is async
    return true;
  }

  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  onHamburgerClick() {
    this.props.toggleDrawer();
  }
  render() {
    var { navigation } = this.props;
    var navigate = navigation.navigate;
    //console.log(this.props)
    return (

      <View style={styles.container}>
        <View>
          <View>
            <TouchableOpacity onPress={this.onHamburgerClick}>
              <Image
                style={styles.menuStyle}
                //source={menu}
              ></Image>
            </TouchableOpacity>
          </View>
          <Text
            style={styles.textStyle}>
            {this.props.title}
          </Text>
          <View>
            <Image style={styles.cartStyle}
              //source={cart}
            >
            </Image>
          </View>
        </View>
        <View >
          <View>
            <Button title="Calendar" onPress={() => { navigate("Calendar") }}> </Button>
          </View>
          <View>
            <Button title="LogOut" onPress={() => { navigate("LogOut") }}> </Button>
          </View>
          <View>
            <Button title="menu" onPress={() => { navigate("provaMenu") }}></Button>
          </View>
        </View>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2DB6D2',
  },
  seccioBotons: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#2DB6D2',

  },
});