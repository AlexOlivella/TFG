import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import firebase from 'firebase'
import { readUserData } from '../modules/firebaseAPI'
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
            newEmail: "",
            currentPassword: "",
            newPassword: "",
            confirmedPassword: "",
            username: "",
            gender: "",
            birthday: "",
            photoUrl: "",
            uid: "",
            emailVerified: "",

        }

    };
    componentWillMount() {
        this.getUser();
    }
    static navigationOptions = {
        headerTitle: "My Profile",

    };

    getDateString(time) {
        let date = new Date(time);
      return  date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    }

    async getUser() {
        var user = firebase.auth().currentUser;
        console.log("getUser", user)

        //console.log("current user: ", user)
        if (user != null) {
            //this.setState({name: user.displayName}) ;

            //this.setState({photoUrl}) = user.photoURL;
            //this.setState({emailVerified}) = user.emailVerified;
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
            let data = await readUserData(user.uid)
            console.log("Data: ", data);
            this.setState({ uid: user.uid })   // The user's ID, unique to the Firebase project. Do NOT use

            this.setState({
                username: data.username,
                gender: data.gender,
                birthday: this.getDateString(data.birthday)
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
                    if (!this.validate(this.state.email)) alert("The format of email is invalid\nTry something like: example@mail.com")
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
    async updateProfile() {
        this.updateEmail();
        let contraCorrecte = this.updatePassword();
        var user = firebase.auth().currentUser;
        console.log(JSON.stringify(this.state.email))
        if (contraCorrecte) {
            await firebase.database().ref('users/' + user.uid).update({
                email: this.state.email,
                username: this.state.username,
                password: this.state.newPassword,
                gender: this.state.gender,
                birthday: this.state.birthday,
            })
            alert("Profile successfully changed")
        }
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
                            onChangeText={(v) => this.setState({ email: v.trim() })}
                        >{this.state.email}</TextInput>
                    </View>
                    <View style={styles.dades}>
                        <Text>Username</Text>
                        <TextInput
                            onChangeText={(v) => this.setState({ username: v.trim() })}>
                            {this.state.username}</TextInput>
                    </View>

                    <View style={styles.dades}>
                        <Text>Current password</Text>
                        <TextInput
                            //secureTextEntry={true}
                            onChangeText={(v) => this.setState({ currentPassword: v })}
                        >{this.state.currentPassword}</TextInput>
                    </View>
                    <View style={styles.dades}>
                        <Text>New password</Text>
                        <TextInput
                            //secureTextEntry={true}
                            onChangeText={(v) => this.setState({ newPassword: v })}
                        >{this.state.newPassword}</TextInput>
                    </View>
                    <View style={styles.dades}>
                        <Text>Confirm new password</Text>
                        <TextInput
                            //secureTextEntry={true}
                            onChangeText={(v) => this.setState({ confirmedPassword: v })}
                        >{this.state.confirmedPassword}</TextInput>
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
        backgroundColor: '#FBEAFF',
        marginTop: 10,

    },

});