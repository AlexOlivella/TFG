import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Button, Header } from 'react-native-elements'


export default class Exercici extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    static navigationOptions = {
        header: null
    }

    next(exercici) {
        var { navigation } = this.props;
        var dataIni = navigation.getParam('dataIni');
        var intensitatDolor = navigation.getParam('intensitatDolor')
        var zonaCap = navigation.getParam('zonaCap')   
        var simptomes = navigation.getParam('simptomes')
        var causes = navigation.getParam('causes')

        this.props.navigation.navigate(
            "Menstruacio",
            {  dataIni,
                intensitatDolor,
                zonaCap,
                simptomes,
                causes,
                exercicis: exercici
             }
        )
        console.log("exercici")

        //}
       /* else{
                var { navigation } = this.props;
                var dataIni = navigation.getParam('dataIni');
                this.props.navigation.navigate(
                    "Medicaments",
                    {
                        dataIni,
                        intensitatDolor: dolor,
        
                    }
                )

        }*/
    }
    render() {

        return (
            <View style={styles.container}>
                
                <View style={styles.titol}>
                    <Text style={{ fontSize: 20, alignItems: "center" }}> Did you do some exercise?</Text>

                </View>
                <View style={styles.seccioOpcions}>
                    <View style={styles.lateral}>
                        <TouchableOpacity onPress={() => { this.next("Low") }}>
                            <View>
                                <Text
                                > Low
                            </Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <Button
                                title="Moderate"
                                type="outline"

                                color="#38B3EF"
                                rounded={true}
                                onPress={() => { this.next("Moderate") }}

                            ></Button>
                        </View>
                    </View>
                    <View style={styles.lateral}>
                        <View>
                            <Button
                                rounded={true}
                                color="#38B3EF"
                                type="outline"
                                title="Hard"
                                onPress={() => { this.next("Hard") }}

                            >
                            </Button>
                        </View>

                        <View>
                            <Button
                                title="Intensive"
                                type="outline"
                                color="#38B3EF"
                                onPress={() => { this.next("Intensive") }}
                            ></Button>
                        </View>
                    </View>
                </View>
                <View style={styles.seccioBuida}>

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
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "red"
    },
    seccioOpcions: {
        flex: 1,
        //justifyContent: "center",
        justifyContent: "space-between",
    },
    titol: {
        flex: 1,
        alignItems: "flex-start"
    },
    seccioBuida: {
        flex: 1,
    }
});
