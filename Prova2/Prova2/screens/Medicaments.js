import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity } from 'react-native';



export default class Medicaments extends Component {
    static navigationOptions = {
        header: null
    }
    next(medicament) {
        var { navigation } = this.props;
        var dataIni = navigation.getParam('dataIni');
        var intensitatDolor = navigation.getParam('intensitatDolor')
        var zonaCap = navigation.getParam('zonaCap')
        var simptomes = navigation.getParam('simptomes')
        var causes = navigation.getParam('causes')
        var menstruacio = navigation.getParam('menstruacio')
        var exercicis = navigation.getParam('exercicis')
        var impediments = navigation.getParam('impediments')
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
                medicaments: medicament

            }
        )
        console.log("medicaments")
    }
    render() {

        return (
            <View style={styles.container}>
                <View>
                    <Text> Medicaments</Text>
                </View>
                <View>
                <TouchableOpacity onPress={()=> this.next("Aspirin 1000mg")}>
                        <Text> Aspirin 1000mg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Paracetamol 1000mg")}>
                        <Text> Paracetamol 1000mg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Metamizol 500mg")}>
                        <Text> Metamizol 500mg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Sodic naproxen 500mg")}>
                        <Text> Sodic naproxen 500mg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Ibuprofen 200mg")}>
                        <Text> Ibuprofen 200mg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Dexketoprofen trometamol 25mg")}>
                        <Text> Dexketoprofen trometamol 25mg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Almotriptan 12.5mg")}>
                        <Text> Almotriptan 12.5mg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Zolmitriptan 5mg")}>
                        <Text> Zolmitriptan 5mg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Eletriptan 40mg")}>
                        <Text> Eletriptan 40mg</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> this.next("Rizatriptan 5mg")}>
                        <Text> Rizatriptan 5mg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Sumatriptan 25mg")}>
                        <Text> Sumatriptan 25mg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Chlorpromazine 10mg")}>
                        <Text> Chlorpromazine 10mg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Metoclopramide 20mg")}>
                        <Text> Metoclopramide 20mg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Propranolol 60mg")}>
                        <Text> Propranolol 60mg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Timolol 60mg")}>
                        <Text> Timolol 60mg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Others")}>
                        <Text> Others</Text>
                    </TouchableOpacity>
                    
                </View>

                <View style={{ flex: 1 }}>
                    <Button
                        onPress={() => {
                            this.next("")
                        }}
                        title="Next"
                    >

                    </Button>
                    <Button
                        onPress={() => {
                            Alert.alert(
                                'Cancel',
                                'Do you want to canel this process?',
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7BF0E6',
    }
});
