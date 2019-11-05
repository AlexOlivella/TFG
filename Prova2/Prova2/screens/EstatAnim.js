import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert} from 'react-native';



export default class EstatAnim extends Component {
    static navigationOptions={
        header:null
    }

    next() {
        var { navigation } = this.props;
        var dataIni = navigation.getParam('dataIni');
        var intensitatDolor = navigation.getParam('intensitatDolor')
        this.props.navigation.navigate(
            "ZonaCap",
            { dataIni,
             intensitatDolor,
             estatAnim: "deprimit" }
        )
    }
    render() {
        var dataIni = this.props.navigation.getParam('dataIni');
        var intensitatDolor = this.props.navigation.getParam('intensitatDolor')
        return (
            <View style={styles.container}>
                <Text>Estat Anim</Text>
                <Text>Summary: {dataIni} , {intensitatDolor}</Text>
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
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#7BF0E6', 
    }
});
