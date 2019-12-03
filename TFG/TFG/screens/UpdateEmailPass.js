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
        //console.log(this.props)
        //console.log(user_email.email_user)
        this.state = {
            email: "",
            currentPassword: "",
            uid: "",
            newPassword: "",
            confirmPassword: "",
        }

    };

    static navigationOptions ={
        headerStyle:{
            backgroundColor: '#7BF0E6'
        }
    }

    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    updatePassword() {
        if (this.state.newPassword == this.state.confirmedPassword) {
            this.reauthenticate(this.state.currentPassword).then(() => {
                var user = firebase.auth().currentUser;

                user.updatePassword(this.state.newPassword).then(function () {
                    // Alert.alert("Password was changed");
                }).catch(function (error) {
                    Alert.alert(error.message)
                })
            }).catch((error) => {
                Alert.alert(error.message)

            });
            return true
        }
        else {
            alert("The new passwords don't match")
            return false
        }
    }
    updateEmail() {
        this.reauthenticate(this.state.currentPassword).then(() => {
            var user = firebase.auth().currentUser;

            user.updateEmail(this.state.newEmail).then(function () {
                //Alert.alert("Email was changed");
            }).catch(function (error) {
                Alert.alert(error.message)
            })
        }).catch((error) => {
            Alert.alert(error.message)

        });

    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.seccioTitol}>
                    <Text style={{ fontSize: 30 }}> Change your profile</Text>
                </View>
                <View style={styles.textView}>
                    <View style={styles.dades}>
                        <Text>Email</Text>
                        <Text>{this.state.email}</Text>
                    </View>
                    <View style={styles.dades}>
                        <Text>Current Password</Text>
                        <TextInput
                            secureTextEntry={true}

                            onChangeText={(v) => this.setState({ currentPassword: v })}>
                        </TextInput>
                    </View>
                    <View style={styles.dades}>
                        <Text>New Password</Text>
                        <TextInput
                            secureTextEntry={true}
                            onChangeText={(v) => this.setState({ newPassword: v })}>
                        </TextInput>
                    </View>
                    <View style={styles.dades}>
                        <Text>Confirm Password</Text>
                        <TextInput
                            secureTextEntry={true}

                            onChangeText={(v) => this.setState({ confirmPassword: v })}>
                        </TextInput>
                    </View>
                </View>
                <View style={styles.seccioBuida}></View>
                <View style={styles.seccioBotons}>
                    <View style={{ width: "90%" }} >
                        <Button onPress={() => {
                            Alert.alert(
                                'Update email',
                                'Do you want to confirm this changes?',
                                [
                                    { text: 'Cancel', onPress: () => { return null } },
                                    {
                                        text: 'Confirm', onPress: () => {
                                            this.updateEmail();
                                        }
                                    },
                                ],
                                { cancelable: false }
                            )

                        }} title="Update Profile"> </Button>
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