import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import * as FirebaseAPI from '../modules/firebaseAPI'
import firebase from 'firebase'
import { Header, Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';


export default class InfoMigranyesPropies extends Component {

    constructor(props) {
        super(props);

        //console.log(this.props)
        //console.log(user_email.email_user)
        this.state = {
            uid: this.props.navigation.getParam("pacient"),
            migranya: this.props.navigation.getParam("migranya"),
            dataInici: "",
            dataFinal: "",
            intensitatDolor: "",
            zonaCap: "",
            simptomes: "",
            causes: "",
            menstruacio: "",
            exercicis: "",
            impediments: "",
            medicaments: "",
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

    componentDidMount() {
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
        if (!this.state.isLoaded) return (<View style={[styles.container, { justifyContent: 'center' }]}><ActivityIndicator size="large" /></View>)
        return (
            <View style={styles.container}>
                <View style={styles.columna}>
                    <Ionicons name="clock-start"></Ionicons>
                    <Text> {this.state.dataInici}</Text>
                </View>
                <View style={styles.columna}>
                    <Ionicons name="clock-end"></Ionicons>
                    <Text> {this.state.dataFinal}</Text>

                </View>
                <View style={styles.columna}>
                    <Ionicons name="emoji-sad"></Ionicons>
                    <Text> {this.state.intensitatDolor}</Text>
                </View>
                <View style={styles.columna}>
                    <Ionicons name="location-searching"/>
                    <Text> {this.state.zonaCap}</Text>

                </View>
                <View style={styles.columna}>
                    <Ionicons name="solution1"></Ionicons>
                    <Text> {this.state.simptomes}</Text>

                </View>
                <View style={styles.columna}>
                    <Ionicons name="bed"></Ionicons>
                    <Text> {this.state.causes}</Text>

                </View>
                <View style={styles.columna}>
                    <Ionicons name="office-building"></Ionicons>
                    <Text> {this.state.impediments}</Text>

                </View>
                <View style={styles.columna}>
                    <Ionicons name="rus-fast"></Ionicons>
                    <Text> {this.state.exercicis}</Text>

                </View>
                <View style={styles.columna}>
                    <Ionicons name="ios-water"></Ionicons>
                    <Text> {this.state.menstruacio}</Text>

                </View>
                <View style={styles.columna}>
                    <Ionicons name="pills"></Ionicons>
                    <Text> {this.state.medicaments}</Text>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"space-between",
        backgroundColor: '#7BF0E6',
    },
    columna: {
        flexDirection: 'row',

    },
});
