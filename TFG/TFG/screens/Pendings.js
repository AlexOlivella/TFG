import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, ScrollView, Image } from 'react-native';
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen');
import firebase from 'firebase'
import * as FirebaseAPI from '../modules/firebaseAPI'
import { Header, Icon, SearchBar, List, ListItem, } from 'react-native-elements'

export default class Pendings extends Component {

	constructor(props) {
		super(props);
		this.state = {
			llistaPendings: [],
			refresh: this.props.navigation.state.params.refresh(),
			firstName: "",
			lastName: "",
			isLoaded: false,
			search: '',
		};
		this.arrayHolder = [];

	}

	static navigationOptions = {
		headerStyle: {
			backgroundColor: '#2089dc'
		},
		headerTitle: 'Pending patients',
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontSize: 20,
		},
	}
	componentDidMount() {
		this.getDataUser();
		this.getPendings()

	}
	async getPendings() {
		var user = firebase.auth().currentUser;
		var result = await FirebaseAPI.getPendingsFromMetge(user.uid)
		//console.log("resultat", result)
		this.setState({
			llistaPendings: result,
			isLoaded: true,
			llistaPendingsAux: result
		}, function () {
			this.arrayholder = result
		})
	}
	async getDataUser() {
		var user = firebase.auth().currentUser
		let tipus = await FirebaseAPI.comprovarTipusUsuari(user.uid)
		let data = await FirebaseAPI.readUserData(user.uid, tipus)
		this.setState({
			firstName: data.firstName,
			lastName: data.lastName,
		})
		//console.log("firstname:", this.state.firstName)

		//console.log("lastName:", this.state.lastName)

	}


	agregaPacient(uid_pacient) {
		var user = firebase.auth().currentUser
		Alert.alert("Add patient", "Do you want to add this patient?",
			[
				{ text: 'Cancel', onPress: () => { return null } },
				{
					text: 'Confirm', onPress: () => {
						FirebaseAPI.addPacient(user.uid, uid_pacient, this.state.firstName, this.state.lastName)
						this.props.navigation.state.params.refresh()
						this.getPendings()
					}
				},
			],
			{ cancelable: false })
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
			llistaPendings: newData,
			search: text,
		});
	}
	render() {
		//console.log(this.props)
		const { navigation } = this.props;
		const uid_user = navigation.getParam('uid_user', 'NO-User');
		var user = firebase.auth().currentUser;
		if (!this.state.isLoaded) return (<View style={[styles.container, { justifyContent: 'center' }]}><ActivityIndicator size="large" /></View>)
		if (this.state.llistaPendingsAux.length == 0) return (
			<View style={[styles.container, { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }]}>
				<Text style={{ fontSize: 30 }}>You don't have any pending patient request, ask some patients to add you as their doctor</Text>

				<Image source={require("./images/smile.jpeg")} style={{ width: 50, height: 50 }}></Image>
			</View>
		)
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
							data={this.state.llistaPendings}
							renderItem={({ item }) =>
								<TouchableOpacity onPress={() => this.agregaPacient(item.uid)}>
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