import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity, TouchableHighlight, ScrollView, SafeAreaView } from 'react-native';
import { Header } from 'react-native-elements';
import * as FirebaseAPI from '../modules/firebaseAPI'
import firebase from 'firebase'

export default class Exercici extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gender: "",
        }
    }
    static navigationOptions = {
        header: null
    }
    async componentDidMount() {
        var user = firebase.auth().currentUser
        let tipus = await FirebaseAPI.comprovarTipusUsuari(user.uid)
        let result = await FirebaseAPI.readUserData(user.uid, tipus)
        console.log("result", result)
        this.setState({ gender: result.gender })
        console.log("gender", this.state.gender)
    }
    next(exercici) {
        if (this.state.gender != "Male") {
            var { navigation } = this.props;
            var dataInici = navigation.getParam('dataInici');
            var dataFinal = navigation.getParam('dataFinal');
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
        }
        //console.log("exercici")

        //}
        else {
            var { navigation } = this.props;
            var dataInici = navigation.getParam('dataInici');
            var dataFinal = navigation.getParam('dataFinal');
            var intensitatDolor = navigation.getParam('intensitatDolor')
            var zonaCap = navigation.getParam('zonaCap')
            var simptomes = navigation.getParam('simptomes')
            var causes = navigation.getParam('causes')
            var impediments = navigation.getParam('impediments')
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
                    exercicis: exercici

                })
        }
    }
    render() {

        return (
            <View style={styles.container}>

                <Header
                    centerComponent={{ text: 'Type of exercise you done', style: { color: '#fff', fontSize: 15 } }}
                >
                </Header>
                <View style={styles.safeArea}>
                    <View style={styles.columnes}>
                        <View style={styles.rodonaIcon}>
                            <TouchableHighlight
                                style={styles.noSeleccionat}
                                underlayColor='none'
                                onPress={() => this.select("No exercise")}>
                                <Image style={{ width: 60, height: 60 }} source={require('./images/No.png')}></Image>
                            </TouchableHighlight>
                            <Text style={styles.textBoto}>
                                No exercise
                                </Text>
                        </View>
                        <View style={styles.rodonaIcon}>
                            <TouchableHighlight
                                style={styles.noSeleccionat}
                                underlayColor='none'
                                onPress={() => this.next("Low")}>
                                <Image style={{ width: 60, height: 60 }} source={require('./images/LowExercise.png')}></Image>
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
                                <Image style={{ width: 60, height: 60 }} source={require('./images/ModerateExercise.png')}></Image>
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
                                onPress={() => this.next("Intense")}>
                                <Image style={{ width: 60, height: 60 }} source={require('./images/IntenseExercise.png')}></Image>
                            </TouchableHighlight>
                            <Text style={styles.textBoto}>
                                Intense
                            </Text>
                        </View>
                        <View style={styles.rodonaIcon}>
                            <TouchableHighlight
                                style={styles.noSeleccionat}
                                underlayColor='none'
                                onPress={() => this.next("Very intense")}>
                                <Image style={{ width: 60, height: 60 }} source={require('./images/VeryIntenseExercise.png')}></Image>
                            </TouchableHighlight>
                            <Text style={styles.textBoto}>
                                Very intense
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
