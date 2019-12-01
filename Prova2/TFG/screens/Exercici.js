import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity, TouchableHighlight, ScrollView, SafeAreaView } from 'react-native';
import { Header } from 'react-native-elements';





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
        var dataInici = navigation.getParam('dataInici');
        var dataFinal= navigation.getParam('dataFinal');
        var intensitatDolor = navigation.getParam('intensitatDolor')
        var zonaCap = navigation.getParam('zonaCap')
        var simptomes = navigation.getParam('simptomes')
        var causes = navigation.getParam('causes')
        var impediments = navigation.getParam('impediments')
        this.props.navigation.navigate(
            "Menstruacio",
            {
                dataInici,
                dataFinal,
                intensitatDolor,
                zonaCap,
                simptomes,
                causes,
                impediments,
                exercicis: exercici
            }
        )
        //console.log("exercici")

        //}
        /* else{
                 var { navigation } = this.props;
                 var dataInici = navigation.getParam('dataInici');
                 this.props.navigation.navigate(
                     "Medicaments",
                     {
                         dataInici,
                         intensitatDolor: dolor,
         
                     }
                 )
 
         }*/
    }
    render() {

        return (
            <View style={styles.container}>

                <Header
                    centerComponent={{ text: 'Exercise done', style: { color: '#fff' } }}
                >
                </Header>
                <View style={styles.seccioOpcions}>
                    <View style={styles.lateral}>
                        <TouchableHighlight
                            style={styles.noSeleccionat}
                            //underlayColor='none'
                            onPress={() => { this.next("No exercise") }}>
                            <Text>No</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.noSeleccionat}
                            //underlayColor='none'
                            onPress={() => { this.next("Low") }}>
                            <Text>Low</Text>
                        </TouchableHighlight >
                        <TouchableHighlight
                            style={styles.noSeleccionat}
                            //underlayColor='none'
                            onPress={() => { this.next("Moderate") }}>
                            <Text>Moderate</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.lateral}>
                        <TouchableHighlight
                            style={styles.noSeleccionat}
                            //underlayColor='none'
                            onPress={() => { this.next("Intense") }}>
                            <Text>Intense</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.noSeleccionat}
                            //underlayColor='none'
                            onPress={() => { this.next("Very intense") }}>
                            <Text>Very intense</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.seccioBuida}>

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
    },
    seccioOpcions: {
        flex: 3,
        //justifyContent: "center",
    },
    titol: {
        flex: 1,
        alignItems: "flex-start"
    },
    seccioBuida: {
        flex: 1,
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
