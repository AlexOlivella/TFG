import React, { Component } from 'react';
import { StyleSheet, View, } from 'react-native';



export default class NomClasse extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        }
      }

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
		backgroundColor: '#fff', 
    }
});
