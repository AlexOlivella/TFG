import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity } from 'react-native';



export default class Causes extends Component {
    static navigationOptions = {
        header: null
    }

    next(causa) {
        var { navigation } = this.props;
        var dataIni = navigation.getParam('dataIni');
        var intensitatDolor = navigation.getParam('intensitatDolor')
        var zonaCap = navigation.getParam('zonaCap')
        var simptomes = navigation.getParam('simptomes')

        this.props.navigation.navigate(
            "Impediments",
            {
                dataIni,
                intensitatDolor,
                zonaCap,
                simptomes,
                causes: causa

            }
        )
        console.log("causes")
    }
    render() {

        return (
            <View style={styles.container}>
                <View>
                    <Text> Causes</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={()=>this.next("Stress")}>
                        <Text>Stress</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.next("Anxiety")}>
                        <Text>Anxiety</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.next("Depression")}>
                        <Text>Depression</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.next("Sleep a lot")}>
                        <Text>Sleep a lot</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.next("Not sleep enough")}>
                        <Text>Not sleep enough</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.next("Dehydration")}>
                        <Text>Dehydration</Text>
                    </TouchableOpacity>
                    {/*<TouchableOpacity>
                        <Text> Hormonal</Text>
                    </TouchableOpacity>*/}
                    <TouchableOpacity onPress={()=>this.next("Diet")}>
                        <Text>Diet</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.next("Physical activity changes")}>
                        <Text>Physical activity changes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.next("Sunlight")}>
                        <Text>Sunlight</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.next(" Seeing intermitent lights")}>
                        <Text>Seeing intermitent lights</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.next("Smell permufe")}>
                        <Text>Smell permufe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.next("Smell incense")}>
                        <Text>Smell incense</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.next("Smell tobacco")}>
                        <Text>Smell tobacco</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.next("Loud noises")}>
                        <Text>Loud noises</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.next("Others")}>
                        <Text>Others</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    

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
