import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity, ToastAndroid, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import * as FirebaseAPI from '../modules/firebaseAPI'
import firebase from 'firebase'
import { Icon, Header } from 'react-native-elements';

export default class InfoMigranyesPropies extends Component {

    constructor(props) {
        super(props);

        //console.log(this.props)
        //console.log(user_email.email_user)
        this.state = {
            
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
        this.colorsDots = [
            '#7cb1b9',
            '#96b897',
            '#b3bd74',
            '#d0c255',
            '#f2c93d',
            '#e7a93c',
            '#de8d3e',
            '#d6713b',
            '#d3573d',
            '#cf4140',
            '#B93B69',
        ],
        this.intensity = [
            'No pain',
            'Very mild',
            'Discomforting',
            'Tolerable',
            'Distressing',
            'Very distressing',
            'Intense',
            'Very intense',
            'Utterly horrible',
            'Unbearable pain',
            'Worst pain imaginable'

        ]
    }
    static navigationOptions = {
        title: "Migraine summary",
        headerStyle: {
            backgroundColor: '#2089dc'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontSize: 20,
        },
    }


    componentDidMount() {
        this.getInfoMigranya()
    }
    async getInfoMigranya() {
        var user = firebase.auth().currentUser
        let tipus = await FirebaseAPI.comprovarTipusUsuari(user.uid)
        let result = await FirebaseAPI.getInfoMigranya(user.uid, this.state.migranya, tipus)
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
    getDuration(dIni, dFi) {
        if (dIni && dFi) {
            let data = new Date(dFi - dIni)
            console.log("data", data)
            var hour = data.getHours() - 1;
            var min = data.getMinutes();
            return hour + 'h' + min + 'm'
        }
        else return ""
    }
    transformaHoraMin(time) {
        if (time) {
            let data = new Date(parseInt(time));
            var hour = data.getHours();
            var min = data.getMinutes();
            if (hour < 10) hour = '0' + hour
            if (min < 10) min = '0' + min
            return hour + ":" + min
        }
        else return ""
    }
    transformaDiaMesAny(time) {
        if (time) {
            let data = new Date(parseInt(time));
            var date = data.getDate(); //Current Date
            var month = data.getMonth() + 1; //Current Month
            var year = data.getFullYear(); //Current Year
            if (date < 10) date = '0' + date
            if (month < 10) month = '0' + month
            return date + '-' + month + '-' + year
        }
        else return ""
    }
    transformaArrays(array) {
        let resultat = ""
        for (i = 0; i < array.length; i++) {
            if (i == 0) resultat += array[i]
            else resultat += ", " + array[i]
        }
        return resultat
    }
    render() {
        if (!this.state.isLoaded) return (<View style={[styles.container, { justifyContent: 'center' }]}><ActivityIndicator size="large" /></View>)
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={{ flexDirection: 'row', backgroundColor: '#6483DE', paddingVertical: 5, borderBottomColor: '#fff', borderBottomWidth: 1 }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={require('./images/calendar-clock.png')}></Image>
                            <Text style={styles.titolsHora}>DURATION</Text>
                        </View>
                        <View style={{ flex: 4, flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.titolsHora}>START</Text>
                                <Text style={styles.horesMin}>{this.transformaHoraMin(this.state.dataInici)}</Text>
                                <Text style={styles.data}>{this.transformaDiaMesAny(this.state.dataInici)}</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.titolsHora}>END</Text>
                                <Text style={styles.horesMin}>{this.transformaHoraMin(this.state.dataFinal)}</Text>
                                <Text style={styles.data}>{this.transformaDiaMesAny(this.state.dataFinal)}</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.titolsHora}>DURATION</Text>
                                <Text style={styles.horesMin}>{this.getDuration(this.state.dataInici, this.state.dataFinal)}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.vistaGeneral}>
                        <View style={styles.vistaColumna}>
                            <Image style={{ width: 40, height: 40 }} source={require('./images/flash.png')}></Image>
                            <Text style={styles.titolsHora}>INTENSITY</Text>
                        </View>
                        <View style={{ flex: 4, borderBottomColor: '#6483DE', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.colorsDots[parseInt(this.state.intensitatDolor)] }}>
                            <Text style={styles.horesMin}>{this.intensity[parseInt(this.state.intensitatDolor)]}</Text>
                        </View>
                    </View>
                    <View style={styles.vistaGeneral}>
                        <View style={styles.vistaColumna}>
                            <Image style={{ width: 60, height: 50, resizeMode: 'contain' }} source={require('./images/headparts2.png')}></Image>
                            <Text style={styles.titolsHora}>PAIN ZONE</Text>
                        </View>
                        <View style={styles.vistaArray}>
                            <Text style={styles.textArray}>{this.transformaArrays(this.state.zonaCap)}</Text>
                        </View>
                    </View>
                    <View style={styles.vistaGeneral}>
                        <View style={styles.vistaColumna}>
                            <Image style={{ width: 50, height: 50, resizeMode: 'contain' }} source={require('./images/symptomsImage.png')}></Image>
                            <Text style={styles.titolsHora}>SYMPTOMS</Text>
                        </View>
                        <View style={styles.vistaArray}>
                            <Text style={styles.textArray}>{this.transformaArrays(this.state.simptomes)}</Text>
                        </View>
                    </View>
                    <View style={styles.vistaGeneral}>
                        <View style={styles.vistaColumna}>
                            <Image style={{ width: 40, height: 40, resizeMode: 'contain' }} source={require('./images/causes.png')} ></Image>
                            <Text style={styles.titolsHora}>CAUSES</Text>
                        </View>
                        <View style={styles.vistaArray}>
                            <Text style={styles.textArray}>{this.transformaArrays(this.state.causes)}</Text>
                        </View>
                    </View>
                    <View style={styles.vistaGeneral}>
                        <View style={styles.vistaColumna}>
                            <Image style={{ width: 40, height: 40, resizeMode: 'contain' }} source={require('./images/run.png')}></Image>
                            <Text style={styles.titolsHora}>AFECTED</Text>
                            <Text style={styles.titolsHora}>ACTIVITIES</Text>
                        </View>
                        <View style={styles.vistaArray}>
                            <Text style={styles.textArray}>{this.transformaArrays(this.state.impediments)}</Text>
                        </View>
                    </View>
                    <View style={styles.vistaGeneral}>
                        <View style={styles.vistaColumna}>
                            <Image style={{ width: 40, height: 40, resizeMode: 'contain' }} source={require('./images/exercise.png')}></Image>
                            <Text style={styles.titolsHora}>EXERCISE</Text>
                        </View>
                        <View style={styles.vistaArray}>
                            <Text style={styles.textArray}>{this.state.exercicis}</Text>
                        </View>
                    </View>
                    <View style={styles.vistaGeneral}>
                        <View style={styles.vistaColumna}>
                            <Image style={{ width: 40, height: 40, resizeMode: 'contain' }} source={require('./images/period.png')}></Image>
                            <Text style={styles.titolsHora}>PERIOD</Text>
                        </View>
                        <View style={styles.vistaArray}>
                            <Text style={styles.textArray}>{this.state.menstruacio}</Text>
                        </View>
                    </View>
                    <View style={styles.vistaGeneral}>
                        <View style={styles.vistaColumna}>
                            <Image style={{ width: 40, height: 40, resizeMode: 'contain' }} source={require('./images/pill.png')}></Image>
                            <Text style={{ fontSize: 11, color: "#fff" }}>MEDICATION</Text>
                        </View>
                        <View style={styles.vistaArray}>
                            <Text style={styles.textArray}>{this.transformaArrays(this.state.medicaments)}</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',


    },
    titolsHora: {
        fontSize: 12,
        color: "#fff"
    },
    horesMin: {
        fontSize: 18,
        color: '#fff'
    },
    data: {
        fontSize: 15,
        color: '#fff'
    },
    textArray: {
        fontSize: 18,
        paddingHorizontal: 5
    },
    vistaGeneral: {
        flexDirection: 'row',

    },
    vistaColumna: {
        flex: 1,
        backgroundColor: '#6483DE',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 5,
        paddingVertical: 10,
        borderBottomColor: '#fff',
        borderBottomWidth: 1
    },
    vistaArray: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E9EFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#6483DE'

    }
});
