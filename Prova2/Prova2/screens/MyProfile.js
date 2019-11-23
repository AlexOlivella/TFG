import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ToastAndroid, TouchableOpacity } from 'react-native';
import firebase from 'firebase'
import * as FirebaseAPI from '../modules/firebaseAPI'
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker'
import { tsThisType } from '@babel/types';
import { Header, Icon } from 'react-native-elements'
import DateTimePicker from "react-native-modal-datetime-picker";


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
                birthday: this.state.birthday
                
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

    obrirDrawer = () => {
		this.props.navigation.openDrawer();
	}
    async updateProfile() {
        //this.updateEmail();
        //let contraCorrecte = this.updatePassword();
        var user = firebase.auth().currentUser;
        if (this.CheckTextInput()) {
            let resposta = await FirebaseAPI.updateProfile(
                user.uid,
                this.state.username, 
                this.state.gender, 
                this.state.birthday)
            console.log("resposta: ", resposta)
        }
        ToastAndroid.show("Profile updated succesfully", ToastAndroid.SHORT)
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
      };
    
      hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
      };
    
      handleDatePicked = (date) => {
        //console.log("A date inicial has been picked: ", date);
        this.setState({ birthday: date.getTime() })
        this.hideDateTimePicker();
    
      };

    transformaData(time) {
        if (time) {
            let data = new Date(time);
            var date = data.getDate(); //Current Date
            var month = data.getMonth() + 1; //Current Month
            var year = data.getFullYear() ; //Current Year
            return date + '-' + month + '-' + year 
        }
        else return ""
    }

    render() {
        var { navigation } = this.props;
        var navigate = navigation.navigate;
        return (
            <View style={styles.container}>
                <Header
						style={{width:'100%'}}
						placement="left"
						leftComponent={<Icon name='menu' onPress={ ()=> this.obrirDrawer()} />}
						centerComponent={{ text: 'Change your profile', style: { color: '#fff' } }}
					/>
                
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
                        <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
              mode='date'
            />                    

            <TouchableOpacity onPress={this.showDateTimePicker} >
              <Text >Select birthday {this.transformaData(this.state.birthday)}</Text>
            </TouchableOpacity>
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