import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, BackHandler } from 'react-native';
import firebase from 'firebase'
import CalendarPicker from 'react-native-calendar-picker';




export default class prova extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    }
    this.onDateChange = this.onDateChange.bind(this);
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#FBEAFF',
      borderBottomWidth: 0,

    }
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  render() {
    var { navigation } = this.props;
    var navigate = navigation.navigate;
    ////console.log(this.props)
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (

      <View style={styles.container}>
          <View>
          <CalendarPicker
            onDateChange={this.onDateChange}
          />
        </View>
        <View>
          <Text>SELECTED DATE:{startDate}</Text>
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
    backgroundColor: '#7BF0E6',
  }
});