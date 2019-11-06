import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import firebase from 'firebase'
import * as FirebaseAPI from '../modules/firebaseAPI'
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker'
import { tsThisType } from '@babel/types';

export default class Register extends Component {

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const uid_user = navigation.state.params;
        ////console.log(this.props)
        //console.log(user_email.email_user)
        this.state = {
            email: "",
            username: "",
            gender: "",
            birthday: "",
            uid: "",
        }

    };
    componentWillMount() {
        this.getUser();
    }
    static navigationOptions = {
        header: null

    };

    getDateString(time) {
        let date = new Date(time);
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    }

    async getUser() {
        var user = firebase.auth().currentUser;
        //console.log("getUser", user)
        if (user != null) {
            let data = await FirebaseAPI.readUserData(user.uid)
            console.log("Data: ", data);
            this.setState({ uid: user.uid })
            this.setState({
                email: user.email,
                username: data.username,
                gender: data.gender,
                birthday: this.getDateString(data.birthday)
                
            })
            console.log("birthdy: " ,new Date(data.birthday))
        }
    }

    CheckTextInput = () => {
        if (this.state.username != '') {
            if (this.state.gender != '') {
                if (this.state.birthday != '') {
                    //alert('Success')
                    return true;
                } else {
                    alert('Please enter a birthday');
                }
            } else {
                alert('Please enter a gender');
            }
        } else {
            alert('Please enter username');
        }
        return false;
    };


    async updateProfile() {
        //this.updateEmail();
        //let contraCorrecte = this.updatePassword();
        var user = firebase.auth().currentUser;
        console.log(JSON.stringify(this.state.email))
        if (this.CheckTextInput()) {
            let resposta = await FirebaseAPI.updateProfile(
                user.uid,
                this.state.username, 
                this.state.gender, 
                new Date(this.state.birthday).getTime())
            console.log("resposta: ", resposta)
        }
    }
    render() {
        var { navigation } = this.props;
        var navigate = navigation.navigate;
        return (
            <View style={styles.container}>
                <View style={styles.seccioTitol}>
                    <Text style={{ fontSize: 30 }}> Change your profile</Text>
                </View>
                <View style={styles.textView}>
                    <View style={styles.dades}>
                        <Text >Email</Text>
                        <Text>{this.state.email}</Text>
                    </View>
                    <View style={styles.dades}>
                        <Text>Username</Text>
                        <TextInput
                            onChangeText={(v) => this.setState({ username: v.trim() })}>
                            {this.state.username}</TextInput>
                    </View>
                    <View style={styles.dades}>
                        <Text>Gender</Text>
                        <View style={{ width: "50%", }}>
                            <Dropdown
                                data={[{
                                    value: "Male"
                                }, {
                                    value: "Female"
                                }, {
                                    value: "Other"
                                }]}
                                style={{ fontSize: 12 }}
                                value={this.state.gender}
                                onChangeText={(itemValue) => this.setState({ gender: itemValue })}
                            />
                        </View>
                    </View>
                    <View style={styles.dades}>
                        <Text>Date of birthday</Text>
                        <View style={{ width: "50%" }}>
                            <DatePicker
                                date={this.state.birthday}
                                mode="date"
                                placeholder="Select date of birth"
                                format="DD-MM-YYYY"
                                minDate="01-01-1919"
                                maxDate="31-12-2009"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                style={{ width: "100%" }}
                                customStyles={{
                                    dateText: {
                                        color: "rgba(0, 0, 0, .87)",
                                        fontSize: 12,
                                        alignItems: 'flex-start',
                                        width: "100%"
                                    },
                                    dateInput: {
                                        borderWidth: 0,
                                        fontSize: 12,
                                        color: "rgba(0, 0, 0, .87)",
                                        alignItems: 'flex-start'
                                    }
                                }}
                                onDateChange={date => this.setState({ birthday: date })}
                            />
                        </View>

                    </View>
                </View>
                <View style={styles.seccioBuida}></View>
                <View style={styles.seccioBotons}>
                    <View style={{ width: "90%" }} >
                        <Button onPress={() => {
                            Alert.alert(
                                'Update profile',
                                'Do you want to confirm this changes?',
                                [
                                    { text: 'Cancel', onPress: () => { return null } },
                                    {
                                        text: 'Confirm', onPress: () => {
                                            this.updateProfile();
                                        }
                                    },
                                ],
                                { cancelable: false }
                            )

                        }} title="Update Profile"> </Button>
                        <Button onPress={() => { navigate("UpdateEmailPass") }} title="Update Email and Password"></Button>
                    </View>
                </View>
            </View >

        );
    }
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