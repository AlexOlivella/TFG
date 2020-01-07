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
                "No": false,
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
        var simptomes = navigation.getParam('simptomes')
        var causes = navigation.getParam('causes')

        let impediments = [];
        for (let impediment in this.state.selected) {
            if (this.state.selected[impediment])
                impediments.push(impediment)
        }
        //console.log(impediments)

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
                    centerComponent={{ text: 'Select your impediments', style: { color: '#fff', fontSize: 15 } }}
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
                                        this.state.selected["Move"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Move")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/Move.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Move
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Walk"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Walk")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/Walk.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Walk
                                </Text>
                            </View>
                        </View>
                        <View style={styles.columnes}>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Make exercise"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Make exercise")}>
                                    <Image style={{ width: 60, height: 30 }} source={require('./images/exercise.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Make exercise
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Go to school"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Go to school")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/GoToSchool.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Go to school
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Go to work"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Go to work")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/GoToWork.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Go to work
                                </Text>
                            </View>
                        </View>
                        <View style={styles.columnes}>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Forced to go home"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Forced to go home")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/ForcedToGoHome.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Forced to
                                </Text>
                                <Text style={styles.textBoto}>
                                    go home
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Breathe"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Breathe")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/Breathe.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Breathe
                                </Text>
                            </View>
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
