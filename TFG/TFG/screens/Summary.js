import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity, ToastAndroid, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import * as FirebaseAPI from '../modules/firebaseAPI'
import firebase from 'firebase'
import { Header } from 'react-native-elements';


export default class Summary extends Component {

    constructor(props) {
        super(props);
        //console.log(this.props)
        //console.log(user_email.email_user)
        var { navigation } = this.props;
        this.state = {
            dataInici: navigation.getParam('dataInici'),
            dataFinal: navigation.getParam('dataFinal'),
            intensitatDolor: navigation.getParam('intensitatDolor'),
            zonaCap: navigation.getParam('zonaCap'),
            simptomes: navigation.getParam('simptomes'),
            causes: navigation.getParam('causes'),
            menstruacio: navigation.getParam('menstruacio') || "",
            exercicis: navigation.getParam('exercicis'),
            impediments: navigation.getParam('impediments'),
            medicaments: navigation.getParam('medicaments'),
            isLoaded: true,

        },
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

    };
    static navigationOptions = {
        header: null
    }

    async next() {
        var { navigation } = this.props;
        this.setState({
            isLoaded: false,

        })
        //console.log("this.state", this.state)
        var user = firebase.auth().currentUser;
        var tipus = await FirebaseAPI.comprovarTipusUsuari(user.uid)
        await FirebaseAPI.createMigranya(
            user.uid,
            this.state.dataInici,
            this.state.dataFinal,
            this.state.intensitatDolor,
            this.state.zonaCap,
            this.state.simptomes,
            this.state.causes,
            this.state.menstruacio,
            this.state.exercicis,
            this.state.impediments,
            this.state.medicaments,
            tipus,
        )
        this.setState({ isLoaded: true })
        this.props.navigation.navigate(
            "Home"
        )
        ToastAndroid.show("Migraine added succesfully", ToastAndroid.SHORT)

        //console.log("summary")
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
        var loading
        if (!this.state.isLoaded) loading = <View>
            <ActivityIndicator size="large" color="black"></ActivityIndicator>
        </View>
        return (
            <View style={styles.container}>
                <Header
                 centerComponent={{ text: 'Summary', style: { color: '#fff', fontSize: 20, fontWeight: 'bold' } }}
                ></Header>
                <SafeAreaView style={[styles.container, {flex:8}]}>
                    <ScrollView>
                        <View style={{ flexDirection: 'row', backgroundColor: '#6483DE', paddingVertical: 5, borderBottomColor: '#fff', borderBottomWidth: 1 }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <Image style={{width:40, height:40}} source={require('./images/calendar-clock.png')}></Image>
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
                {loading}
                <View style={styles.seccioBotons}>
                <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                'Cancel',
                                'Do you want to cancel this process?',
                                [
                                    { text: 'Cancel', onPress: () => { return null } },
                                    {
                                        text: 'Confirm', onPress: () => {
                                            this.props.navigation.navigate("Home")
                                        }
                                    },
                                ],
                                { cancelable: false }
                            )
                        }}
                        style={{ width: '48%', alignItems: 'center', height: 52, justifyContent: 'center', backgroundColor: '#2196F3' }}
                    >
                        <View >
                            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>CANCEL</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                'Confirm',
                                'Do you want to confirm this data?',
                                [
                                    { text: 'Cancel', onPress: () => { return null } },
                                    {
                                        text: 'Confirm', onPress: () => {
                                            this.next()
                                        }
                                    },
                                ],
                                { cancelable: false }
                            )
                        }}
                        style={{ width: '48%', alignItems: 'center', height: 52, justifyContent: 'center', backgroundColor: '#2196F3' }}
                    >
                        <View >
                            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>CONFIRM</Text>

                        </View>
                    </TouchableOpacity>
                    
                </View>
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

    },
    seccioBotons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor:'#E9EFFF'

    },
});

