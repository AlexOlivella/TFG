import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ToastAndroid, TouchableOpacity, SafeAreaView, ScrollView,ActivityIndicator } from 'react-native';
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
            pacient_uid: this.props.navigation.getParam("pacient"),
            firstName: "",
            lastName: "",
            gender: "",
            birthday: "",
            observations: "",
            edited: false,
            isLoading:true,
        }
    }

    static navigationOptions = {
        title: "Patient info",
        headerStyle: {
            backgroundColor: '#2089dc'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontSize: 20,
        },
    }
    componentDidMount() {
        this.getInfoPacient()
    }

    async getInfoPacient() {
        let result = await FirebaseAPI.getDadesPacient(this.state.pacient_uid)
        var user = firebase.auth().currentUser
        let observations = await FirebaseAPI.getObservationsByPacient(user.uid, this.state.pacient_uid)
        //console.log("result", result)
        this.setState({
            firstName: result.firstName,
            lastName: result.lastName,
            gender: result.gender,
            birthday: result.birthday,
            observations: observations,
            isLoading:false
        })
    }

    obteMigranyes() {
        this.props.navigation.navigate("LlistaMigranyes",
            {
                pacient: this.state.pacient_uid,
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
    async addObservations() {
        Alert.alert("Add observations", "Do you want to add these observations?",
            [
                { text: 'Cancel', onPress: () => { return null } },
                {
                    text: 'Confirm', onPress: async () => {
                        var user = firebase.auth().currentUser
                        await FirebaseAPI.addObservationsToPacient(user.uid, this.state.pacient_uid, this.state.observations)
                        alert("Observations added successfully")
                    }
                },
            ],
            { cancelable: false })
    }
    render() {
        if(this.state.isLoading) return (<View><ActivityIndicator size="large" color="black"></ActivityIndicator></View>)
        else return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.infoContainer}>
                        <View style={styles.lateral}>
                            <View style={styles.info}>
                                <Text style={styles.constants}>First Name:</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.variables}>{this.state.firstName}</Text>
                            </View>
                        </View>
                        <View style={styles.lateral}>
                            <View style={styles.info}>
                                <Text style={styles.constants}>Last Name:</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.variables}>{this.state.lastName}</Text>
                            </View>
                        </View>
                        <View style={styles.lateral}>
                            <View style={styles.info}>
                                <Text style={styles.constants}>Gender:</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.variables}>{this.state.gender}</Text>
                            </View>
                        </View>
                        <View style={styles.lateral}>
                            <View style={styles.info}>
                                <Text style={styles.constants}>Birthday:</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.variables}>{this.transformaData(this.state.birthday)}</Text>
                            </View>
                        </View>
                        <View style={{ paddingTop: 40 }}>
                            <TextField label="Observations"
                                onChangeText={observations => this.setState({ observations, edited: true })}
                                value={this.state.observations}
                                multiline={true}
                            ></TextField>
                            {this.state.edited ? <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => { this.addObservations() }}
                                    style={{ width: '98%', alignItems: 'center', height: 40, justifyContent: 'center', backgroundColor: '#2196F3' }}
                                >
                                    <View >
                                        <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>ADD OBSERVATIONS</Text>
                                    </View>
                                </TouchableOpacity>
                            </View> : <View></View>}
                        </View>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', paddingTop:40 }}>
                        <TouchableOpacity
                            style={{ width: '90%', alignItems: 'center', height: 52, justifyContent: 'center', backgroundColor: '#2196F3' }}
                            onPress={() => this.obteMigranyes()}
                        >
                            <View>
                                <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>SEE PATIENT MIGRAINES</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    };

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical:10
    },
    infoContainer: {
        flex: 3,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    lateral: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#2089dc',
        paddingTop: 40,

    },
    info: {
        width: "50%"
    },
    constants: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    variables: {
        fontSize: 20,
    }

});