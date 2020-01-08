import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Header, Icon } from 'react-native-elements'



export default class ZonaCap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: {
                "Front left head": false,
                "Front right head": false,
                "Back left head": false,
                "Back right head": false,
                "Front left face": false,
                "Front right face": false,
                "Back left face": false,
                "Back right face": false,
                "Front left neck": false,
                "Front right neck": false,
                "Back left neck": false,
                "Back right neck": false,
                "None of this": false,
            }
        };

    }

    static navigationOptions = {
        header: null
    }

    select(element) {
        let selected = this.state.selected;

        if (element === "None of this") selected["None of this"] = true
        if (selected["None of this"] === true) selected = {}
        if (selected[element] != selected["None of this"]) selected["None of this"] = false
        selected[element] = !selected[element];
        //console.log(selected);
        this.setState({ selected: selected })
    }

    next() {

        var { navigation } = this.props;
        var dataInici = navigation.getParam('dataInici');
        var dataFinal = navigation.getParam('dataFinal');
        var intensitatDolor = navigation.getParam('intensitatDolor')

        let zonesCap = [];
        for (let pain in this.state.selected) {
            if (this.state.selected[pain])
                zonesCap.push(pain)
        }
        //console.log(zonesCap)

        if (zonesCap.length === 0)
            Alert.alert("Error", "Select at least 1 option")
        else {

            this.props.navigation.navigate(
                "Simptomes",
                {
                    dataInici,
                    dataFinal,
                    intensitatDolor,
                    zonaCap: zonesCap
                }
            )
            //console.log("zonacap")
        }



    }
    render() {
        var { navigation } = this.props;

        // //console.log("STATE", this.state)
        return (
            <View style={styles.container}>
                <Header
                    centerComponent={{ text: 'Select your pain zone', style: { color: '#fff', fontSize: 20 } }}>
                </Header>
                <View style={styles.safeArea}>
                    {/*<View style={styles.rodonaIcon}>
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
                    </View>*/}
                    <View style={styles.files}>
                        <View style={styles.columnaDreta}>
                            <View>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Front left head"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    activeOpacity={1}
                                    underlayColor='#3BD3EF'
                                    onPress={() => this.select("Front left head")}>
                                    <Image style={{ width: 80 * 0.70, height: 110 * 0.70, resizeMode: 'stretch' }} source={require('./images/FrontLeftHead.png')}></Image>
                                </TouchableHighlight>
                            </View>
                            <View>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Front left face"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    activeOpacity={1}
                                    underlayColor='#3BD3EF'
                                    onPress={() => this.select("Front left face")}>
                                    <Image style={{ width: 95 * 0.70, height: 130 * 0.70, resizeMode: 'stretch' }} source={require('./images/FrontLeftFace.png')}></Image>
                                </TouchableHighlight>
                            </View>
                            <View>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Front left neck"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    activeOpacity={1}
                                    underlayColor='#3BD3EF'
                                    onPress={() => this.select("Front left neck")}>
                                    <Image style={{ width: 71.5 * 0.70, height: 50 * 0.70, resizeMode: 'stretch' }} source={require('./images/FrontLeftNeck.png')}></Image>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={styles.columnaEsquerra}>
                            <View>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Front right head"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    activeOpacity={1}
                                    underlayColor='#3BD3EF'
                                    onPress={() => this.select("Front right head")}>
                                    <Image style={{ width: 80 * 0.70, height: 110 * 0.70, resizeMode: 'stretch' }} source={require('./images/FrontRightHead.png')}></Image>
                                </TouchableHighlight>
                            </View>
                            <View>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Front right face"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    activeOpacity={1}
                                    underlayColor='#3BD3EF'
                                    onPress={() => this.select("Front right face")}>
                                    <Image style={{ width: 89 * 0.70, height: 130 * 0.70, resizeMode: 'stretch' }} source={require('./images/FrontRightFace.png')}></Image>
                                </TouchableHighlight>
                            </View>
                            <View>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Front right neck"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    activeOpacity={1}
                                    underlayColor='#3BD3EF'
                                    onPress={() => this.select("Front right neck")}>
                                    <Image style={{ width: 65 * 0.70, height: 50 * 0.70, resizeMode: 'stretch' }} source={require('./images/FrontRightNeck.png')}></Image>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                    <View style={styles.files}>
                        <View style={styles.columnaDreta}>
                            <View>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Back left head"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    activeOpacity={1}
                                    underlayColor='#3BD3EF'
                                    onPress={() => this.select("Back left head")}>
                                    <Image style={{ width: 80 * 0.70, height: 105 * 0.70, resizeMode: 'stretch' }} source={require('./images/BackLeftHead.png')}></Image>
                                </TouchableHighlight>
                            </View>
                            <View>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Back left face"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    activeOpacity={1}
                                    underlayColor='#3BD3EF'
                                    onPress={() => this.select("Back left face")}>
                                    <Image style={{ width: 93.5 * 0.70, height: 112 * 0.70, resizeMode: 'stretch' }} source={require('./images/BackLeftFace.png')}></Image>
                                </TouchableHighlight>
                            </View>
                            <View>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Back left neck"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    activeOpacity={1}
                                    underlayColor='#3BD3EF'
                                    onPress={() => this.select("Back left neck")}>
                                    <Image style={{ width: 73.5 * 0.70, height: 80 * 0.70, resizeMode: 'stretch' }} source={require('./images/BackLeftNeck.png')}></Image>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={styles.columnaEsquerra}>
                            <View>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Back right head"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    activeOpacity={1}
                                    underlayColor='#3BD3EF'
                                    onPress={() => this.select("Back right head")}>
                                    <Image style={{ width: 80 * 0.70, height: 105 * 0.70, resizeMode: 'stretch' }} source={require('./images/BackRightHead.png')}></Image>
                                </TouchableHighlight>
                            </View>
                            <View>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Back right face"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    activeOpacity={1}
                                    underlayColor='#3BD3EF'
                                    onPress={() => this.select("Back right face")}>
                                    <Image style={{ width: 93 * 0.70, height: 112 * 0.70, resizeMode: 'stretch' }} source={require('./images/BackRightFace.png')}></Image>
                                </TouchableHighlight>
                            </View>
                            <View>
                                <TouchableHighlight
                                    style={
                                        this.state.selected["Back right neck"] ? styles.seleccionat : styles.noSeleccionat
                                    }
                                    activeOpacity={1}
                                    underlayColor='#3BD3EF'
                                    onPress={() => this.select("Back right neck")}>
                                    <Image style={{ width: 58 * 0.70, height: 80 * 0.70, resizeMode: 'stretch' }} source={require('./images/BackRightNeck.png')}></Image>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                    {/*<View>
                        <Image style={{width:100, height:70}} source={require('./images/headparts2.png')}></Image>
                    </View>*/}
                    <View style={styles.rodonaIcon}>
                        <TouchableHighlight
                            style={
                                this.state.selected["None of this"] ? styles.seleccionatBoto : styles.noSeleccionatBoto
                            }
                            activeOpacity={1}
                            underlayColor='#3BD3EF'
                            onPress={() => this.select("None of this")}>
                            <Image style={{ width: 60, height: 60 }} source={require('./images/No.png')}></Image>
                        </TouchableHighlight>
                        <Text style={styles.textBoto}>
                            None of this
                        </Text>
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
    columnaDreta: {
        //flexDirection: 'column',
        width: "50%",
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    columnaEsquerra: {
        //flexDirection: 'column',
        width: "50%",
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    files: {
        flexDirection: 'row',
        paddingVertical: 10
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
        backgroundColor: '#38B3EF',

    },
    noSeleccionat: {
        backgroundColor: '#3BD3EF',

    },
    seleccionatBoto: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        backgroundColor: '#38B3EF',
        borderRadius: 50,

    },
    noSeleccionatBoto: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: '#3BD3EF',

    }
});
