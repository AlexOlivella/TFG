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
        if (selected[element] != selected["No"]) selected["No"] = false
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
                    centerComponent={{ text: 'Select your symptoms', style: { color: '#fff', fontSize: 20 } }}
                >
                </Header>
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView >
                        <View style={styles.columnes}>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["No"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("No")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/No.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    No
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Blind spots"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Blind spots")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/BlindSpots.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Blind spots
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Zig zag lanes"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Zig zag lanes")}>
                                    <Image style={{ width: 75, height: 75 }} source={require('./images/ZigZagLanes.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Zig zag lanes
                                </Text>
                            </View>
                        </View>
                        <View style={styles.columnes}>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Shiny points"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Shiny points")}>
                                    <Image style={{ width: 75, height: 75 }} source={require('./images/ShinyPoints.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Shiny points
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Vision problems"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Vision problems")}>
                                    <Image style={{ width: 75, height: 75 }} source={require('./images/VisionProblems.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Vision problems
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Vision loss"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Vision loss")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/VisionLoss.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Vision loss
                                </Text>
                            </View>
                        </View>
                        <View style={styles.columnes}>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Flashlights"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Flashlights")}>
                                    <Image style={{ width: 55, height: 55 }} source={require('./images/Flashlights.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Flashlights
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Tearing"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Tearing")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/Tearing.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Tearing
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Nasal congestion"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Nasal congestion")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/NasalCongestion.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Nasal congestion
                                </Text>
                            </View>
                        </View>
                        <View style={styles.columnes}>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Odor intolerance"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Odor intolerance")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/OdorIntolerance.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Odor intolerance
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Sound intolerance"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Sound intolerance")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/SoundIntolerance.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Sound intolerance
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Hear noises"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Hear noises")}>
                                    <Image style={{ width: 55, height: 55 }} source={require('./images/HearNoises.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Hear noises
                                </Text>
                            </View>
                        </View>
                        <View style={styles.columnes}>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Talk difficulty"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Talk difficulty")}>
                                    <Image style={{ width: 75, height: 75 }} source={require('./images/TalkDifficulty.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Talk difficulty
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Language comprehension difficulty"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Language comprehension difficulty")}>
                                    <Image style={{ width: 75, height: 75 }} source={require('./images/LanguageComprehension.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Language
                                </Text>
                                <Text style={styles.textBoto}>
                                    comprehension
                                </Text>
                                <Text style={styles.textBoto}>
                                    difficulty
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Nausea or vomiting"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Nausea or vomiting")}>
                                    <Image style={{ width: 50, height: 60 }} source={require('./images/vomiting.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Nausea or
                                </Text>
                                <Text style={styles.textBoto}>
                                    vomiting
                                </Text>
                            </View>
                        </View>
                        <View style={styles.columnes}>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Tingling in body parts"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Tingling in body parts")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/Tingling.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Tingling in
                                </Text>
                                <Text style={styles.textBoto}>
                                    body parts
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Numbness"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Numbness")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/Numbness.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Numbness
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Uncontrollable movements"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Uncontrollable movements")}>
                                    <Image style={{ width: 75, height: 75 }} source={require('./images/UncontrollableMovements.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Uncontrollable
                                </Text>
                                <Text style={styles.textBoto}>
                                    movements
                                </Text>
                            </View>
                        </View>
                        <View style={styles.columnes}>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Others"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Others")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/Others.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Others
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>

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
                        style={{ width: '48%', alignItems: 'center', height: 52, justifyContent: 'center', backgroundColor: '#2196F3' }}
                    >
                        <View >
                            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>CANCEL</Text>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.next()
                    }}
                        title="Next"
                        style={{ width: '48%', alignItems: 'center', height: 52, justifyContent: 'center', backgroundColor: '#2196F3' }}
                    >
                        <View >


                            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>NEXT</Text>

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
