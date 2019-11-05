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
        this.props.navigation.navigate(
            "EstatAnim",
            { dataIni,
             intensitatDolor: 6/*this.state.intensitatDolor*/ }
        )
    }
    render() {
        var { navigation } = this.props;
        var dataIni = navigation.getParam('dataIni');
        return (
            <View style={styles.container}>
                <Text> IntensitatDolor</Text>
                <Text> Summary: {dataIni}</Text>

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
