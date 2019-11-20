import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity, TouchableHighlight, ScrollView, SafeAreaView } from 'react-native';
import { Header } from 'react-native-elements';



export default class Menstruacio extends Component {
    static navigationOptions = {
        header: null
    }

    next(tipus) {
        var { navigation } = this.props;
        var dataIni = navigation.getParam('dataInici');
        var dataFinal= navigation.getParam('dataFinal');
        var intensitatDolor = navigation.getParam('intensitatDolor')
        var zonaCap = navigation.getParam('zonaCap')
        var simptomes = navigation.getParam('simptomes')
        var causes = navigation.getParam('causes')
        var impediments = navigation.getParam('impediments')
        var exercicis = navigation.getParam('exercicis')
        this.props.navigation.navigate(
            "Medicaments",
            {
                dataIni,
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
        console.log("menstruacio")
    }
    render() {

        return (
            <View style={styles.container}>
                <Header
                    centerComponent={{ text: 'Period', style: { color: '#fff' } }}
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
