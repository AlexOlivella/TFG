import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, ActivityIndicator, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
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
            pacientFirstname: "",
            pacientLastName: "",
            name: "",
            dateSelected: false,
            llistaData: [],
            pacientName: '',
            pacient_uid: "",
            doctorFirstName: "",
            doctorLastName: "",
            refresh: this.props.navigation.state.params.refresh(),

        }
        this.daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        this.monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    }

    static navigationOptions = {
        title: 'Add patient appointment',
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
        this.getUser()

    }
    async getUser() {
        var user = firebase.auth().currentUser
        let resultat = await FirebaseAPI.readUserData(user.uid, "Doctor")
        this.setState({
            doctorFirstName: resultat.firstName,
            doctorLastName: resultat.lastName
        })

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

    creaDropdown(llista) {
        result = []
        let dades = llista.map(pacient => { return { uid: pacient.uid, value: pacient.nom } })
        result = [].concat(dades)
        return result
    }

    async getPacients() {
        var user = firebase.auth().currentUser
        var pacients = await FirebaseAPI.getPacientsFromMetge(user.uid)
        //console.log("pacients", pacients)
        var result = this.creaDropdown(pacients)
        this.setState({
            llistaData: result
        })
        //console.log("result", result)
    }
    checkTextInput() {
        if (this.state.value == 0) {
            if (this.state.pacientFirstname != '') {
                if (this.state.pacientLastName != '') {
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
            if (this.state.pacientName != '') {
                if (this.state.day != '') {
                    return true
                }
                else return false
            }
            else return false
        }
    }
    async addAppointment() {
        Alert.alert("Add appointment", "Do you want to add this appointment?",
            [
                { text: 'Cancel', onPress: () => { return null } },
                {
                    text: 'Confirm', onPress: async () => {
                        var user = firebase.auth().currentUser
                        let error
                        if (this.checkTextInput()) {
                            if (this.state.day > new Date()) {
                                if (this.state.value == 0) {
                                    error = await FirebaseAPI.afegirCitaPacient(user.uid, "null", "null", this.state.pacientFirstname.trim() + " " + this.state.pacientLastName, this.state.day)
                                }
                                else {
                                    //console.log(user.uid, this.state.pacient, this.state.day)                                
                                    /*console.log(user.uid, this.state.doctorFirstName +
                                        " " + this.state.doctorLastName, this.state.pacient_uid, this.state.pacientName, this.state.day)*/
                                    error = await FirebaseAPI.afegirCitaPacient(user.uid, this.state.doctorFirstName +
                                        " " + this.state.doctorLastName, this.state.pacient_uid, this.state.pacientName, this.state.day)
                                }
                                //console.log(error)

                                if (error) alert(error)
                                else {
                                    ToastAndroid.show("Appointment succesfully added", ToastAndroid.SHORT)
                                    this.props.navigation.state.params.refresh()
                                    this.props.navigation.navigate("Calendar")
                                }
                            }
                            else alert("Select a day after today")
                        }
                        else {
                            alert("Check your inputs")
                        }
                    }
                },
            ],
            { cancelable: false })


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
                            onChangeText={pacientFirstname => this.setState({ pacientFirstname })}
                            value={this.state.pacientFirstname}
                        />
                    </View>
                    <View style={styles.addName}>
                        <TextField
                            label="Last name"
                            onChangeText={pacientLastName => this.setState({ pacientLastName })}
                            value={this.state.pacientLastName}
                        />
                    </View>
                </View>
        }

        else if (this.state.value == 1) {
            inputType =
                <View style={{ paddingHorizontal: 10 }} >
                    <Dropdown
                        label='Select patient'
                        data={this.state.llistaData}
                        value={this.state.pacientName}
                        onChangeText={(itemValue, itemIndex, itemData) => {
                            this.setState({ pacientName: itemValue, pacient_uid: itemData[itemIndex].uid });
                            //console.log("itemValue", itemValue,/* "itemIndex", itemIndex, "itemData", itemData,*/"itemData[itemIndex].uid", itemData[itemIndex].uid)
                        }}
                    />
                </View>
        }
        //console.log(this.props)
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20 }}>Is the patient in your patients list?</Text>
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