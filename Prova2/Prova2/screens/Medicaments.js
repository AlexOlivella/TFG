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

        if (element === "No") selected = {}
        selected[element] = !selected[element];
        //console.log(selected);
        this.setState({ selected: selected })
    }
    next() {
        var { navigation } = this.props;
        var dataIni = navigation.getParam('dataIni');
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
        console.log(medicaments)

        if (medicaments.length === 0)
            Alert.alert("Error", "Select at least 1 option")
        else {
            this.props.navigation.navigate(
                "Summary",
                {
                    dataIni,
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
            console.log("medicaments")
        }
    }
    render() {

        return (
            <View style={styles.container}>
                <Header
                    centerComponent={{ text: 'Medication', style: { color: '#fff' } }}
                >
                </Header>
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView contentContainerStyle={{ flexWrap: 'wrap' }}>
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

                    </ScrollView>
                </SafeAreaView>

                <View style={{}}>
                    <Button
                        onPress={() => {
                            this.next()
                        }}
                        title="Next"
                    >

                    </Button>
                    <Button
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
                    >
                    </Button>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7BF0E6',
    },
    safeArea: {
        flex: 8,
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
    }
});
