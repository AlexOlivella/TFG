import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Button } from 'react-native';
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen');
import firebase from 'firebase'
import * as FirebaseAPI from '../modules/firebaseAPI'


export default class prova extends Component {

	constructor(props) {
		super(props);
		this.state = {
			active: false,
		};

	}

	static navigationOptions = {
		title: 'HeaderTitle',
		headerStyle: {
			backgroundColor: '#f4511e',
		},
		headerTintColor: '#0ff',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	}

	onPress = () => {
		this.drawer.openDrawer();

	}
	getCurrentTime() {
		var date = new Date().getDate(); //Current Date
		var month = new Date().getMonth() + 1; //Current Month
		var year = new Date().getFullYear(); //Current Year
		var hours = new Date().getHours(); //Current Hours
		var min = new Date().getMinutes(); //Current Minutes
		var sec = new Date().getSeconds(); //Current Seconds
		return date + '-' + month + '-' + year + ' ' + hours + ':' + min + ':' + sec

	};

	createMigraine() {
		var user = firebase.auth().currentUser;
		var { navigation } = this.props;
    	var navigate = navigation.navigate;
		navigate("Exercici", {dataIni: this.getCurrentTime()})
		//await FirebaseAPI.createMigranya(user.uid, this.getCurrentTime(), "estatAnim", "medicament", "zonaCos")
	}
	render() {
		////console.log(this.props)
		const { navigation } = this.props;
		const uid_user = navigation.getParam('uid_user', 'NO-User');
		var user = firebase.auth().currentUser;

		return (
			<View style={styles.container}>
				<Text style={{ fontSize: 30 }}> Welcome to the app </Text>
				<Text style={{ fontSize: 30 }}> {user.email} </Text>
				<Button onPress={() => { this.createMigraine() }} title="Add migraine"> </Button>
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
	seccioBotons: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#7BF0E6',

	},
	toolbar: {
		height: 56,
		backgroundColor: '#FBEAFF'
	},
	seccioBotons: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#FBEAFF',

	},
});