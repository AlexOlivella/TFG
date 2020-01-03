import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, ScrollView, Image } from 'react-native';
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen');
import firebase from 'firebase'
import * as FirebaseAPI from '../modules/firebaseAPI'
import { Header, Icon, SearchBar, List, ListItem, } from 'react-native-elements'

export default class LlistaTotsDoctors extends Component {

	constructor(props) {
		super(props);
		this.state = {
			llistaDoctors: [],
			refresh: this.props.navigation.state.params.refresh(),
			firstName: "",
			lastName: "",
			isLoaded: false,
			llistaDoctorsAux: [],
			search: '',
		};
		this.arrayHolder = [];

	}
	static navigationOptions = {
		headerStyle: {
			backgroundColor: '#2089dc'
		},
		headerTitle: 'All doctors',
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontSize: 20,
		},
	}
	componentDidMount() {
		this.getDataUser()
		this.getAllMetges()
	}
	async getDataUser() {
		var user = firebase.auth().currentUser
		let data = await FirebaseAPI.readUserData(user.uid, "Pacient")
		this.setState({
			firstName: data.firstName,
			lastName: data.lastName
		})
	}

	async getAllMetges() {
		var user = firebase.auth().currentUser
		let doctors = await FirebaseAPI.getAllMetges();
		let doctorsDinsUsuari = await FirebaseAPI.getLlistaDoctorsFromPacient(user.uid)
		//console.log("Tots els metges", doctors)
		//console.log("Metges de l'usuari", doctorsDinsUsuari)
		let result = doctors
		console.log("result Inicial: ", result)
		if (doctorsDinsUsuari.length != 0) {
			for (var i = 0; i < doctors.length; i++) {
				for (var j = 0; j < doctorsDinsUsuari.length; j++) {
					//console.log("doctors[i].uid: ", doctors[i].uid, " doctorsDinsUsuari[j].uid: ", doctorsDinsUsuari[j].uid)
					//if (doctors[i].uid != doctorsDinsUsuari[j].uid) {
					console.log("result Bucle: ", result)
					if (doctors[i].uid == doctorsDinsUsuari[j].uid) {
						result.splice(i, 1)
						//result.push({ uid: doctors[i].uid, nom: doctors[i].nom })
						console.log("result Dins de if: ", result)
					}
				}

			}
		}
		else if (doctorsDinsUsuari.length == 0) {
			for (var i = 0; i < doctors.length; i++) {
				result.push({ uid: doctors[i].uid, nom: doctors[i].nom })
				console.log("result amb doctors dins usuari == 0: ", result)
			}
		}
		//console.log("Doctors finals: ", result)

		this.setState({
			llistaDoctors: result,
			isLoaded: true,
			llistaDoctorsAux: result,
		}, function () {
			this.arrayholder = result
		})
	}


	search = text => {
		console.log(text);
	};
	clear = () => {
		this.search.clear();
	};
	SearchFilterFunction(text) {
		//passing the inserted text in textinput
		const newData = this.arrayholder.filter(function (item) {
			//applying filter for the inserted text in search bar
			const itemData = item.nom ? item.nom.toUpperCase() : ''.toUpperCase();
			const textData = text.toUpperCase();
			return itemData.indexOf(textData) > -1;
		});

		this.setState({
			//setting the filtered newData on datasource
			//After setting the data it will automatically re-render the view
			llistaDoctors: newData,
			search: text,
		});
	}

	agregaDoctor(uid_metge) {
		var user = firebase.auth().currentUser
		Alert.alert("Add doctor", "Do you want to add this doctor?",
			[
				{ text: 'Cancel', onPress: () => { return null } },
				{
					text: 'Confirm', onPress: () => {
						FirebaseAPI.addDoctor(user.uid, uid_metge, this.state.firstName, this.state.lastName)
						this.getAllMetges()
						alert("Doctor added successfully, wait until you get accepted!")
					}
				},
			],
			{ cancelable: false })
	}

	render() {
		//console.log(this.props)
		const { navigation } = this.props;
		const uid_user = navigation.getParam('uid_user', 'NO-User');
		var user = firebase.auth().currentUser;
		if (!this.state.isLoaded) return (<View style={[styles.container, { justifyContent: 'center', paddingHorizontal: 10 }]}><ActivityIndicator size="large" /></View>)
		if (this.state.llistaDoctorsAux.length == 0) return (
			<View style={[styles.container, { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }]}>
				<Text style={{ fontSize: 30 }}>There are no doctors in our database or you have already added them all, wait until we have a new one!</Text>
				<Image style={{ width: 50, height: 50 }} source={require('./images/sadImage.png')}></Image>
			</View>)
		return (

			<View style={styles.container}>
				<SafeAreaView style={{ flex: 1 }}>
					<ScrollView style={{ flex: 1 }}>
						<SearchBar
							round
							searchIcon={{ size: 24 }}
							onChangeText={text => this.SearchFilterFunction(text)}
							onClear={text => this.SearchFilterFunction('')}
							placeholder="Type Here..."
							value={this.state.search}
							lightTheme
							containerStyle={{ backgroundColor: '#2089dc' }}
							inputContainerStyle={{ backgroundColor: 'white' }}
						/>
						<FlatList
							data={this.state.llistaDoctors}
							renderItem={({ item }) =>
								<TouchableOpacity onPress={() => this.agregaDoctor(item.uid)}>
									<ListItem containerStyle={{ backgroundColor: "#fff", borderBottomWidth: 1, borderColor: '#2089dc' }}
										title={item.nom}
									/>
								</TouchableOpacity>
							}
							keyExtractor={item => item.uid}
						/>
					</ScrollView>
				</SafeAreaView>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,

		backgroundColor: '#fff',
	},
	flatview: {
		justifyContent: 'center',

	},
	name: {
		fontSize: 18,
		paddingHorizontal: 10,
		borderBottomWidth: 1,
		borderBottomColor: "grey"
	},
	email: {
		color: 'red'
	}
});