import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import * as FirebaseAPI from '../modules/firebaseAPI'
import firebase from 'firebase'
import { Icon, Header } from 'react-native-elements';


export default class InfoMigranya extends Component {

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

        let result = await FirebaseAPI.getInfoMigranya(this.state.uid, this.state.migranya, "Pacient")
        console.log("Migranya " + this.state.migranya + " : ", result)
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
            var hour = data.getHours();
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

    render() {
        if (!this.state.isLoaded) return (<View style={[styles.container, { justifyContent: 'center' }]}><ActivityIndicator size="large" /></View>)
        return (
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', backgroundColor: '#6483DE', paddingVertical: 5 }}>
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
                <View style={{ flexDirection: 'row',backgroundColor: '#6483DE',  }}>
                    <View style={{flex:1, backgroundColor:'#6483DE', justifyContent:'center', alignItems:'center', paddingVertical:5}}>
                        <Image style={{width:40, height:40}} source={require('./images/flash.png')}></Image>
                        <Text style={styles.titolsHora}>INTENSITY</Text>
                    </View>
                    <View style={{flex:4, justifyContent:'center', alignItems:'center', backgroundColor:this.colorsDots[parseInt(this.state.intensitatDolor)]}}>
                        <Text style={styles.horesMin}>{this.intensity[parseInt(this.state.intensitatDolor)]}</Text>
                    </View>
                </View>
                <Text> {this.state.zonaCap}</Text>
                <Text> {this.state.simptomes}</Text>
                <Text> {this.state.causes}</Text>
                <Text> {this.state.impediments}</Text>
                <Text> {this.state.exercicis}</Text>
                <Text> {this.state.menstruacio}</Text>
                <Text> {this.state.medicaments}</Text>
            </View>
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
    }
});
