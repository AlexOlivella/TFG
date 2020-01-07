import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity, TouchableHighlight, ScrollView, SafeAreaView } from 'react-native';
import { Header } from 'react-native-elements';



export default class Medicaments extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            selected: {
                "No": false,
                "Aspirin 1000mg": false,
                "Paracetamol 1000mg": false,
                "Metamizol 500mg": false,
                "Sodic naproxen 500mg": false,
                "Ibuprofen 200mg": false,
                "Dexketoprofen trometamol 25mg": false,
                "Almotriptan 12.5mg": false,
                "Zolmitriptan 5mg": false,
                "Eletriptan 40mg": false,
                "Rizatriptan 5mg": false,
                "Sumatriptan 25mg": false,
                "Chlorpromazine 10mg": false,
                "Metoclopramide 20mg": false,
                "Propranolol 60mg": false,
                "Timolol 60mg": false,
                "No": false,
                "Others": false,

            },
        }
    }
    select(element) {
        let selected = this.state.selected;

        if (element === "No") selected["No"] = true
        if (selected["No"] === true) selected = {}
        if (selected[element] != selected["No"]) selected["No"] = false
        selected[element] = !selected[element];
        //console.log(selected);
        this.setState({ selected: selected })
    }
    next() {
        var { navigation } = this.props;
        var dataInici = navigation.getParam('dataInici');
        var dataFinal = navigation.getParam('dataFinal');
        var intensitatDolor = navigation.getParam('intensitatDolor')
        var zonaCap = navigation.getParam('zonaCap')
        var simptomes = navigation.getParam('simptomes')
        var causes = navigation.getParam('causes')
        var menstruacio = navigation.getParam('menstruacio')
        var exercicis = navigation.getParam('exercicis')
        var impediments = navigation.getParam('impediments')
        let medicaments = [];
        for (let medicament in this.state.selected) {
            if (this.state.selected[medicament])
                medicaments.push(medicament)
        }
        //console.log(medicaments)

        if (medicaments.length === 0)
            Alert.alert("Error", "Select at least 1 option")
        else {
            this.props.navigation.navigate(
                "Summary",
                {
                    dataInici,
                    dataFinal,
                    intensitatDolor,
                    zonaCap,
                    simptomes,
                    causes,
                    impediments,
                    exercicis,
                    menstruacio,
                    medicaments: medicaments

                }
            )
            //console.log("medicaments")
        }
    }
    render() {

        return (
            <View style={styles.container}>
                <Header
                    centerComponent={{ text: 'Select your medication', style: { color: '#fff', fontSize:20 } }}
                >
                </Header>
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView >
                        <View style={styles.lateral}>
                            <TouchableHighlight
                                style={
                                    this.state.selected["No"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("No")}>
                                <Text>No</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Aspirin 1000mg"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Aspirin 1000mg")}>
                                <Text>Aspirin 1000mg</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Paracetamol 1000mg"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Paracetamol 1000mg")}>
                                <Text>Paracetamol 1000mg</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.lateral}>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Metamizol 500mg"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Metamizol 500mg")}>
                                <Text>Metamizol 500mg</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Sodic naproxen 500mg"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Sodic naproxen 500mg")}>
                                <Text>Sodic naproxen 500mg</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Ibuprofen 200mg"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Ibuprofen 200mg")}>
                                <Text>Ibuprofen 200mg</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.lateral}>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Dexketoprofen trometamol 25mg"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Dexketoprofen trometamol 25mg")}>
                                <Text>Dexketoprofen trometamol 25mg</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Almotriptan 12.5mg"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Almotriptan 12.5mg")}>
                                <Text>Almotriptan 12.5mg</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Zolmitriptan 5mg"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Zolmitriptan 5mg")}>
                                <Text>Zolmitriptan 5mg</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.lateral}>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Eletriptan 40mg"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Eletriptan 40mg")}>
                                <Text>Eletriptan 40mg</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Rizatriptan 5mg"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Rizatriptan 5mg")}>
                                <Text>Rizatriptan 5mg</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Sumatriptan 25mg"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Sumatriptan 25mg")}>
                                <Text>Sumatriptan 25mg</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.lateral}>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Chlorpromazine 10mg"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Chlorpromazine 10mg")}>
                                <Text>Chlorpromazine 10mg</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Metoclopramide 20mg"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Metoclopramide 20mg")}>
                                <Text>Metoclopramide 20mg</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Propranolol 60mg"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Propranolol 60mg")}>
                                <Text>Propranolol 60mg</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.lateral}>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Timolol 60mg"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Timolol 60mg")}>
                                <Text>Timolol 60mg</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Others"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Others")}>
                                <Text>Others</Text>
                            </TouchableHighlight>
                        </View>
                    </ScrollView>
                </SafeAreaView>
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
                        title="Cancel"
                        style={{ width: '48%', alignItems: 'center', height: 52, justifyContent: 'center', backgroundColor: '#2196F3' }}
                    >
                        <View >
                            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>CANCEL</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.next()
                    }}
                        title="Next"
                        style={{ width: '48%', alignItems: 'center', height: 52, justifyContent: 'center', backgroundColor: '#2196F3' }}
                    >
                        <View >
                            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>NEXT</Text>
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
    safeArea: {
        flex: 8,
    },
    lateral: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    seleccionat: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 105,
        height: 105,
        backgroundColor: '#38B3EF',
        borderRadius: 50,
    },
    noSeleccionat: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        backgroundColor: '#3BD3EF',
        borderRadius: 50,
    },
    seccioBotons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

    },
});
