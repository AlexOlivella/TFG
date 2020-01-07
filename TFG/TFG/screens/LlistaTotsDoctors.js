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
		
		//console.log("Doctors finals: ", result)
		var user = firebase.auth().currentUser
		let result = await FirebaseAPI.getAllMetges()
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
						//this.getAllMetges()
						alert("Doctor added successfully, wait until you get accepted!")
					}
				},
			],
			{ cancelable: false })
	}

	render() {
		//console.log(this.props)
		if (!this.state.isLoaded) return (<View style={[styles.container, { justifyContent: 'center', paddingHorizontal: 10 }]}><ActivityIndicator size="large" color="black"/></View>)
		if (this.state.llistaDoctorsAux.length == 0) return (
			<View style={[styles.container, { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }]}>
				<Text style={{ fontSize: 30 }}>There are no doctors in our database or you have already added them all, wait until we have a new one!</Text>
				<Image style={{ width: 50, height: 50 }} source={require('./images/sadImage.png')}></Image>
			</View>)
		return (

				<SafeAreaView style={styles.container}>
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
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});