import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity, TouchableHighlight, ScrollView, SafeAreaView } from 'react-native';
import { Header } from 'react-native-elements';




export default class Simptomes extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            selected: {
                "No": false,
                "Blind spots": false,
                "Zig zag lanes": false,
                "Shiny points": false,
                "Vision problems": false,
                "Vision loss": false,
                "Flashlights": false,
                "Sound intolerance": false,
                "Hear noises": false,
                "Odor intolerance": false,
                "Nausea or vomiting": false,
                "Tingling in body parts": false,
                "Talk difficulty": false,
                "Language comprehension difficulty": false,
                "Tearing": false,
                "Nasal congestion": false,
                "Numbness": false,
                "Uncontrollable movements": false,
                "Others": false,
            },
        }
    }

    select(element) {
        let selected = this.state.selected;

        if (element === "No") selected["No"] = true
        if (selected["No"] === true) selected = {}
        if (selected[element]!=selected["No"]) selected["No"] = false
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

        let simptomes = [];
        for (let simptoma in this.state.selected) {
            if (this.state.selected[simptoma])
                simptomes.push(simptoma)
        }
        //console.log(simptomes)

        if (simptomes.length === 0)
            Alert.alert("Error", "Select at least 1 option")
        else {
            this.props.navigation.navigate(
                "Causes",
                {
                    dataInici,
                    dataFinal,
                    intensitatDolor,
                    zonaCap,
                    simptomes: simptomes
                }
            )
            //console.log("simptomes")
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <Header
                    centerComponent={{ text: 'Symptoms', style: { color: '#fff' } }}
                >
                </Header>
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView >
                        <View style={styles.columnes}>
                            <TouchableHighlight
                                style={
                                    this.state.selected["No"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("No")}
                            >
                                <Text> No</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Blind spots"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Blind spots")}
                            >
                                <Text> Blind spots</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Zig zag lanes"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Zig zag lanes")}>
                                <Text>Zig zag lanes</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.columnes}>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Shiny points"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Shiny points")}>
                                <Text>Shiny points</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Vision problems"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Vision problems")}>
                                <Text>Vision problems</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Vision loss"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Vision loss")}>
                                <Text>Vision loss</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.columnes}>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Flashlights"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Flashlights")}>
                                <Text>Flashlights</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Sound intolerance"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Sound intolerance")}>
                                <Text>Sound intolerance</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Hear noises"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Hear noises")}>
                                <Text>Hear noises</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.columnes}>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Odor intolerance"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Odor intolerance")}>
                                <Text>Odor intolerance</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Nausea or vomiting"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Nausea or vomiting")}>
                                <Text>Nausea or vomiting</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Tingling in body parts"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Tingling in body parts")}>
                                <Text>Tingling in body parts</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.columnes}>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Talk difficulty"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Talk difficulty")}>
                                <Text>Talk difficulty</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Language comprehension difficulty"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Language comprehension difficulty")}>
                                <Text>Language comprehension difficulty</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Tearing"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Tearing")}>
                                <Text>Tearing</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.columnes}>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Nasal congestion"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Nasal congestion")}>
                                <Text>Nasal congestion</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Numbness"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Numbness")}>
                                <Text>Numbness</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Uncontrollable movements"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                underlayColor='none'
                                onPress={() => this.select("Uncontrollable movements")}>
                                <Text>Uncontrollable movements</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.columnes}>

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
    columnes: {
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
