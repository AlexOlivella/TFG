import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, ActivityIndicator, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import firebase from 'firebase'
import { TextField } from 'react-native-material-textfield';
import DateTimePicker from "react-native-modal-datetime-picker";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Dropdown } from 'react-native-material-dropdown';
import * as FirebaseAPI from '../modules/firebaseAPI'

export default class AppointmentDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            name: "",
            day: this.props.navigation.getParam("day"),

        }
        this.daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        this.monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }

    static navigationOptions = {
        title: 'Appointment details',
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
        console.log(this.transformaData(this.state.day))
    }
    refresh() {
        this.getDades()
    }
    async getDades() {
        var user = firebase.auth().currentUser
        let result = await FirebaseAPI.getDadesAppointment(user.uid, this.state.day)
        //console.log(result)
        this.setState({ name: result })
    }

    editAppointment() {
        this.props.navigation.navigate("EditAppointment", { pacientName: this.state.name, day: this.state.day })
    }

    deleteAppointment() {
        Alert.alert("Delete appointment", "Do you want to delete this appointment?",
            [
                { text: 'Cancel', onPress: () => { return null } },
                {
                    text: 'Confirm', onPress: () => {
                        var user = firebase.auth().currentUser
                        FirebaseAPI.deleteAppointment(user.uid, this.state.day)
                        this.props.navigation.navigate("Calendar")


                    }
                },
            ],
            { cancelable: false })

    }

    transformaData(time) {
        if (time) {
            time = parseInt(time)
            let data = new Date(time);
            const date = data.getDate(); //Current Date
            const month = (data.getMonth()); //Current Month
            const year = data.getFullYear(); //Current Year
            const hour = data.getHours(); //Current Hours
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

    render() {
        //console.log(this.props)
        return (
            <View style={styles.container}>
                <View style={{ flex: 4, justifyContent: 'space-around' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, color: 'gray' }}>Pacient name: </Text>
                        <Text style={{ fontSize: 20 }}>{this.state.name}</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, color: 'gray' }}>Appointment date: </Text>
                        <Text style={{ fontSize: 20 }}>{this.transformaData(this.state.day)}</Text>
                    </View>
                </View>
                <View style={styles.seccioBotons}>
                    <TouchableOpacity
                        onPress={() => {this.editAppointment()}}
                        style={{ width: '48%', alignItems: 'center', height: 52, justifyContent: 'center', backgroundColor: '#2196F3' }}
                    >
                        <View >
                            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>EDIT APPOINTMENT</Text>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {this.deleteAppointment()}}
                        style={{ width: '48%', alignItems: 'center', height: 52, justifyContent: 'center', backgroundColor: '#2196F3' }}
                    >
                        <View >
                            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>DELETE APPOINTMENT</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        alignContent: 'center'
    },
    addName: {
        width: "100%",
        paddingHorizontal: 10,
    },
    boto: {
        width: "90%"
    },
    seccioBotons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

    },

});