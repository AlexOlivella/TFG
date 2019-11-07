import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity } from 'react-native';



export default class Impediments extends Component {
    static navigationOptions={
        header:null
    }

    next() {
        var { navigation } = this.props;
        var dataIni = navigation.getParam('dataIni');
        var intensitatDolor = navigation.getParam('intensitatDolor')
        this.props.navigation.navigate(
            
            {/* dataIni,
             intensitatDolor,
            estatAnim: "deprimit" */}
        )
    }
    render() {
        var dataIni = this.props.navigation.getParam('dataIni');
        var intensitatDolor = this.props.navigation.getParam('intensitatDolor')
        return (
            <View style={styles.container}>
                <View>
                   <Text>Estat Anim</Text> 
                </View>
                
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
