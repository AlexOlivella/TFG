import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ToastAndroid, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import firebase from 'firebase'
import * as FirebaseAPI from '../modules/firebaseAPI'
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker'
import { tsThisType } from '@babel/types';
import { Header, Icon } from 'react-native-elements'
import DateTimePicker from "react-native-modal-datetime-picker";
import * as ImagePicker from 'expo-image-picker';


export default class Register extends Component {

    constructor(props) {
        super(props);
        //console.log(this.props)
        //console.log(user_email.email_user)
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            gender: "",
            birthday: "",
            dateSelected: false,
            isLoaded: false,
            photo:"",

        }

    };
    componentWillMount() {
        this.getUser();
        console.ignoredYellowBox = [
            'Setting a timer'
        ]
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
        let tipus = await FirebaseAPI.comprovarTipusUsuari(user.uid)
        let data = await FirebaseAPI.readUserData(user.uid, tipus)

        //console.log("Data: ", data);
        this.setState({
            email: user.email,
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            birthday: data.birthday,
            isLoaded: true,
        })

    }

    CheckTextInput = () => {
        if (this.state.firstName != '') {
            if (this.state.lastName != '') {

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
                alert('Please enter a last name');
            }
        } else {
            alert('Please enter a first name');
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
        var tipus = await FirebaseAPI.comprovarTipusUsuari(user.uid)
        if (this.CheckTextInput()) {
            await FirebaseAPI.updateProfile(
                user.uid,
                tipus,
                this.state.firstName.trim(),
                this.state.lastName.trim(),
                this.state.gender,
                this.state.birthday)
            //console.log("resposta: ", resposta)
        }
        this.props.navigation.navigate("Home")
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
        this.setState({ birthday: date.getTime(), dateSelected: true })
        this.hideDateTimePicker();

    };

    transformaData(time) {
        if (time) {
            let data = new Date(time);
            var date = data.getDate(); //Current Date
            var month = data.getMonth() + 1; //Current Month
            var year = data.getFullYear(); //Current Year
            if (date < 10) date = '0' + date
            if (month < 10) month = '0' + month
            return date + '-' + month + '-' + year
        }
        else return ""
    }


    async handleChoosePhoto() {
        const options = {
            allowsEditing: true
        }

        let response = await ImagePicker.launchImageLibraryAsync(options)
        console.log("response", response)
        if (response.uri) {
            this.setState({ photo: response })
        }

        console.log("photo", this.state.photo)
    }

    render() {
        var { navigation } = this.props;
        var navigate = navigation.navigate;
        if (!this.state.isLoaded) return (
            <View >
                <Header
                    style={{ width: '100%' }}
                    placement="left"
                    leftComponent={<Icon name='menu' color="#fff"  onPress={() => this.obrirDrawer()} />}
                    centerComponent={{ text: 'Change your profile', style: { color: '#fff', fontSize: 20, fontWeight: 'bold' } }}
                />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color='black'></ActivityIndicator>
                </View>
            </View>)

        return (
            <View style={styles.container}>
                <Header
                    style={{ width: '100%' }}
                    placement="left"
                    leftComponent={<Icon name='menu' color="#fff"  onPress={() => this.obrirDrawer()} />}
                    centerComponent={{ text: 'Change your profile', style: { color: '#fff', fontSize: 20, fontWeight: 'bold' } }}
                />
                <View style={styles.seccioTitol}>
                    <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
                        <View>
                            {this.state.photo ? this.state.photo && (<Image
                                source={{ uri: this.state.photo.uri }}
                                style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
                            />) : <Image style={{ width: 100, height: 100, borderRadius: 100 / 2 }} source={require('./images/no-profile-picture.jpg')}></Image>}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.textView}>

                    <View style={styles.dades}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>First Name</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <TextInput style={{ fontSize: 20 }}
                                onChangeText={(v) => this.setState({ firstName: v.trim() })}>
                                {this.state.firstName}</TextInput>
                        </View>
                    </View>
                    <View style={styles.dades}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Last Name</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <TextInput style={{ fontSize: 20 }}
                                onChangeText={(v) => this.setState({ lastName: v.trim() })}>
                                {this.state.lastName}</TextInput>
                        </View>
                    </View>
                    <View style={styles.dades}>
                        <View style={{ width: '50%', justifyContent: 'flex-end' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingBottom: 10 }}>Gender</Text>
                        </View>
                        <View style={{ width: "50%", }}>
                            <Dropdown
                                data={[{
                                    value: "Male"
                                }, {
                                    value: "Female"
                                }, {
                                    value: "Other"
                                }]}
                                style={{ fontSize: 20 }}
                                value={this.state.gender}
                                onChangeText={(itemValue) => this.setState({ gender: itemValue })}
                            />
                        </View>
                    </View>
                    <View style={styles.dades}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Date of birth</Text>
                        </View>
                        <View style={{ width: "50%", }}>

                            <DateTimePicker
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this.handleDatePicked}
                                onCancel={this.hideDateTimePicker}
                                mode='date'
                            />
                            <View style={styles.addName}>
                                <TouchableOpacity onPress={this.showDateTimePicker} >
                                    <View>
                                        <Text style={{ fontSize: 20, borderBottomColor: '#B4A9A9', borderBottomWidth: 1, }}>{this.transformaData(this.state.birthday)}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.seccioBotons}>

                    <TouchableOpacity
                        onPress={() => {
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

                        }}
                        style={{ width: '48%', alignItems: 'center', height: 52, justifyContent: 'center', backgroundColor: '#2196F3' }}
                    >
                        <View >
                            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>UPDATE PROFILE</Text>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { navigate("UpdateEmailPass") }}
                        style={{ width: '48%', alignItems: 'center', height: 52, justifyContent: 'center', backgroundColor: '#2196F3' }}
                    >
                        <View >
                            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>CHANGE PASSWORD</Text>
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

    },  seccioTitol: {
        flex: 1,
        alignItems: 'center',
        paddingTop:10
      },

});