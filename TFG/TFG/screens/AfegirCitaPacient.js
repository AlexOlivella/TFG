import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, ActivityIndicator, TouchableOpacity, ToastAndroid } from 'react-native';
import firebase from 'firebase'
import { TextField } from 'react-native-material-textfield';
import DateTimePicker from "react-native-modal-datetime-picker";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Dropdown } from 'react-native-material-dropdown';
import * as FirebaseAPI from '../modules/firebaseAPI'

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            value: "",
            day: "",
            firstName: "",
            lastName: "",
            name: "",
            dateSelected: false,
            llistaData: [],
            pacient: ''
        }
        this.daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        this.monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    }

    static navigationOptions = {
        title: 'Add pacient appointment',
        headerStyle: {
            backgroundColor: '#2089dc'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontSize: 20,
        },
    }

    componentDidMount() {
        this.getPacients()

    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = (date) => {
        //console.log("A date inicial has been picked: ", date);
        this.setState({ day: date.getTime(), dateSelected: true })
        this.hideDateTimePicker();

    };

    transformaData(time) {
        if (time) {
            time = parseInt(time)
            let data = new Date(time);
            const date = data.getDate(); //Current Date
            const month = (data.getMonth()); //Current Month
            const year = data.getFullYear(); //Current Year
            const hour= data.getHours(); //Current Hours
            const min = data.getMinutes(); //Current Minutes
            const day = data.getDay();
            
            console.log(month)
            if (min < 10) {
                min = '0' + min;
            }
            if (hour < 10) {
                hour = '0' + hour;
            }

            var terminologia
            const dia =this.daysArray[day]
            const mes = this.monthsArray[month]
        
            if (date == 1 || date == 21 || date == 31) terminologia = "st"
            else if (date == 2 || date == 22) terminologia = "nd"
            else if (date == 3 || date == 23) terminologia = "rd"
            else terminologia = "th"

            return dia + " " + date + terminologia + " of " + mes + ", " + year + " at " + hour+ ':' + min
        }
        else return ""
    }

    creaDropdown(llista) {
        result = []
        let dades = llista.map(pacient => { return { value: pacient.nom } })
        result = [].concat(dades)
        return result
    }

    async getPacients() {
        var user = firebase.auth().currentUser
        var pacients = await FirebaseAPI.getPacientsFromMetge(user.uid)
        var result = this.creaDropdown(pacients)
        this.setState({
            llistaData: result
        })
    }
    checkTextInput() {
        if (this.state.value == 0) {
            if (this.state.firstName != '') {
                if (this.state.lastName != '') {
                    if (this.state.day != '') {
                        return true
                    }
                    else return false
                }
                else return false
            }
            else return false

        }
        else {
            if (this.state.pacient != '') {
                if (this.state.day != '') {
                    return true
                }
                else return false
            }
            else return false
        }
    }
    async addAppointment() {
        var user = firebase.auth().currentUser
        let error
        if (this.checkTextInput()) {
            if (this.state.day > new Date()) {
                if (this.state.value == 0) {
                    //console.log(user.uid, this.state.firstName + " " + this.state.lastName, this.state.day)
                    error = await FirebaseAPI.afegirCitaPacient(user.uid, this.state.firstName + " " + this.state.lastName, this.state.day)
                }
                else {
                    //console.log(user.uid, this.state.pacient, this.state.day)
                    error = await FirebaseAPI.afegirCitaPacient(user.uid, this.state.pacient, this.state.day)
                }
                //console.log(error)

                if (error) alert(error)
                else {
                    ToastAndroid.show("Appointment succesfully added", ToastAndroid.SHORT)
                    this.props.navigation.navigate("Calendar")
                }

            }
            else alert("Select a day after today")
        }
        else {
            alert("Check your inputs")
        }

    }
    render() {
        var { navigation } = this.props;
        var navigate = navigation.navigate;
        const { checked } = this.state;
        var radio_props = [
            { label: 'No', value: 0 },
            { label: 'Yes', value: 1 },

        ];
        let inputType
        if (this.state.value == 0) {
            inputType =
                <View>

                    <View style={styles.addName}>
                        <TextField
                            label="First name"
                            onChangeText={firstName => this.setState({ firstName })}
                            value={this.state.firstName}
                        />
                    </View>
                    <View style={styles.addName}>
                        <TextField
                            label="Last name"
                            onChangeText={lastName => this.setState({ lastName })}
                            value={this.state.lastName}
                        />
                    </View>
                </View>
        }

        else if (this.state.value == 1) {
            inputType =
                <View style={{ paddingHorizontal: 10 }} >
                    <Dropdown
                        label='Select pacient'
                        data={this.state.llistaData}
                        value={this.state.pacient}
                        onChangeText={(itemValue) => this.setState({ pacient: itemValue })}
                    />
                </View>
        }
        //console.log(this.props)
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20 }}>Is the pacient in your pacients list?</Text>
                </View>
                <View style={{ flex: 3, justifyContent: 'space-around' }}>
                    <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        formHorizontal={true}
                        onPress={(value) => { this.setState({ value: value }) }}
                        style={{ justifyContent: 'space-around' }}
                    />
                    {inputType}
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                        minimumDate={new Date()}
                        mode='datetime'
                    />
                    <View style={styles.addName}>
                        <TouchableOpacity onPress={this.showDateTimePicker} >
                            {!this.state.dateSelected && <Text style={{ fontSize: 16, color: '#808080', borderBottomColor: '#808080', borderBottomWidth: 1 }}>Select day and time</Text>}

                            {this.state.dateSelected && <View>
                                <Text style={{ fontSize: 12, color: '#0091EA' }}>Select day and time</Text>
                                <Text style={{ fontSize: 16, borderBottomColor: '#B4A9A9', borderBottomWidth: 1, }}>{this.transformaData(this.state.day)}</Text>
                            </View>}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, width: "90%", justifyContent: 'center', alignSelf: 'center' }}>
                    <Button title="Confirm date" style={{ width: '100%' }} onPress={() => this.addAppointment()}></Button>
                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    addName: {
        width: "100%",
        paddingHorizontal: 10,
    }

});