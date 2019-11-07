import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity } from 'react-native';



export default class ZonaCap extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };

    }

    static navigationOptions = {
        header: null
    }

    next(zonaCap) {
        var { navigation } = this.props;
        var dataIni = navigation.getParam('dataIni');
        var intensitatDolor = navigation.getParam('intensitatDolor')
        this.props.navigation.navigate(
            "Simptomes",
            {
                dataIni,
                intensitatDolor,
                zonaCap: zonaCap
            }
        )
        console.log("zonacap")

    }
    render() {
        var { navigation } = this.props;

        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Text> ZonaCap</Text>
                </View>
                <View style={{ flex: 2 }}>
                    <View style={styles.lateral}>
                        <TouchableOpacity style={{}} onPress={this.next("front left head")}>
                            <Image source={require('./davantDaltEsquerra.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={this.next("front right head")}>
                            <Image source={require('./davantDaltDreta.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={this.next("back left head")}>
                            <Image source={require('./darrereCapEsquerra.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={this.next("back right head")}>
                            <Image source={require('./darrereCapDreta.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lateral}>
                        <TouchableOpacity style={{}} onPress={this.next("front left face")}>
                            <Image source={require('./caraEsquerra.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={this.next("front right face")}>
                            <Image source={require('./davantCaraDreta.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={this.next("back left face")}>
                            <Image source={require('./darrereCaraEsquerra.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={this.next("back right face")}>
                            <Image source={require('./darrereCaraDreta.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lateral}>
                        <TouchableOpacity style={{}} onPress={this.next("front left neck")}>
                            <Image source={require('./collDavantEsquerra.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={this.next("front right neck")}>
                            <Image source={require('./davantCollDreta.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={this.next("back left neck")}>
                            <Image source={require('./darrereCollEsquerra.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={this.next("back right neck")}>
                            <Image source={require('./darrereCollDreta.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    {/*<Button
                        onPress={() => {
                            this.next()
                        }}
                        title="Next"
                    >

                    </Button>*/}
                    <Button
                        onPress={() => {
                            Alert.alert(
                                'Cancel',
                                'Do you want to canel this process?',
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
        backgroundColor: '#7BF0E6',
    },
    lateral: {
        flexDirection: 'row',
    },
});
