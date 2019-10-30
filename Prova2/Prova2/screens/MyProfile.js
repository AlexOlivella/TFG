import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import firebase from 'firebase'
import FirebaseAPI from '../modules/firebaseAPI'
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker'

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
            this.setState({ uid: user.uid })   // The user's ID, unique to the Firebase project. Do NOT use
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

    validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            this.setState({ email: text })
            return false;
        }
        else {
            this.setState({ email: text })
            console.log("Email is Correct");
            return true;
        }
    }
    CheckTextInput = () => {
        //Handler for the Submit onPress
        if (this.state.username != '') {
            //Check for the Name TextInput
            if (this.state.password != '') {
                //Check for the Email TextInput
                if (this.state.email != '') {
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
                    if(!this.validate(this.state.email)) alert("The format of email is invalid\nTry something like: example@mail.com")
                    else alert('Please enter email');
                }
            } else {
                if (this.state.password.length() < 6) alert("Your password is too short, it must have 6 characters at least")
                else alert('Please enter password');
            }
        } else {
            alert('Please enter username');
        }
        return false;
    };

    async update() {
        if (this.CheckTextInput()) {
            var user = firebase.auth().currentUser;
            console.log(JSON.stringify(this.state.email))
            await firebase.database().ref('users/' + user.uid).update({
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                gender: this.state.gender,
                birthday: this.state.birthday,
            })

            


        }
        alert("Profile successfully changed")
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.seccioTitol}>
                    <Text style={{ fontSize: 30 }}> Change your profile</Text>

                </View>
                <View style={styles.textView}>
                    <View style={styles.dades}>
                        <Text >Email</Text>
                        <TextInput
                            onChangeText={(v) => this.setState({ email: v })}
                        >{this.state.email}</TextInput>
                    </View>
                    <View style={styles.dades}>
                        <Text>Username</Text>
                        <TextInput
                            onChangeText={(v) => this.setState({ username: v })}>{this.state.username}</TextInput>
                    </View>

                    <View style={styles.dades}>
                        <Text>Password</Text>
                        <TextInput
                            secureTextEntry={true}
                            onChangeText={(v) => this.setState({ password: v })}
                        >{this.state.password}</TextInput>
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
                                format="YYYY-MM-DD"
                                minDate="1919-01-01"
                                maxDate="2009-12-31"
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
                            //alert(/*this.state.username + " " + this.state.password + " " + this.state.email + " " + this.state.gender + " " + this.state.birthday*/)
                            //this.createUser();
                            Alert.alert(
                                'Update changes',
                                'Do you want to confirm this changes?',
                                [
                                    { text: 'Cancel', onPress: () => { return null } },
                                    {
                                        text: 'Confirm', onPress: () => {
                                            this.update();
                                        }
                                    },
                                ],
                                { cancelable: false }
                            )

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
    dades: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
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
        flex: 2,
    },
    seccioBotons: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FBEAFF',
        marginTop: 10,

    },

});