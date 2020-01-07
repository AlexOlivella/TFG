import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity, TouchableHighlight, ScrollView, SafeAreaView } from 'react-native';
import { Header } from 'react-native-elements';



export default class Causes extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            selected: {
                "No": false,
                "Stress": false,
                "Anxiety": false,
                "Depression": false,
                "Sleep a lot": false,
                "Not sleep enough": false,
                "Dehydration": false,
                "Diet changes": false,
                "Physical activity changes": false,
                "Sunlight exposition": false,
                "Seeing intermittent lights": false,
                "Strong smells": false,
                "Loud noises": false,
                "Long screen exposition": false,
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

        let causes = [];
        for (let causa in this.state.selected) {
            if (this.state.selected[causa])
                causes.push(causa)
        }
        //console.log(causes)

        if (causes.length === 0)
            Alert.alert("Error", "Select at least 1 option")
        else {
            this.props.navigation.navigate(
                "Impediments",
                {
                    dataInici,
                    dataFinal,
                    intensitatDolor,
                    zonaCap,
                    simptomes,
                    causes: causes

                }
            )
            //console.log("causes")
        }
    }
    render() {

        return (
            <View style={styles.container}>
                <Header
                    centerComponent={{ text: 'Select your causes', style: { color: '#fff', fontSize: 20 } }}
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
                                        this.state.selected["Stress"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Stress")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/Stress.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Stress
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Anxiety"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Anxiety")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/Anxiety.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Anxiety
                                </Text>
                            </View>
                        </View>
                        <View style={styles.columnes}>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Depression"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Depression")}>
                                    <Image style={{ width: 50, height: 50 }} source={require('./images/causes.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Depression
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Sleep a lot"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Sleep a lot")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/SleepALot.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Sleep a lot
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Not sleep enough"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Not sleep enough")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/NotSleepEnough.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Not sleep enough
                                </Text>
                            </View>
                        </View>
                        <View style={styles.columnes}>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Dehydration"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Dehydration")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/Dehydration.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Dehydration
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Diet changes"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Diet changes")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/Diet.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Diet changes
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Physical activity changes"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Physical activity changes")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/PhysicalActivityChanges.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Physical activity
                                </Text>
                                <Text style={styles.textBoto}>
                                    changes
                                </Text>
                            </View>
                        </View>
                        <View style={styles.columnes}>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Sunlight exposition"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Sunlight exposition")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/SunlightExposition.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Sunlight
                                </Text>
                                <Text style={styles.textBoto}>
                                    exposition
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Seeing intermittent lights"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Seeing intermittent lights")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/IntermitentLights.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Seeing
                                </Text>
                                <Text style={styles.textBoto}>
                                    intermittent
                                </Text>
                                <Text style={styles.textBoto}>
                                    lights
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Strong smells"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Strong smells")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/StrongSmells.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Strong smells
                                </Text>
                            </View>
                        </View>
                        <View style={styles.columnes}>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Loud noises"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Loud noises")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/LoudNoises.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Loud noises
                                </Text>
                            </View>
                            <View style={styles.rodonaIcon}>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Long screen exposition"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    underlayColor='none'
                                    onPress={() => this.select("Long screen exposition")}>
                                    <Image style={{ width: 60, height: 60 }} source={require('./images/LongScreenExposition.png')}></Image>
                                </TouchableHighlight>
                                <Text style={styles.textBoto}>
                                    Long screen
                                </Text>
                                <Text style={styles.textBoto}>
                                    exposition
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
