import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Button, Header } from 'react-native-elements'


export default class Exercici extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    static navigationOptions = {
        header: null
    }

    next(exercici) {
        var { navigation } = this.props;
        var dataIni = navigation.getParam('dataIni');
        var intensitatDolor = navigation.getParam('intensitatDolor')
        var zonaCap = navigation.getParam('zonaCap')
        var simptomes = navigation.getParam('simptomes')
        var causes = navigation.getParam('causes')
        var impediments = navigation.getParam('impediments')
        this.props.navigation.navigate(
            "Menstruacio",
            {
                dataIni,
                intensitatDolor,
                zonaCap,
                simptomes,
                causes,
                impediments,
                exercicis: exercici
            }
        )
        console.log("exercici")

        //}
        /* else{
                 var { navigation } = this.props;
                 var dataIni = navigation.getParam('dataIni');
                 this.props.navigation.navigate(
                     "Medicaments",
                     {
                         dataIni,
                         intensitatDolor: dolor,
         
                     }
                 )
 
         }*/
    }
    render() {

        return (
            <View style={styles.container}>

                <View style={styles.titol}>
                    <Text style={{ fontSize: 20, alignItems: "center" }}> Did you do some exercise?</Text>

                </View>
                <View style={styles.seccioOpcions}>
                    <TouchableOpacity onPress={() => { this.next("Low") }}>
                        <Text>Low</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => { this.next("Moderate") }}>
                        <Text>Moderate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.next("Intense") }}>
                        <Text>Intense</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.next("Very intense") }}>
                        <Text>Very intense</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.next("No")}>
                        <Text>No</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
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
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#7BF0E6',
            },
    lateral: {
                    flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "red"
            },
    seccioOpcions: {
                    flex: 1,
                //justifyContent: "center",
                justifyContent: "space-between",
            },
    titol: {
                    flex: 1,
                alignItems: "flex-start"
            },
    seccioBuida: {
                    flex: 1,
            }
        });
