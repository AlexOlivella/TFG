
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, BackHandler } from 'react-native';
import firebase from 'firebase'
import CalendarPicker from 'react-native-calendar-picker';




export default class prova extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
    }

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#FBEAFF',
            borderBottomWidth: 0,

        }
    }

    render() {
        var { navigation } = this.props;
        var navigate = navigation.navigate;
        //console.log(this.props)
        return (
            <View style={styles.container}>
                <Button title="log out" onPress={() => {
                    firebase.auth().signOut().then(function () {
                        // Sign-out successful.
                        navigate("Login")
                    }).catch(function (error) {
                        // An error happened.
                    });
                }}></Button>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FBEAFF',
    }
});