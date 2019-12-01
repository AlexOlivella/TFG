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
                "Stress": false,
                "Anxiety": false,
                "Depression": false,
                "Sleep a lot": false,
                "Not sleep enough": false,
                "Dehydration": false,
                "Diet": false,
                "Physical activity changes": false,
                "Sunlight": false,
                "Seeing intermitent lights": false,
                "Smell": false,
                "Loud noises": false,
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
                    centerComponent={{ text: 'Causes', style: { color: '#fff' } }}
                >
                </Header>
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView >
                        <View style={styles.lateral}>
                            <TouchableHighlight
                                style={
                                    this.state.selected["No"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                //underlayColor='none'
                                onPress={() => this.select("No")}
                            >
                                <Text> No</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Stress"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                //underlayColor='none'
                                onPress={() => this.select("Stress")}>
                                <Text>Stress</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Anxiety"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                //underlayColor='none'
                                onPress={() => this.select("Anxiety")}>
                                <Text>Anxiety</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.lateral}>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Depression"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                //underlayColor='none'
                                onPress={() => this.select("Depression")}>
                                <Text>Depression</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Sleep a lot"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                //underlayColor='none'
                                onPress={() => this.select("Sleep a lot")}>
                                <Text>Sleep a lot</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Not sleep enough"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                //underlayColor='none'
                                onPress={() => this.select("Not sleep enough")}>
                                <Text>Not sleep enough</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.lateral}>
                            <TouchableHighlight

                                style={
                                    this.state.selected["Dehydration"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                //underlayColor='none'
                                onPress={() => this.select("Dehydration")}>
                                <Text>Dehydration</Text>
                            </TouchableHighlight>
                            {/*<TouchableHighlight>
                        <Text> Hormonal</Text>
                    </TouchableHighlight>*/}
                            <TouchableHighlight
                                style={
                                    this.state.selected["Diet"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                //underlayColor='none'
                                onPress={() => this.select("Diet")}>
                                <Text>Diet</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Physical activity changes"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                //underlayColor='none'
                                onPress={() => this.select("Physical activity changes")}>
                                <Text>Physical activity changes</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.lateral}>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Sunlight"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                //underlayColor='none'
                                onPress={() => this.select("Sunlight")}>
                                <Text>Sunlight</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Seeing intermitent lights"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                //underlayColor='none'
                                onPress={() => this.select("Seeing intermitent lights")}>
                                <Text>Seeing intermitent lights</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Smell"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                //underlayColor='none'
                                onPress={() => this.select("Smell")}>
                                <Text>Smell</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.lateral}>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Loud noises"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                //underlayColor='none'
                                onPress={() => this.select("Loud noises")}>
                                <Text>Loud noises</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={
                                    this.state.selected["Others"] ? styles.seleccionat : styles.noSeleccionat
                                }
                                //underlayColor='none'
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
