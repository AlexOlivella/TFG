import React, { Component } from 'react';
import { Picker, Platform, StyleSheet, Text, View, Button, TextInput, ScrollView, Alert, ToastAndroid } from 'react-native';
import DatePicker from 'react-native-datepicker'
import * as FirebaseAPI from '../modules/firebaseAPI';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';

export default class Register extends Component {

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const user_email = navigation.state.params;
        //console.log(this.props)
       // console.log(JSON.stringify(user_email.email_user))
        this.state = {
            username: "",
            password: "",
            birthday: "",
            gender: "",
            email: JSON.stringify(user_email.email_user),

        }

    };

    _isMounted = false;

    componentDidMount() {
        //this.getUser();
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    static navigationOptions = {
        headerTitle: "My Profile",

    };
    getUser() {
       console.log("usuari firebase: " + FirebaseAPI.readUserData());
    }
    
    render() {
        
        return (
            <View style={styles.container}>
                <View style={styles.textView}>
                    <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Username </Text>
                        <Text > {this.state.email}</Text>
                    </View>

                    <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Password</Text>
                        <Text>password text</Text>
                    </View>

                    <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Email</Text>
                        <Text>usuari@usuari.com</Text>
                    </View>

                    <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Gender</Text>
                        <Text>masculi</Text>
                    </View>
                    <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Date of birthday</Text>
                        <Text>31/03/1997</Text>
                    </View>
                </View>
                <View style={styles.seccioBotons}>
                    <View style={{ width: "90%" }} >
                        <Button onPress={() => {
                            //alert(/*this.state.username + " " + this.state.password + " " + this.state.email + " " + this.state.gender + " " + this.state.birthday*/)
                            //this.createUser();

                        }} title="Update changes"> </Button>
                    </View>
                </View>
            </View >

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBEAFF',
    },
    seccioTitol: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FBEAFF',
    },
    textView: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        paddingHorizontal: 10,
    },
    seccioBotons: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FBEAFF',
        marginTop: 10,

    },

});