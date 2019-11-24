import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, BackHandler } from 'react-native';
import firebase from 'firebase'
import CalendarPicker from 'react-native-calendar-picker';
//import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
//import { Calendar } from 'react-native-calendars';

import { Header, Icon } from 'react-native-elements'


export default class prova extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    }
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#FBEAFF',
      borderBottomWidth: 0,

    }
  }
  obrirDrawer = () => {
		this.props.navigation.openDrawer();
	}


  render() {
    var { navigation } = this.props;
    var navigate = navigation.navigate;
    //console.log(this.props)
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (

      <View style={styles.container}>
        <Header
						style={{width:'100%'}}
						placement="left"
						leftComponent={<Icon name='menu' onPress={ ()=> this.obrirDrawer()} />}
						centerComponent={{ text: 'Calendar', style: { color: '#fff' } }}
					/>
        <View>
        {/*<Calendar
          // Initially visible month. Default = Date()
          current={'2012-03-01'}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={'2012-05-10'}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={'2012-05-30'}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={day => {
            //console.log('selected day', day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'yyyy MM'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={month => {
            //console.log('month changed', month);
          }}
          // Hide month navigation arrows. Default = false
          hideArrows={true}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={true}
          // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
        />*/}
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
   
    backgroundColor: '#7BF0E6',
  }
});