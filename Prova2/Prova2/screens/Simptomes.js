import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity } from 'react-native';



export default class Simptomes extends Component {
    static navigationOptions = {
        header: null
    }

    next(simptoma) {
        var { navigation } = this.props;
        var dataIni = navigation.getParam('dataIni');
        var intensitatDolor = navigation.getParam('intensitatDolor')
        var zonaCap = navigation.getParam('zonaCap')
        this.props.navigation.navigate(
            "Causes",
            {
                dataIni,
                intensitatDolor,
                zonaCap,
                simptomes: simptoma
            }
        )
        console.log("simptomes")
    }
    render() {

        return (
            <View style={styles.container}>
                <View>
                    <Text> Simptomes</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={()=> this.next("Blind spots")}>
                        <Text> Blind spots</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Zig zag lanes")}>
                        <Text> Zig zag lanes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Shiny points")}>
                        <Text> Shiny points</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Vision problems")}>
                        <Text> Vision problems</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Vision loss")}>
                        <Text> Vision loss</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Flashlights")}>
                        <Text> Flashlights</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Sound intolerance")}>
                        <Text> Sound intolerance</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Hear noises")}>
                        <Text> Hear noises</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Odor intolerance")}>
                        <Text> Odor intolerance</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Nausea or vomiting")}>
                        <Text> Nausea or vomiting</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Tingling in body parts")}>
                        <Text> Tingling in body parts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Talk difficulty")}>
                        <Text> Talk difficulty</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Language comprehension difficulty")}>
                        <Text> Language comprehension difficulty</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Tearing")}>
                        <Text> Tearing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Nasal congestion")}>
                        <Text> Nasal congestion</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Numbness")}>
                        <Text> Numbness</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Uncontrollable movements")}>
                        <Text> Uncontrollable movements</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.next("Others")}>
                        <Text> Others</Text>
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
