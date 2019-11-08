import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity } from 'react-native';



export default class Summary extends Component {
    static navigationOptions = {
        header: null
    }
    next() {
        var { navigation } = this.props;
        var dataIni = navigation.getParam('dataIni');
        this.props.navigation.navigate(
            "HomeScreen"
        )
        console.log("summary")
    }
    render() {
        var { navigation } = this.props;
        var dataIni = navigation.getParam('dataIni');
        var intensitatDolor = navigation.getParam('intensitatDolor')
        var zonaCap = navigation.getParam('zonaCap')
        var simptomes = navigation.getParam('simptomes')
        var causes = navigation.getParam('causes')
        var menstruacio = navigation.getParam('menstruacio')
        var exercicis = navigation.getParam('exercicis')
        var impediments = navigation.getParam('impediments')
        var medicaments = navigation.getParam('medicaments')
        return (
            <View style={styles.container}>
                <View>
                    <Text> Summary</Text>
                    <Text> {dataIni}</Text>
                    <Text> {intensitatDolor}</Text>
                    <Text> {zonaCap}</Text>
                    <Text> {simptomes}</Text>
                    <Text> {causes}</Text>
                    <Text> {impediments}</Text>
                    <Text> {exercicis}</Text>
                    <Text> {menstruacio}</Text>
                    <Text> {medicaments}</Text>
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
