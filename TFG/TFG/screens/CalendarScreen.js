import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, BackHandler, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, Animated } from 'react-native';
import firebase from 'firebase'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
//import { Calendar } from 'react-native-calendars';
import * as FirebaseAPI from '../modules/firebaseAPI'
import { Header, Icon, SearchBar, List, ListItem, } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


export default class prova extends Component {

  constructor(props) {
    super(props);
    this.state = {
      llistaMigranyes: [],
      llistaCites: [],
      loading: false,
      search: '',
      pendings: "",
      markedDays: null,
      isLoaded: true,
      tipus: "",
      value: "",
      mesEnsenyar: "",

    }
    this.arrayHolder = [];
    this.colorsDots = [
      '#7cb1b9',
      '#96b897',
      '#b3bd74',
      '#d0c255',
      '#f2c93d',
      '#e7a93c',
      '#de8d3e',
      '#d6713b',
      '#d3573d',
      '#cf4140',
      '#B93B69',
      'black'
    ]
  }

  static navigationOptions = {
    header: null
  }
  obrirDrawer = () => {
    this.props.navigation.openDrawer();
  }

  async componentDidMount() {
    this.markDays()
    var user = firebase.auth().currentUser
    var tipus = await FirebaseAPI.comprovarTipusUsuari(user.uid)
    //this.getDades(new Date())
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
    let result = await FirebaseAPI.getAppointmentsByDate(user.uid, data, this.state.tipus)
    //console.log("Cites doctor: ", result)
    this.setState({ llistaCites: result })
  }
  transformaData(time) {
    if (time) {
      time = parseInt(time)
      let data = new Date(time);
      var date = data.getDate(); //Current Date
      var month = data.getMonth() + 1; //Current Month
      var year = data.getFullYear(); //Current Year
      var hour = data.getHours(); //Current Hours
      var min = data.getMinutes(); //Current Minutes
      var sec = data.getSeconds(); //Current Seconds
      if (min < 10) {
        min = '0' + min;
      }
      if (hour < 10) {
        hour = '0' + hour;
      }
      if (date < 10) {
        date = '0' + date;
      }
      if (month < 10) {
        month = '0' + month;
      }
      return date + '-' + month + '-' + year + ' ' + hour + ':' + min
    }
    else return ""
  }
  transformaDataEndIni(time) {
    if (time) {
      time = parseInt(time)
      let data = new Date(time);
      var hour = data.getHours(); //Current Hours
      var min = data.getMinutes(); //Current Minutes
      if (min < 10) {
        min = '0' + min;
      }
      if (hour < 10) {
        hour = '0' + hour;
      }
      return hour + ':' + min
    }
    else return ""
  }

  afegirCita() {
    this.props.navigation.navigate("AfegirCitaPacient", { refresh: () => this.refresh() })
  }

  creaMarked(llista) {
    /*var obj = llista.reduce((c, v) => Object.assign(c, { [this.transformMarkedDates(v.data)]: { marked: true, dotColor: this.colorsDots[parseInt(v.intensitat)] } }), {});
    console.log(obj)
    this.setState({ markedDays: obj });*/
    /*
        var element = {};
    
        for(var i =0;i<this.state.array.length;i++){
            if((Object.keys(element)).indexOf(this.state.array[i].date) > -1){
              for(var j = 0;j<Object.keys(element).length;j++){
                if(this.state.array[i].start_date === Object.keys(element)[j]){
                  var a ={key:this.state.array[i].id,color:'red'}
                  element[this.state.array[i].date].dots.push(a);
                }
              }
            }else{
              var a = {dots:[{key:this.state.array[i].id,color:'red'}]}
              element[this.state.array[i].date+''] = a;
            }
        }
    */
    var element = {};
    for (var i = 0; i < llista.length; i++) {
      //console.log("llista[i].data", llista[i].data)
      //console.log("(Object.keys(element)).indexOf(llista[i].data)", (Object.keys(element)).indexOf(llista[i].data))
      if ((Object.keys(element)).indexOf(this.transformMarkedDates(llista[i].data)) > -1) {
        // console.log("Aqui entro 1", (Object.keys(element)).indexOf(llista[i].data))
        for (var j = 0; j < Object.keys(element).length; j++) {
          if (this.transformMarkedDates(llista[i].data) === Object.keys(element)[j]) {
            var a = { key: llista[i].key, color: this.colorsDots[parseInt(llista[i].intensitat)] }
            element[this.transformMarkedDates(llista[i].data)].dots.push(a);
          }
        }
      } else {
        var a = { dots: [{ key: llista[i].key, color: this.colorsDots[parseInt(llista[i].intensitat)] }] }
        element[this.transformMarkedDates(llista[i].data) + ''] = a;
      }
    }
    //console.log("element", element)
    this.setState({ markedDays: element });
  }
  async markDays() {
    var user = firebase.auth().currentUser
    var tipusUser = await FirebaseAPI.comprovarTipusUsuari(user.uid)
    let result = await FirebaseAPI.getMarkedDays(user.uid, tipusUser)
    //console.log("migranyes + intensitat", result)
    this.creaMarked(result)

    /*
        {
          '2019-11-15': { dots: [{ key: 'vacation', color: 'red', selectedDotColor: 'blue' }, massage, workout], },
          '2019-11-17': { marked: true },
          '2019-11-16': { marked: true, dotColor: 'red', activeOpacity: 0 },
        }
    "1575552185400":{"dots": [{"color": "#B93B69","key": "1575552185400",},],
  },
        const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
        const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
        const workout = { key: 'workout', color: 'green' };
    */

    //resultat final
    //this.setState({ markedDays: resultatFinal })
    //console.log("resuultatFinal", this.state.markedDays)
  }
  getDades(day) {
    this.getMigraines(day)
    this.getCites(day)
  }
  transformMarkedDates(time) {
    if (time) {
      time = parseInt(time)
      let data = new Date(time);
      var month = (data.getMonth() + 1); //Current Month
      const year = data.getFullYear(); //Current Year
      var day = data.getDate();
      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day
      return year + "-" + month + "-" + day
    }
    else return ""
  }
  obteDades(migranya_id) {
    var user = firebase.auth().currentUser
    this.props.navigation.navigate("InfoMigranyesCalendari", { pacient: user.uid, migranya: migranya_id })
  }

  seeDetailsAppointment(data_appointment) {
    this.props.navigation.navigate("AppointmentDetails", { day: data_appointment, refresh: () => this.refresh() })
  }

  seeDetailsMigraine(migranya_id) {
    var user = firebase.auth().currentUser
    this.props.navigation.navigate("InfoMigranyesPropies", { pacient: user.uid, migranya: migranya_id })
  }

  refresh() {
    this.markDays()
  }
  render() {
    var { navigation } = this.props;
    var navigate = navigation.navigate;
    //console.log(this.props)
    var radio_props = [
      { label: 'Migraines', value: 0 },
      { label: 'Appointments', value: 1 },

    ];
    var carregar
    if (!this.state.isLoaded) carregar = <View><ActivityIndicator size="large"></ActivityIndicator></View>
    var tipusView
    var titolView
    var header
    if (this.state.value == 0) {
      titolView = <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 20 }}>Migraines list</Text></View>
      tipusView =
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>

              {carregar}

              <FlatList
                data={this.state.llistaMigranyes}
                renderItem={({ item }) =>
                  <TouchableOpacity onPress={() => this.seeDetailsMigraine(item.data)}>
                    <ListItem containerStyle={{ backgroundColor: this.colorsDots[parseInt(item.intensitat)], borderBottomWidth: 1, borderBottomColor: 'white', }}
                      //{...console.log("dataEndItem", this.transformaDataEndIni(item.dataEnd))}
                      title={this.transformaDataEndIni(item.data) + " to " + this.transformaDataEndIni(item.dataEnd)}
                    />
                  </TouchableOpacity>
                }


                keyExtractor={item => item}
              />
            </View>
          </ScrollView>
        </SafeAreaView >
    }
    else if (this.state.value == 1) {
      titolView = <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 20 }}>Appointments list</Text></View>
      tipusView =
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>

            {carregar}

            <FlatList
              data={this.state.llistaCites}
              renderItem={({ item }) =>
                <TouchableOpacity onPress={() => this.seeDetailsAppointment(item)}>
                  <ListItem containerStyle={{ backgroundColor: "#fff", borderBottomWidth: 2, borderBottomColor: '#2089dc', borderTopWidth: 2, borderTopColor: '#2089dc' }}
                    title={this.transformaData(item)}
                  />
                </TouchableOpacity>
              }


              keyExtractor={item => item}
            />
          </ScrollView>
        </SafeAreaView >
    }
    if (this.state.tipus == "Doctor") header =
      <Header
        style={{ width: '100%' }}
        placement="left"
        leftComponent={<Icon name='menu' color="#fff" onPress={() => this.obrirDrawer()} />}
        centerComponent={{ text: 'Calendar', style: { color: '#fff', fontSize: 20 } }}
        rightComponent={<Icon name='add' color="#fff" onPress={() => this.afegirCita()} />}
      />
    else header = <Header
      style={{ width: '100%' }}
      placement="left"
      leftComponent={<Icon name='menu' color="#fff" onPress={() => this.obrirDrawer()} />}
      centerComponent={{ text: 'Calendar', style: { color: '#fff', fontSize: 20 } }}
    />
    return (
      <View style={styles.container}>
        {header}

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
              this.getDades(day.timestamp)
              /*if(this.state.llistaCites.length == 0) console.log("llistaCites buit")
              if(this.state.llistaMigranyes.length == 0) console.log("llistaMigranyes buit")*/


            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={' MMMM yyyy'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            /* onMonthChange={month => {
               //this.setState({month:month})
               //console.log('month changed', month);
               //this.markDays()
             }}*/
            // Hide month navigation arrows. Default = false
            //hideArrows={true}
            // Do not show days of other months in month page. Default = false
            //hideExtraDays={true}
            // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNasmesShort should still start from Sunday.
            firstDay={1}

            markedDates={
              this.state.markedDays
              /*{
                '2019-11-30': { marked: true, selected: true },
                '2019-11-16': { marked: true, dotColor: 'red', activeOpacity: 0 },
              }*/
            }
            markingType={"multi-dot"}

          />}
        </View>
        <View style={{ flex: 1 }}>
          {titolView}
          <RadioForm
            radio_props={radio_props}
            initial={0}
            formHorizontal={true}
            onPress={(value) => { this.setState({ value: value }) }}
            style={{ justifyContent: 'space-around' }}
          />
          {tipusView}
        </View>
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