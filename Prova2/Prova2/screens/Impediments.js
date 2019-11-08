import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity } from 'react-native';



export default class Impediments extends Component {
    static navigationOptions = {
        header: null
    }

    next(impediment) {
        var { navigation } = this.props;
        var dataIni = navigation.getParam('dataIni');
        var intensitatDolor = navigation.getParam('intensitatDolor')
        var zonaCap = navigation.getParam('zonaCap')
        var simptomes = navigation.getParam('simptomes')
        var causes = navigation.getParam('causes')
        this.props.navigation.navigate(
            "Exercici",
            {
                dataIni,
                intensitatDolor,
                zonaCap,
                simptomes,
                causes,
                impediments: impediment

            }
        )
    }
    render() {
        var dataIni = this.props.navigation.getParam('dataIni');
        var intensitatDolor = this.props.navigation.getParam('intensitatDolor')
        return (
            <View style={styles.container}>
                <View>
                    <Text>Impediments</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={()=>this.next("Move")}>
                        <Text>Move</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.next("Breathe")}>
                        <Text>Breathe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.next("Walk")}>
                        <Text>Walk</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.next("Make exercise")}>
                        <Text>Make exercise</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.next("Go to school")}>
                        <Text>Go to school</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.next("Go to work")}>
                        <Text>Go to work</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.next("Forced to go home")}>
                        <Text>Forced to go home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.next("Others")}>
                        <Text>Others</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    
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
        backgroundColor: '#7BF0E6',
    }
});
