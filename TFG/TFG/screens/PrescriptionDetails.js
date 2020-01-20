import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import * as FirebaseAPI from '../modules/firebaseAPI'
import firebase from 'firebase'


export default class PrescriptionDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tipusUser: "",
            isLoading: true,
            recepta_uid: this.props.navigation.getParam("recepta_uid"),
            pacientName: '',
            pacient_uid: "",
            metgeName: "",
            dataIni: "",
            dataFi: "",
            timesPerDay: "",
            interval: "",
            numberDoses: "",
            medicine: "",
            dose: "",
            unity: "",
            observations: "",
            refresh: this.props.navigation.state.params.refresh(),

        }
        this.daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        this.monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }

    static navigationOptions = {
        title: "Prescription details",
        headerStyle: {
            backgroundColor: '#2089dc'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontSize: 20,
        },
    }

    componentDidMount() {
        this.getDadesUser()
    }

    async getDadesUser() {
        var user = firebase.auth().currentUser
        let tipus = await FirebaseAPI.comprovarTipusUsuari(user.uid)
        this.setState({ tipusUser: tipus, })
        this.getPrescription()
    }

    async getPrescription() {
        var user = firebase.auth().currentUser
        // console.log("recepta", this.state.recepta_uid)
        let result = await FirebaseAPI.getDadesPrescription(user.uid, this.state.tipusUser, this.state.recepta_uid)
        //console.log("result", result)
        if (this.state.tipusUser == "Doctor") {
            this.setState({
                pacientName: result.data.pacient_name,
                pacient_uid: result.data.pacient_uid,
                dataIni: result.data.dIni,
                dataFi: result.data.dFi,
                timesPerDay: result.data.timesPerDay,
                interval: result.data.interval,
                numberDoses: result.data.numDoses,
                medicine: result.data.medicine,
                dose: result.data.quantitatDoses,
                unity: result.data.unity,
                observations: result.data.observations,
                isLoading: false,
            })
        }
        else if (this.state.tipusUser == "Pacient") {
            this.setState({
                metgeName: result.data.metge_name,
                metge_uid: result.data.metge_uid,
                dataIni: result.data.dIni,
                dataFi: result.data.dFi,
                timesPerDay: result.data.timesPerDay,
                interval: result.data.interval,
                numberDoses: result.data.numDoses,
                medicine: result.data.medicine,
                dose: result.data.quantitatDoses,
                unity: result.data.unity,
                observations: result.data.observations,
                isLoading: false,
            })
        }
    }

    transformaData(time) {
        if (time) {
            time = parseInt(time)
            let data = new Date(time);
            const date = data.getDate(); //Current Date
            const month = (data.getMonth()); //Current Month
            const year = data.getFullYear(); //Current Year
            var day = data.getDay();

            //console.log(month)

            var terminologia
            const dia = this.daysArray[day]
            const mes = this.monthsArray[month]

            if (date == 1 || date == 21 || date == 31) terminologia = "st"
            else if (date == 2 || date == 22) terminologia = "nd"
            else if (date == 3 || date == 23) terminologia = "rd"
            else terminologia = "th"

            return dia + " " + date + terminologia + " of " + mes + ", " + year
        }
        else return ""
    }

    deletePrescription() {
        Alert.alert("Delete appointment", "Do you want to delete this appointment?",
            [
                { text: 'Cancel', onPress: () => { return null } },
                {
                    text: 'Confirm', onPress: () => {
                        var user = firebase.auth().currentUser
                        //console.log("daades", user.uid, this.state.day, this.state.pacient_uid)
                        FirebaseAPI.deletePrescription(user.uid, this.state.pacient_uid, this.state.recepta_uid)
                        this.props.navigation.state.params.refresh()
                        this.props.navigation.navigate("Prescriptions")


                    }
                },
            ],
            { cancelable: false })

    }
    editPrescription() {
        this.props.navigation.navigate("EditPrescription", { recepta_uid: this.state.recepta_uid, refresh: () => this.state.refresh })
    }
    render() {
        if (this.state.isLoading) return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="black"></ActivityIndicator></View>)
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    {this.state.tipusUser == "Doctor" ?
                        <View style={styles.lateral}>
                            <View style={{ width: "50%", paddingTop: 10 }}>
                                <Text style={styles.textTitol}>Patient name</Text>
                            </View>
                            <View style={{ width: "50%", paddingTop: 10 }}>
                                <Text style={styles.textParam}>{this.state.pacientName}</Text>
                            </View>
                        </View>
                        :
                        <View style={styles.lateral}>

                            <View style={{ width: "50%", paddingTop: 10 }}>
                                <Text style={styles.textTitol}>Doctor name</Text>
                            </View>
                            <View style={{ width: "50%", paddingTop: 10 }}>
                                <Text style={styles.textParam}>{this.state.metgeName}</Text>
                            </View>
                        </View>}
                    <View style={styles.lateral}>
                        <View style={styles.viewText}>
                            <Text style={styles.textTitol}>Initial date</Text>
                        </View>
                        <View style={styles.viewText}>
                            <Text style={styles.textParam}>{this.transformaData(this.state.dataIni)}</Text>
                        </View>
                    </View>
                    <View style={styles.lateral}>
                        <View style={styles.viewText}>
                            <Text style={styles.textTitol}>Final date</Text>
                        </View>
                        <View style={styles.viewText}>
                            <Text style={styles.textParam}>{this.transformaData(this.state.dataFi)}</Text>
                        </View>
                    </View>
                    <View style={styles.lateral}>
                        <View style={styles.viewText}>
                            <Text style={styles.textTitol}>Times a day</Text>
                        </View>
                        <View style={styles.viewText}>
                            <Text style={styles.textParam}>{this.state.timesPerDay}</Text>
                        </View>
                    </View>
                    <View style={styles.lateral}>
                        <View style={styles.viewText}>
                            <Text style={styles.textTitol}>Interval between doses</Text>
                        </View>
                        <View style={styles.viewText}>
                            <Text style={styles.textParam}>{this.state.interval}</Text>
                        </View>
                    </View>
                    <View style={styles.lateral}>
                        <View style={styles.viewText}>
                            <Text style={styles.textTitol}>Number of doses</Text>
                        </View>
                        <View style={styles.viewText}>
                            <Text style={styles.textParam}>{this.state.numberDoses}</Text>
                        </View>
                    </View>
                    <View style={styles.lateral}>
                        <View style={styles.viewText}>
                            <Text style={styles.textTitol}>Medicine</Text>
                        </View>
                        <View style={styles.viewText}>
                            <Text style={styles.textParam}>{this.state.medicine}</Text>
                        </View>
                    </View>
                    <View style={styles.lateral}>
                        <View style={styles.viewText}>
                            <Text style={styles.textTitol}>Dose</Text>
                        </View>
                        <View style={styles.viewText}>
                            <Text style={styles.textParam}>{this.state.dose} {this.state.unity} </Text>
                        </View>
                    </View>
                    <View style={[styles.lateral, { flexDirection: 'column' }]}>
                        <View style={styles.viewText}>
                            <Text style={styles.textTitol}>Observations</Text>
                        </View>
                        <View style={{ paddingTop: 10, width: "100%" }}>
                            <Text style={styles.textParam} >{this.state.observations}</Text>
                        </View>
                    </View>
                    {this.state.tipusUser == "Doctor" ?
                        <View style={styles.seccioBotons}>
                            <TouchableOpacity
                                onPress={() => { this.editPrescription() }}
                                style={{ width: '48%', alignItems: 'center', height: 52, justifyContent: 'center', backgroundColor: '#2196F3' }}
                            >
                                <View >
                                    <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>EDIT PRESCRIPTION</Text>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { this.deletePrescription() }}
                                style={{ width: '48%', alignItems: 'center', height: 52, justifyContent: 'center', backgroundColor: '#2196F3' }}
                            >
                                <View >
                                    <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>DELETE PRESCRIPTION</Text>
                                </View>
                            </TouchableOpacity>
                        </View> :
                        <View></View>}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    lateral: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#2089dc',
    },
    viewText: {
        width: "50%",
        paddingTop: 40,
    },
    textTitol: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    textParam: {
        fontSize: 15,
    },
    seccioBotons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 30,
    },
});
