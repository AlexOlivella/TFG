import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import * as FirebaseAPI from '../modules/firebaseAPI'
import firebase from 'firebase'
import { Header } from 'react-native-elements';


export default class InfoMigranya extends Component {

    constructor(props) {
        super(props);

        //console.log(this.props)
        //console.log(user_email.email_user)
        this.state = {
            uid: this.props.navigation.getParam("pacient"),
            migranya: this.props.navigation.getParam("migranya"),
            dataInici: "",
            dataFinal:"",
            intensitatDolor:"",
            zonaCap:"",
            simptomes:"",
            causes:"",
            menstruacio:"",
            exercicis:"",
            impediments:"",
            medicaments:"",
        }
    }
    static navigationOptions = {
		headerStyle:{
            backgroundColor: '#2089dc'
        }
    }
    
    componentDidMount(){
        this.getInfoMigranya()
    }
    async getInfoMigranya() {
        let result = await FirebaseAPI.getInfoMigranya(this.state.uid, this.state.migranya)
        //console.log("Migranya " + this.state.migranya + " : ", result)
        this.setState({
            dataInici: this.state.migranya,
            dataFinal: result.dataFinal,
            intensitatDolor: result.intensitatDolor,
            zonaCap: result.zonaCap,
            simptomes: result.simptomes,
            causes: result.causes,
            impediments: result.impediments,
            exercicis: result.exercicis,
            menstruacio: result.menstruacio,
            medicaments: result.medicaments
        })
    }
    render() {
        
        return (
            <View style={styles.container}>
                <View>
                    <Text> {this.state.dataInici}</Text>
                    <Text> {this.state.dataFinal}</Text>
                    <Text> {this.state.intensitatDolor}</Text>
                    <Text> {this.state.zonaCap}</Text>
                    <Text> {this.state.simptomes}</Text>
                    <Text> {this.state.causes}</Text>
                    <Text> {this.state.impediments}</Text>
                    <Text> {this.state.exercicis}</Text>
                    <Text> {this.state.menstruacio}</Text>
                    <Text> {this.state.medicaments}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7BF0E6',
    }
});
