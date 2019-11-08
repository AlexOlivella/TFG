import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity } from 'react-native';



export default class Menstruacio extends Component {
    static navigationOptions = {
        header: null
    }

    next(tipus) {
        var { navigation } = this.props;
        var dataIni = navigation.getParam('dataIni');
        var intensitatDolor = navigation.getParam('intensitatDolor')
        var zonaCap = navigation.getParam('zonaCap')
        var simptomes = navigation.getParam('simptomes')
        var causes = navigation.getParam('causes')
        var impediments = navigation.getParam('impediments')
        var exercicis = navigation.getParam('exercicis')
        this.props.navigation.navigate(
            "Medicaments",
            {
                dataIni,
                intensitatDolor,
                zonaCap,
                simptomes,
                causes,
                impediments,
                exercicis,
                menstruacio: tipus,

            }
        )
        console.log("menstruacio")
    }
    render() {

        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Text> Menstruacio</Text>
                </View>
                <View>
                <TouchableOpacity onPress={()=> this.next("No")}>
                        <Text> No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Low")}>
                        <Text> Low</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Moderate")}>
                        <Text> Moderate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Hard")}>
                        <Text> Hard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Soon")}>
                        <Text> Soon</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        onPress={() => {
                            this.next("")
                        }}
                        title="Next"
                    >

                    </Button>
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
    }
});
