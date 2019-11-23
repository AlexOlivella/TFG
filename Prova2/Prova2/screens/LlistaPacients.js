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

	static navigationOptions = {
		header:null
	}

	obrirDrawer = () => {
		this.props.navigation.openDrawer();
	}
	

	
	
	render() {
		////console.log(this.props)
		const { navigation } = this.props;
		const uid_user = navigation.getParam('uid_user', 'NO-User');
		var user = firebase.auth().currentUser;

		return (

			<View style={styles.container}>
							<StatusBar barStyle={"default"}/>

				<View>
					<Header
						style={{width:'100%'}}
						placement="left"
						leftComponent={<Icon name='menu' onPress={ ()=> this.obrirDrawer()} />}
						centerComponent={{ text: 'Pacient list', style: { color: '#fff' } }}
					/>
				</View>
				
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		
		backgroundColor: '#7BF0E6',
	},
	toolbar: {
		height: 56,
		backgroundColor: '#FBEAFF'
	},
});