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
            backgroundColor: '#2089dc',
        },
        headerTitleStyle: {
            color: '#fff'
        }
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
            var date = data.getDate(); //Current Date
            var month = data.getMonth() + 1; //Current Month
            var year = data.getFullYear(); //Current Year
            var hour= data.getHours(); //Current Hours
            var min = data.getMinutes(); //Current Minutes

            if (min < 10) {
                min = '0' + min;
            }
            if (hour < 10) {
                hour = '0' + hour;
            }

            var mes
            var dia
            var terminologia
            this.daysArray.map((item, key) => {
                if (key == new Date().getDay()) {
                    dia = item

                }
            })
            this.monthsArray.map((item, key) => {
                if (key == new Date().getMonth()) {
                    mes = item
                }
            })


            if (date == 1 || date == 21 || date == 31) terminologia = "st"
            else if (date == 2 || date == 22) terminologia = "nd"
            else if (date == 3 || date == 23) terminologia = "rd"
            else terminologia = "th"

            return dia + " " + date + terminologia + " of " + mes + ", " + year + " at " + hour+ ':' + min
        }
        else return ""
    }

    render() {
        //console.log(this.props)
        return (
            <View style={styles.container}>
                <View style={{ flex: 4, justifyContent:'space-around'}}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, color:'gray' }}>Pacient name: </Text>
                        <Text style={{ fontSize: 20 }}>{this.state.name}</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, color:'gray' }}>Appointment date: </Text>
                        <Text style={{ fontSize: 20 }}>{this.transformaData(this.state.day)}</Text>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <View>
                        <Button style={styles.boto} title="Edit appointment" onPress={() => this.editAppointment()}></Button>
                    </View>
                    <View>
                        <Button style={styles.boto} title="Delete appointment" onPress={() => this.deleteAppointment()}></Button>
                    </View>
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
    }

});