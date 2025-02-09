import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import * as FirebaseAPI from '../modules/firebaseAPI'
import firebase from 'firebase'
import { Header } from 'react-native-elements';


export default class InfoMigranyesPropies extends Component {

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
            isLoaded: false,
        }
    }
    static navigationOptions = {
		headerStyle: {
            backgroundColor: '#2089dc'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontSize: 20,
        },
    }
    
    componentDidMount(){
        //console.log("usuari: ", this.state.uid, "migranya: ", this.state.migranya)
        this.getInfoMigranya()
    }
    async getInfoMigranya() {
        let tipus = await FirebaseAPI.comprovarTipusUsuari(this.state.uid)
        let result = await FirebaseAPI.getInfoMigranya(this.state.uid, this.state.migranya, tipus)
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
            medicaments: result.medicaments, 
            isLoaded: true
        })
    }
    render() {
        if (!this.state.isLoaded) return (<View style={[styles.container, {justifyContent: 'center'}]}><ActivityIndicator  size="large" /></View>)
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
