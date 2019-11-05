import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';



export default class IntensitatDolor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            intensitatDolor: "",
        };

    }

    static navigationOptions = {
        header: null
    }

    next() {
        var { navigation } = this.props;
        var dataIni = navigation.getParam('dataIni');
        var intensitatDolor = navigation.getParam('intensitatDolor')
        var estatAnim = navigation.getParam('estatAnim')
        /*this.props.navigation.navigate(
            "",
            { dataIni,
             intensitatDolor,
             estatAnim:,
            zonaCap: "davant esquerra" }
        )*/
    }
    render() {
        var { navigation } = this.props;
        var dataIni = navigation.getParam('dataIni');
        var intensitatDolor = navigation.getParam('intensitatDolor')
        var estatAnim = navigation.getParam('estatAnim')

        console.log("Parametres: " ,this.props.navigation.state.params.dataIni)
        return (
            <View style={styles.container}>
                <Text> ZonaCap</Text>
                <Text> Summary:  </Text>

                <View>
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
