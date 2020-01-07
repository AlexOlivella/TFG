import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity, TouchableHighlight, ScrollView, SafeAreaView } from 'react-native';
import { Header } from 'react-native-elements';



export default class Menstruacio extends Component {
    static navigationOptions = {
        header: null
    }

    next(tipus) {
        var { navigation } = this.props;
        var dataInici = navigation.getParam('dataInici');
        var dataFinal = navigation.getParam('dataFinal');
        var intensitatDolor = navigation.getParam('intensitatDolor')
        var zonaCap = navigation.getParam('zonaCap')
        var simptomes = navigation.getParam('simptomes')
        var causes = navigation.getParam('causes')
        var impediments = navigation.getParam('impediments')
        var exercicis = navigation.getParam('exercicis')
        this.props.navigation.navigate(
            "Medicaments",
            {
                dataInici,
                dataFinal,
                intensitatDolor,
                zonaCap,
                simptomes,
                causes,
                impediments,
                exercicis,
                menstruacio: tipus,

            }
        )
        //console.log("menstruacio")
    }
    render() {

        return (
            <View style={styles.container}>
                <Header
                    centerComponent={{ text: 'Period type', style: { color: '#fff', fontSize:20 } }}
                >
                </Header>
                <View style={styles.seccioOpcions}>
                    <View style={styles.lateral}>
                        <TouchableHighlight
                            style={styles.noSeleccionat}
                            underlayColor='none'
                            onPress={() => this.next("No")}>
                            <Text>No</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.noSeleccionat}
                            underlayColor='none'
                            onPress={() => this.next("Low")}>
                            <Text>Low</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.noSeleccionat}
                            underlayColor='none'
                            onPress={() => this.next("Moderate")}>
                            <Text>Moderate</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.lateral}>
                        <TouchableHighlight
                            style={styles.noSeleccionat}
                            underlayColor='none'
                            onPress={() => this.next("Hard")}>
                            <Text>Hard</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.noSeleccionat}
                            underlayColor='none'
                            onPress={() => this.next("Soon")}>
                            <Text>Soon</Text>
                        </TouchableHighlight>
                    </View>
                </View>
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
                        style={{ width: '96%', alignItems: 'center', height: 52, justifyContent: 'center', backgroundColor: '#2196F3' }}
                    >
                        <View >
                            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>CANCEL</Text>

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
    lateral: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    seccioOpcions: {
        flex: 8,
        //justifyContent: "center",
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
