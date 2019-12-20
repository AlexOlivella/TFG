import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, BackHandler, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, Animated } from 'react-native';
import firebase from 'firebase'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
//import { Calendar } from 'react-native-calendars';
import * as FirebaseAPI from '../modules/firebaseAPI'
import { Header, Icon, SearchBar, List, ListItem, } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';


export default class prova extends Component {

  constructor(props) {
    super(props);
    this.state = {
      llistaMigranyes: [],
      llistaCites: [],
      loading: false,
      search: '',
      pendings: "",
      markedDays: [],
      isLoaded: true,
      tipus: "",
    }
    this.arrayHolder = [];
  }

  static navigationOptions = {
    header: null
  }
  obrirDrawer = () => {
    this.props.navigation.openDrawer();
  }

  async componentDidMount() {
    var user = firebase.auth().currentUser
    var tipus = await FirebaseAPI.comprovarTipusUsuari(user.uid)
    this.setState({ tipus: tipus })

  }
  async getMigraines(data) {
    var user = firebase.auth().currentUser
    let result = await FirebaseAPI.getMigrainesByDate(user.uid, this.state.tipus, data)
    //console.log("Migranyes calendari", result)
    this.setState({ llistaMigranyes: result, isLoaded: true })
  }
  async getCites(data) {
    var user = firebase.auth().currentUser
    let result = await FirebaseAPI.getAppointmentsByDate(user.uid, data)
    //console.log("Cites doctor: ", result)
    this.setState({ llistaCites: result })
  }

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#7BF0E6"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#7BF0E6",
          marginLeft: "14%"
        }}
      />
    );
  };

  transformaData(time) {
    if (time) {
      time = parseInt(time)
      let data = new Date(time);
      var date = data.getDate(); //Current Date
      var month = data.getMonth() + 1; //Current Month
      var year = data.getFullYear(); //Current Year
      var hour= data.getHours(); //Current Hours
      var min = data.getMinutes(); //Current Minutes
      var sec = data.getSeconds(); //Current Seconds
      if (min < 10) {
        min = '0' + min;
      }
      if (hour < 10) {
        hour = '0' + hour;
      }
      return date + '-' + month + '-' + year + ' ' + hour+ ':' + min
    }
    else return ""
  }

  afegirCita() {
    this.props.navigation.navigate("AfegirCitaPacient")
  }

  markDays(month) {

  }
  obteDades(migranya_id) {
    var user = firebase.auth().currentUser
    this.props.navigation.navigate("InfoMigranyesCalendari", { pacient: user.uid, migranya: migranya_id })
  }

  renderRightComponent = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    var carregar
    if (!this.state.isLoaded) carregar = <View><ActivityIndicator size="large"></ActivityIndicator></View>
    return (
      <View style={{flex:1}}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 20 }}>Migraines list</Text></View>
        {carregar}

        <FlatList
          data={this.state.llistaMigranyes}
          renderItem={({ item }) =>
            <TouchableOpacity>
              <ListItem containerStyle={{ backgroundColor: "#7BF0E6", borderBottomWidth: 1, borderBottomColor: 'white' }}
                title={this.transformaData(item)}
              />
            </TouchableOpacity>
          }
          ListFooterComponent={this.renderFooter}
          ItemSeparatorComponent={this.renderSeparator}

          keyExtractor={item => item}
        />
      </View>
    );
  };

  seeDetailsAppointment(data_appointment) {
    this.props.navigation.navigate("AppointmentDetails", { day: data_appointment })
  }

  render() {
    var { navigation } = this.props;
    var navigate = navigation.navigate;
    //console.log(this.props)
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
    const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
    const workout = { key: 'workout', color: 'green' };

    var carregar
    if (!this.state.isLoaded) carregar = <View><ActivityIndicator size="large"></ActivityIndicator></View>
    return (

      <View style={styles.container}>
        <Header
          style={{ width: '100%' }}
          placement="left"
          leftComponent={<Icon name='menu' onPress={() => this.obrirDrawer()} />}
          centerComponent={{ text: 'Calendar', style: { color: '#fff' } }}
          rightComponent={<Icon name='add' onPress={() => this.afegirCita()} />}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <View>

              {<Calendar
                // Enable horizontal scrolling, default = false
                //horizontal={true}
                // Enable paging on horizontal, default = false
                //pagingEnabled={true}
                // Set custom calendarWidth.
                //calendarWidth={320}
                // Initially visible month. Default = Date()
                current={new Date()}
                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                //minDate={'2012-05-10'}
                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                //maxDate={'2012-05-30'}
                // Handler which gets executed on day press. Default = undefined
                onDayPress={day => {
                  //console.log('selected day', day);
                  this.setState({ isLoaded: false })
                  this.getMigraines(day.timestamp)
                  if (this.state.tipus == "Doctor") {
                    this.getCites(day.timestamp)
                  }
                }}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={' MMMM yyyy'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={month => {
                  //console.log('month changed', month);
                }}
                // Hide month navigation arrows. Default = false
                //hideArrows={true}
                // Do not show days of other months in month page. Default = false
                //hideExtraDays={true}
                // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={true}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNasmesShort should still start from Sunday.
                firstDay={1}

                markedDates={{
                  '2019-11-15': { dots: [vacation, massage, workout], },
                  '2019-11-17': { marked: true },
                  '2019-11-16': { marked: true, dotColor: 'red', activeOpacity: 0 },
                }}
                markingType={'multi-dot'}

              />}
            </View>
            <Swipeable
              renderRightActions={this.renderRightComponent}
              >
              
              <View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 20 }}>Appointments list</Text></View>
                {carregar}

                <FlatList
                  data={this.state.llistaCites}
                  renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => this.seeDetailsAppointment(item)}>
                      <ListItem containerStyle={{ backgroundColor: "#7BF0E6", borderBottomWidth: 1, borderBottomColor: 'white' }}
                        title={this.transformaData(item)}
                      />
                    </TouchableOpacity>
                  }
                  ListFooterComponent={this.renderFooter}
                  ItemSeparatorComponent={this.renderSeparator}

                  keyExtractor={item => item}
                />
              </View>
            </Swipeable>
          </ScrollView>
        </SafeAreaView>

      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  }
});