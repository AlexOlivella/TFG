import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity } from 'react-native';
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
                "None": false,
            }
        };

    }

    static navigationOptions = {
        header: null
    }

    select(element) {
        let selected = this.state.selected;

        if (element === "None") selected["None"] = true
        if (selected["None"] === true) selected = {}
        if (selected[element]!=selected["None"]) selected["None"] = false
        selected[element] = !selected[element];
        //console.log(selected);
        this.setState({ selected: selected })




    }

    next() {

        var { navigation } = this.props;
        var dataInici = navigation.getParam('dataInici');
        var dataFinal= navigation.getParam('dataFinal');
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
                centerComponent={{text:'Select your pain zone', style: { color: '#fff', fontSize: 20 }}}>

                </Header>
                <View style={{ flex: 8 , justifyContent:'center'}}>
                    <View style={styles.lateral}>
                        <TouchableOpacity style={{}} onPress={() => this.select("Front left head")}>
                            <Image source={require('./images/davantDaltEsquerra.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={() => this.select("Front right head")}>
                            <Image source={require('./images/davantDaltDreta.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={() => this.select("Back left head")}>
                            <Image source={require('./images/darrereCapEsquerra.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={() => this.select("Back right head")}>
                            <Image source={require('./images/darrereCapDreta.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lateral}>
                        <TouchableOpacity style={{}} onPress={() => this.select("Front left face")}>
                            <Image source={require('./images/caraEsquerra.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={() => this.select("Front right face")}>
                            <Image source={require('./images/davantCaraDreta.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={() => this.select("Back left face")}>
                            <Image source={require('./images/darrereCaraEsquerra.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={() => this.select("Back right face")}>
                            <Image source={require('./images/darrereCaraDreta.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lateral}>
                        {this.state.selected["Front left neck"] &&
                            <TouchableOpacity style={styles.headPart} onPress={() => this.select("Front left neck")}>
                                <Image source={require('./images/collDavantEsquerra.png')}></Image>
                            </TouchableOpacity> || <TouchableOpacity style={{}} onPress={() => this.select("Front left neck")}>
                                <Image source={require('./images/collDavantEsquerra.png')}></Image>
                            </TouchableOpacity>}
                        <TouchableOpacity style={{}} onPress={() => this.select("Front right neck")}>
                            <Image source={require('./images/davantCollDreta.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={() => this.select("Back left neck")}>
                            <Image source={require('./images/darrereCollEsquerra.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={() => this.select("Back right neck")}>
                            <Image source={require('./images/darrereCollDreta.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ width: "100%", }} onPress={() => this.select("None")}>
                        <Text>None of this</Text>
                    </TouchableOpacity>
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
    lateral: {
        flexDirection: 'row',
    },

    headPart: {
        opacity: 0.2
    },
    seccioBotons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

    },
});
