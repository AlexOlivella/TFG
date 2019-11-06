import React, { Component } from 'react';
import { StyleSheet, View, } from 'react-native';



export default class Simptomes extends Component {
    static navigationOptions={
        header:null
    }
    render() {
    
        return (
            <View style={styles.container}>

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
