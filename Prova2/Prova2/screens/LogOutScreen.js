
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Alert, TextInput, BackHandler } from 'react-native';
import firebase from 'firebase'
import CalendarPicker from 'react-native-calendar-picker';




export default class prova extends Component {

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            // The screen is focused
            this.asklogout()
        });
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }



    asklogout() {
        var { navigation } = this.props;
        var navigate = navigation.navigate;
        Alert.alert(
            "Log out",
            "Do you want to log out?",
            [
                {
                    text: 'Cancel',
                    onPress: () => { navigate("Home") },
                    style: 'cancel'
                },
                {
                    text: 'OK', onPress: () => {
                        firebase.auth().signOut().then(function () {
                            // Sign-out successful.
                            navigate("Login")
                        }).catch(function (error) {
                            // An error happened.
                        });
                    }
                },

            ]

        );

    }
    render() {
        return (
            <View style={{backgroundColor:"#FBEAFF"}}></View>
        );

    }
}
