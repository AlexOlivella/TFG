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

            }
        };

    }

    static navigationOptions = {
        header: null
    }

    select(element) {
        let selected = this.state.selected;

        if (element === "None of this")
            selected = {}

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
                <View style={{ flex: 2 , justifyContent:'center'}}>
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
                    <TouchableOpacity style={{ width: "100%", }} onPress={() => this.select("None of this")}>
                        <Text>None of this</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    lateral: {
        flexDirection: 'row',
    },

    headPart: {
        opacity: 0.2
    }
});
