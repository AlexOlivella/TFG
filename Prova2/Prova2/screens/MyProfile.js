import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import firebase from 'firebase'
import FirebaseAPI from '../modules/firebaseAPI'
import { TextField } from 'react-native-material-textfield';

export default class Register extends Component {

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const uid_user = navigation.state.params;
        ////console.log(this.props)
        //console.log(user_email.email_user)
        this.state = {
            email: "",
            password: "",
            username: "",
            gender: "",
            birthday: "",
            photoUrl: "",
            uid: "",
            emailVerified: "",
        }

    };

    _isMounted = false;
    componentWillMount() {
        this.getUser();

    }
    componentDidMount() {
        this._isMounted = true;

    }
    componentWillUnmount() {
        alert("hola")
        this._isMounted = false;
    }
    static navigationOptions = {
        headerTitle: "My Profile",

    };
    async getUser() {
        var user = firebase.auth().currentUser;
        //console.log("current user: ", user)
        if (user != null) {
            //this.setState({name: user.displayName}) ;

            //this.setState({photoUrl}) = user.photoURL;
            //this.setState({emailVerified}) = user.emailVerified;
            this.setState({ uid: user.id })   // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
            await firebase.database().ref('users/' + user.uid).on('value', snap => {
                console.log("usuari sencer: ", snap.val());
                this.setState({ email: snap.val().email })
                this.setState({ username: snap.val().username });
                this.setState({ password: snap.val().password });
                this.setState({ gender: snap.val().gender });
                this.setState({ birthday: snap.val().birthday });

            })
        }
    }




    render() {
        var email2 = "";
        var username2 = "";
        var password2 = "";
        var gender2 = "";
        var birthday2 = "";
        return (
            <View style={styles.container}>
                <View style={styles.seccioTitol}>
                    <Text style={{ fontSize:30 }}> Change your account data</Text>

                </View>
                <View style={styles.textView}>
                    <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text >Email</Text>
                        <TextInput
                        >{this.state.email}</TextInput>
                    </View>
                    <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Username</Text>
                        <TextInput >{this.state.username}</TextInput>
                    </View>

                    <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Password</Text>
                        <TextInput>{this.state.password}</TextInput>
                    </View>
                    <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Gender</Text>
                        <Text>{this.state.gender}</Text>
                    </View>
                    <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Date of birthday</Text>
                        <TextInput>{this.state.birthday}</TextInput>
                    </View>
                </View>
                <View style={styles.seccioBuida}></View>
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
        justifyContent: 'flex-end',
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
    seccioBuida:{
        flex:2,
    },
    seccioBotons: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FBEAFF',
        marginTop: 10,

    },

});