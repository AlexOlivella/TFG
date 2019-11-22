import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity, TouchableHighlight, ScrollView, SafeAreaView } from 'react-native';
import { Header } from 'react-native-elements';


export default class Impediments extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            selected: {
                "Move": false,
                "Breathe": false,
                "Walk": false,
                "Make exercise": false,
                "Go to school": false,
                "Go to work": false,
                "Forced to go home": false,
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
        var dataInici = navigation.getParam('dataInici');
        var dataFinal= navigation.getParam('dataFinal');
        var intensitatDolor = navigation.getParam('intensitatDolor')
        var zonaCap = navigation.getParam('zonaCap')
        var simptomes = navigation.getParam('simptomes')
        var causes = navigation.getParam('causes')

        let impediments = [];
        for (let impediment in this.state.selected) {
            if (this.state.selected[impediment])
                impediments.push(impediment)
        }
        console.log(impediments)

        if (impediments.length === 0)
            Alert.alert("Error", "Select at least 1 option")
        else {
            this.props.navigation.navigate(
                "Exercici",
                {
                    dataInici,
                    dataFinal,
                    intensitatDolor,
                    zonaCap,
                    simptomes,
                    causes,
                    impediments: impediments

                }
            )
        }
    }
    render() {

        return (
            <View style={styles.container}>
                <Header
                    centerComponent={{ text: 'Impediments', style: { color: '#fff' } }}
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
                                    this.state.selected["Move"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Move")}>
                                <Text>Move</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Walk"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Walk")}>
                                <Text>Walk</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.lateral}>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Make exercise"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Make exercise")}>
                                <Text>Make exercise</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Go to school"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Go to school")}>
                                <Text>Go to school</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Go to work"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Go to work")}>
                                <Text>Go to work</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.lateral}>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Forced to go home"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Forced to go home")}>
                                <Text>Forced to go home</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Breathe"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Breathe")}>
                                <Text>Breathe</Text>
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
    }
});
