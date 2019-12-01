import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ActivityIndicator, Alert,SafeAreaView, ScrollView } from 'react-native';
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
		};
	}

	static navigationOptions = {
		headerStyle: {
			backgroundColor: '#2089dc'
		}
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
		console.log("Tots els metges", doctors)
		console.log("Metges de l'usuari", doctorsDinsUsuari)
		let result = []
		for (var i = 0; i < doctors.length; i++) {
			for (var j = 0; j < doctorsDinsUsuari.length; j++) {
				if (doctors[i].uid != doctorsDinsUsuari[j].uid)
					result.push({ uid: doctors[i].uid, nom: doctors[i].nom })
			}

		}
		console.log("Doctors finals: ", result)

		this.setState({
			llistaDoctors: result,
			isLoaded: true
		})
	}

	componentDidMount() {
		this.getDataUser()
		this.getAllMetges()
	}
	renderHeader = () => {
		return <SearchBar
			placeholder="Type Here..."
			lightTheme
			round
			containerStyle={{ backgroundColor: '#7BF0E6' }}
			inputContainerStyle={{ backgroundColor: 'white' }}
			onChangeText={(itemValue) => this.setState({ search: itemValue })}
			value={this.state.search} />;
	};

	renderFooter = () => {
		if (!this.state.loading) return null;

		return (
			<View
				style={{
					paddingVertical: 20,
					borderTopWidth: 1,
					borderColor: "#7BF0E6"
				}}
			>
				<ActivityIndicator animating size="large" />
			</View>
		);
	};
	renderSeparator = () => {
		return (
			<View
				style={{
					height: 1,
					width: "86%",
					backgroundColor: "#7BF0E6",
					marginLeft: "14%"
				}}
			/>
		);
	};


	agregaDoctor(uid_metge) {
		var user = firebase.auth().currentUser
		Alert.alert("Add doctor", "Do you want to add this doctor?",
			[
				{ text: 'Cancel', onPress: () => { return null } },
				{
					text: 'Confirm', onPress: () => {
						FirebaseAPI.addDoctor(user.uid, uid_metge, this.state.firstName, this.state.lastName)
						this.props.navigation.state.params.refresh()
						this.getAllMetges()


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
		if (!this.state.isLoaded) return (<View style={[styles.container, { justifyContent: 'center' }]}><ActivityIndicator size="large" /></View>)
		if (this.state.llistaDoctors.length == 0) return (<View style={[styles.container, { justifyContent: 'center' }]}><Text>No such document!</Text></View>)
		return (

			<View style={styles.container}>
				<StatusBar barStyle={"default"} />
				<SafeAreaView style={{ flex: 1 }}>
					<ScrollView style={{ flex: 1 }}>
						<FlatList
							data={this.state.llistaDoctors}
							renderItem={({ item }) =>
								<TouchableOpacity onPress={() => this.agregaDoctor(item.uid)}>
									<ListItem containerStyle={{ backgroundColor: "#7BF0E6", borderBottomWidth: 1, borderBottomColor: 'white' }}
										title={item.nom}
									/>
								</TouchableOpacity>
							}

							ListFooterComponent={this.renderFooter}
							ItemSeparatorComponent={this.renderSeparator}

							keyExtractor={item => item}
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

		backgroundColor: '#7BF0E6',
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