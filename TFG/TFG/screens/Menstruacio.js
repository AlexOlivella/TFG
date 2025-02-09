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
                    centerComponent={{ text: 'Period type', style: { color: '#fff', fontSize: 20 } }}
                >
                </Header>
                <View style={styles.safeArea}>
                    <View style={styles.columnes}>
                        <View style={styles.rodonaIcon}>
                            <TouchableHighlight
                                style={styles.noSeleccionat}
                                underlayColor='none'
                                onPress={() => this.next("No")}>
                                <Image style={{ width: 60, height: 60 }} source={require('./images/No.png')}></Image>
                            </TouchableHighlight>
                            <Text style={styles.textBoto}>
                                No
                            </Text>
                        </View>
                        <View style={styles.rodonaIcon}>
                            <TouchableHighlight
                                style={styles.noSeleccionat}
                                underlayColor='none'
                                onPress={() => this.next("Low")}>
                                <Image style={{ width: 60, height: 60 }} source={require('./images/LowPeriod.png')}></Image>
                            </TouchableHighlight>
                            <Text style={styles.textBoto}>
                                Low
                            </Text>
                        </View>
                        <View style={styles.rodonaIcon}>
                            <TouchableHighlight
                                style={styles.noSeleccionat}
                                underlayColor='none'
                                onPress={() => this.next("Moderate")}>
                                <Image style={{ width: 60, height: 60 }} source={require('./images/ModeratePeriod.png')}></Image>
                            </TouchableHighlight>
                            <Text style={styles.textBoto}>
                                Moderate
                            </Text>
                        </View>
                    </View>
                    <View style={styles.columnes}>
                        <View style={styles.rodonaIcon}>
                            <TouchableHighlight
                                style={styles.noSeleccionat}
                                underlayColor='none'
                                onPress={() => this.next("Hard")}>
                                <Image style={{ width: 60, height: 60 }} source={require('./images/HardPeriod.png')}></Image>
                            </TouchableHighlight>
                            <Text style={styles.textBoto}>
                                Hard
                            </Text>
                        </View>
                        <View style={styles.rodonaIcon}>
                            <TouchableHighlight
                                style={styles.noSeleccionat}
                                underlayColor='none'
                                onPress={() => this.next("Soon")}>
                                <Image style={{ width: 60, height: 60 }} source={require('./images/calendar-clock.png')}></Image>
                            </TouchableHighlight>
                            <Text style={styles.textBoto}>
                                Soon
                            </Text>
                        </View>
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
    safeArea: {
        flex: 8,
        paddingHorizontal: 10,
    },
    columnes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    seccioBotons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    rodonaIcon: {
        flex: 1,
        alignItems: 'center'
    },
    seleccionat: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        backgroundColor: '#38B3EF',
        borderRadius: 50,
    },
    noSeleccionat: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        backgroundColor: '#3BD3EF',
        borderRadius: 50,
    }
});
