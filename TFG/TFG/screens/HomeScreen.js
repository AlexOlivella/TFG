import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Button } from 'react-native';
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen');
import firebase from 'firebase'
import * as FirebaseAPI from '../modules/firebaseAPI'
import { Header, Icon } from 'react-native-elements'

export default class HomeScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
		};

	}


	obrirDrawer = () => {
		this.props.navigation.openDrawer();
	}


	createMigraine() {
		var user = firebase.auth().currentUser;

		this.props.navigation.navigate("HoraMigranya")
		//await FirebaseAPI.createMigranya(user.uid, this.getCurrentTime(), "estatAnim", "medicament", "zonaCos")
	}

	render() {
		//console.log(this.props)
		const { navigation } = this.props;
		const uid_user = navigation.getParam('uid_user', 'NO-User');
		var user = firebase.auth().currentUser;

		return (

			<View style={styles.container}>
				<StatusBar barStyle={"default"} />

				<View>
					<Header
						style={{ width: '100%' }}
						placement="left"
						leftComponent={<Icon name='menu' onPress={() => this.obrirDrawer()} />}
						centerComponent={{ text: 'Home', style: { color: '#fff' } }}
					/>
				</View>
				<View style={{flex:3,justifyContent:'center', alignItems:'center'}}>
					<Text style={{ fontSize: 30 }}> Welcome to Mygraine </Text>
				</View>
				
				<View style={{flex:2,  justifyContent:'center', paddingHorizontal:10}}>
					<Button onPress={() => { this.createMigraine() }} title="Register an attack"> </Button>
				</View>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,

		backgroundColor: '#fff',
	},
});