import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ToastAndroid, TouchableOpacity } from 'react-native';
import firebase from 'firebase'
import * as FirebaseAPI from '../modules/firebaseAPI'
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker'
import { tsThisType } from '@babel/types';
import { Header, Icon } from 'react-native-elements'
import DateTimePicker from "react-native-modal-datetime-picker";


export default class InfoPacient extends Component {

    constructor(props) {
        super(props);

        //console.log(this.props)
        //console.log(user_email.email_user)
        this.state = {
            uid: this.props.navigation.getParam("pacient"),
            firstName: "",
            lastName: "",
            gender: "",
            birthday: "",

        }
    }

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#2089dc'
        }
    }
    componentDidMount() {
        this.getInfoPacient()
    }

    async getInfoPacient() {
        let result = await FirebaseAPI.getDadesPacient(this.state.uid)
        console.log("result", result)
        this.setState({
            firstName: result.firstName,
            lastName: result.lastName,
            gender: result.gender,
            birthday: result.birthday
        })
    }

    obteMigranyes() {
        this.props.navigation.navigate("LlistaMigranyes",
            {
                pacient: this.state.uid,
            })
    }
    transformaData(time) {
        if (time) {
            let data = new Date(time);
            var date = data.getDate(); //Current Date
            var month = data.getMonth() + 1; //Current Month
            var year = data.getFullYear(); //Current Year
            
            return date + '-' + month + '-' + year
        }
        else return ""
    }

    render() {

        return (
            <View style={styles.container}>
                <Text>First Name: {this.state.firstName}</Text>
                <Text>Last Name: {this.state.lastName}</Text>
                <Text>Gender: {this.state.gender}</Text>
                <Text>Birthday: {this.transformaData(this.state.birthday)}</Text>
                <TouchableOpacity onPress={() => this.obteMigranyes()}>
                    <Text>Migraines</Text>
                </TouchableOpacity>

            </View>
        );
    };

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7BF0E6',
    },
    seccioTitol: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#7BF0E6',
    },
    dades: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'white',
        marginBottom: 10,
    },
    textView: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        paddingHorizontal: 10,
    },
    seccioBuida: {
        flex: 1,
    },
    seccioBotons: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#7BF0E6',
        marginTop: 10,

    },

});