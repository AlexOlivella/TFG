import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, } from 'react-native';
import firebase from 'firebase'
import FirebaseAPI from '../modules/firebaseAPI'
export default class Register extends Component {

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const uid_user = navigation.state.params;
        ////console.log(this.props)
        //console.log(user_email.email_user)
        this.state = {
            email: "",
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
        this._isMounted = false;
    }
    static navigationOptions = {
        headerTitle: "My Profile",

    };
    getUser() {
        var user = firebase.auth().currentUser;
        //console.log("current user: ", user)

        if (user != null) {
            //this.setState({name: user.displayName}) ;
            this.setState({ email: user.email })
            //this.setState({photoUrl}) = user.photoURL;
            //this.setState({emailVerified}) = user.emailVerified;
            this.setState({ uid: user.id })   // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
            firebase.database().ref('users/' + "W3AbghKdQiY4dCG74PPUdDGdoVl2").on('value', snap => {
                console.log(snap.val())
                
            })
            console.log("current user: " , user.uid)
        }
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