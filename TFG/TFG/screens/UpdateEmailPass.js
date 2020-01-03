import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import firebase from 'firebase'
import * as FirebaseAPI from '../modules/firebaseAPI'
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker'
import { tsThisType } from '@babel/types';
import Icon from 'react-native-elements'
import PasswordInputText from 'react-native-hide-show-password-input';

export default class Register extends Component {

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const uid_user = navigation.state.params;
        //console.log(this.props)
        //console.log(user_email.email_user)
        this.state = {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        }

    };

    static navigationOptions = {
        title: "Change password",
        headerStyle: {
            backgroundColor: '#2089dc',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontSize: 20,
        },

    }
    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    changePassword = () => {
        if (this.state.newPassword != this.state.currentPassword) {
            if (this.state.confirmPassword == this.state.newPassword) {

                this.reauthenticate(this.state.currentPassword).then(() => {
                    var user = firebase.auth().currentUser;
                    user.updatePassword(this.state.newPassword).then(() => {
                        this.setState({ currentPassword: "", newPassword: "", confirmPassword: "" })
                        ToastAndroid.show("Password succesfully updated", ToastAndroid.SHORT)
                        this.props.navigation.navigate("Home")
                    }).catch((error) => {
                        Alert.alert("Error", error.message);
                    });
                }).catch((error) => {
                    Alert.alert("Error", error.message);
                });
            }
            else Alert.alert("Error", "The new passwords don't match")
        }
        else Alert.alert("Error", "The new password can't be the same as the old password")
    }
    render() {
        return (
            <View style={styles.container}>
                {/*<View style={styles.seccioTitol}>
                    <Text style={{ fontSize: 20 }}>Change your email and/or password</Text>
        </View>*/}

                <View style={styles.textView}>

                    {/*<View style={styles.dades}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Email</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <TextInput 
                            style={{ fontSize: 20 }} 
                                onChangeText={(v) => this.setState({ email: v.trim() })}
                                keyboardType
                                >
                                {this.state.email}
                            </TextInput>
                        </View>
        </View>*/}
                    <View style={styles.dades}>
                        <View style={{ width: '50%',justifyContent:'flex-end',paddingBottom:10  }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Current password</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <PasswordInputText
                                getRef={input => this.input = input}
                                value={this.state.currentPassword}
                                onChangeText={(currentPassword) => this.setState({ currentPassword })}
                            />
                        </View>
                    </View>
                    <View style={styles.dades}>
                        <View style={{ width: '50%', justifyContent:'flex-end',paddingBottom:10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>New password</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <PasswordInputText
                                getRef={input => this.input = input}
                                value={this.state.newPassword}
                                onChangeText={(newPassword) => this.setState({ newPassword })}
                            />
                        </View>
                    </View>
                    <View style={styles.dades}>
                        <View style={{ width: '50%',justifyContent:'flex-end',paddingBottom:10  }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Confirm password</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <PasswordInputText
                                getRef={input => this.input = input}
                                value={this.state.confirmPassword}
                                onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.seccioBotons}>
                    {/*<TouchableOpacity onPress={() =>
                        Alert.alert(
                            'Update email',
                            'Do you want to confirm this changes?',
                            [
                                { text: 'Cancel', onPress: () => { return null } },
                                {
                                    text: 'Confirm', onPress: () => {
                                        this.changeEmail(this.state.currentPassword, this.state.email)

                                    }
                                },
                            ],
                            { cancelable: false }
                        )}
                        style={{ width: '48%', alignItems: 'center', height: 52, justifyContent: 'center', backgroundColor: '#2196F3' }}
                    >
                        <View >
                            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>UPDATE EMAIL</Text>

                        </View>
                        </TouchableOpacity>*/}
                    <TouchableOpacity onPress={() =>
                        Alert.alert(
                            'Update password',
                            'Do you want to confirm this changes?',
                            [
                                { text: 'Cancel', onPress: () => { return null } },
                                {
                                    text: 'Confirm', onPress: () => {
                                        this.changePassword()

                                    }
                                },
                            ],
                            { cancelable: false }
                        )}
                        style={{ width: '90%', alignItems: 'center', height: 52, justifyContent: 'center', backgroundColor: '#2196F3' }}
                    >
                        <View >
                            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>UPDATE PASSWORD</Text>

                        </View>
                    </TouchableOpacity>
                </View>
            </View >

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    seccioTitol: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dades: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#2089dc',
    },
    textView: {
        flex: 3,
        fontSize: 40,
        paddingHorizontal: 10,
        justifyContent: 'space-around'
    },
    seccioBotons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',


    },

});