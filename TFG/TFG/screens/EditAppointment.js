import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, ActivityIndicator, TouchableOpacity, ToastAndroid, Alert, TouchableHighlightBase, SafeAreaView, ScrollView } from 'react-native';
import firebase from 'firebase'
import { TextField } from 'react-native-material-textfield';
import DateTimePicker from "react-native-modal-datetime-picker";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Dropdown } from 'react-native-material-dropdown';
import * as FirebaseAPI from '../modules/firebaseAPI'

export default class EditAppointment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            day: this.props.navigation.getParam("day"),
            pacientName: this.props.navigation.getParam("pacientName"),
            dateUpdate: "",
            refresh: this.props.navigation.state.params.refresh(),
            pacient_uid: this.props.navigation.getParam("pacient_uid"),
            doctorFirstName: "",
            doctorLastName: "",


        }
        this.daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        this.monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    }

    static navigationOptions = {
        title: 'Edit current appointment',
        headerStyle: {
            backgroundColor: '#2089dc'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontSize: 20,
        },
    }
    componentDidMount() {
        this.getDades()
        //console.log(this.transformaData(this.state.day))
    }
    async getDades() {
        var user = firebase.auth().currentUser
        let result = await FirebaseAPI.readUserData(user.uid, "Doctor")
        console.log("result", result.firstName, result.lastName)
        this.setState({ isLoading: true, doctorFirstName: result.firstName, doctorLastName: result.lastName })
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = (date) => {
        //console.log("A date inicial has been picked: ", date);
        this.setState({ dateUpdate: date.getTime(), dateSelected: true })
        this.hideDateTimePicker();

    };

    transformaData(time) {
        if (time) {
            time = parseInt(time)
            let data = new Date(time);
            var date = data.getDate(); //Current Date
            var month = (data.getMonth()); //Current Month
            const year = data.getFullYear(); //Current Year
            var hour = data.getHours(); //Current Hours
            var min = data.getMinutes(); //Current Minutes
            var day = data.getDay();

            //console.log(month)
            if (min < 10) {
                min = '0' + min;
            }
            if (hour < 10) {
                hour = '0' + hour;
            }

            var terminologia
            const dia = this.daysArray[day]
            const mes = this.monthsArray[month]

            if (date == 1 || date == 21 || date == 31) terminologia = "st"
            else if (date == 2 || date == 22) terminologia = "nd"
            else if (date == 3 || date == 23) terminologia = "rd"
            else terminologia = "th"

            return dia + " " + date + terminologia + " of " + mes + ", " + year + " at " + hour + ':' + min
        }
        else return ""
    }

    checkTextInput() {
        if (this.state.dayUpdate != '') {
            return true
        }
        else return false
    }

    async editAppointment() {
        console.log("dades", this.state.doctorFirstName + " " + this.state.doctorLastName)
        if (this.checkTextInput()) {
            Alert.alert("Edit appointment", "Do you want to confirm this new date?",
                [
                    { text: 'Cancel', onPress: () => { return null } },
                    {
                        text: 'Confirm', onPress: async () => {
                            var user = firebase.auth().currentUser
                            let error

                            if (this.state.dateUpdate > new Date()) {

                                error = await FirebaseAPI.updateAppointment(user.uid, this.state.doctorFirstName + " " + this.state.doctorLastName,
                                    this.state.pacient_uid, this.state.pacientName, this.state.day, this.state.dateUpdate)
                                if (error) alert(error)
                                else {
                                    ToastAndroid.show("Appointment succesfully updated", ToastAndroid.SHORT)
                                    this.props.navigation.state.params.refresh()
                                    this.props.navigation.navigate("AppointmentDetails")
                                }
                            }
                            else Alert.alert("Error", "Select a date after now")

                        }
                    },
                ],
                { cancelable: false })
        }
        else Alert.alert("Error", "Check your inputs")
    }


    render() {
        
        //console.log(this.props)
        return (
            <View style={styles.container}>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                        minimumDate={new Date()}
                        mode='datetime'
                    />

                    <View style={{ alignItems: 'center',  }}>
                        <Text style={{ fontSize: 20, color: 'gray' }}>Pacient name:</Text>
                        <Text style={{ fontSize: 20 }}>{this.state.pacientName}</Text>
                    </View>
                    <View style={{ alignItems: 'center', }}>
                        <Text style={{ fontSize: 20, color: 'gray' }}>Current date:</Text>
                        <Text style={{ fontSize: 20 }}>{this.transformaData(this.state.day)}</Text>
                    </View>
                    <View >
                        <View style={{ alignItems: 'center', paddingHorizontal:10 }}>
                            <Text style={{ fontSize: 20, color: 'gray' }}>New date:</Text>
                        </View>

                        <TouchableOpacity onPress={this.showDateTimePicker} >
                            {!this.state.dateSelected && <Text style={{ fontSize: 20, color: '#808080', borderBottomColor: '#808080', borderBottomWidth: 1 }}>Select day and time</Text>}

                            {this.state.dateSelected && <View>
                                <Text style={{ fontSize: 14, color: '#0091EA' }}>Select day and time</Text>
                                <Text style={{ fontSize: 20, borderBottomColor: '#B4A9A9', borderBottomWidth: 1 }}>{this.transformaData(this.state.dateUpdate)}</Text>
                            </View>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingHorizontal: 10, paddingTop: 40 }}>
                        <Button title="Confirm changes" style={{ width: '100%' }} onPress={() => this.editAppointment()}></Button>
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
});