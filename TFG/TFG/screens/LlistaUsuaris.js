import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, ScrollView, ToastAndroid, Image } from 'react-native';
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen');
import firebase from 'firebase'
import * as FirebaseAPI from '../modules/firebaseAPI'
import { Header, Icon, SearchBar, List, ListItem, Badge } from 'react-native-elements'

export default class LlistaUsuaris extends Component {

	constructor(props) {
		super(props);
		this.state = {
			llistaData: [],
			isLoaded: false,
			search: '',
			pendings: "",
			tipus: "",
			llistaDataAux: [],

		};
		this.arrayHolder = [];

	}

	static navigationOptions = {
		header: null
	}
	obrirDrawer = () => {
		this.props.navigation.openDrawer();
	}
	componentWillMount() {
		this.comprovarTipus()

	}

	refresh() {
		this.comprovarTipus()


	}
	async comprovarTipus() {
		var user = firebase.auth().currentUser;
		resposta = await FirebaseAPI.comprovarTipusUsuari(user.uid)
		//console.log("Tipus d'usuari", resposta)
		this.setState({ tipus: resposta })
		this.getDades()
	}

	openAllDoctors() {
		this.props.navigation.navigate("LlistaTotsDoctors", { refresh: () => this.refresh() })
	}
	openPendings() {
		this.props.navigation.navigate("Pendings", { refresh: () => this.refresh() })
	}
	obteDades(user_uid) {
		this.props.navigation.navigate("InfoPacient", { pacient: user_uid })
	}
	async getDades() {
		var user = firebase.auth().currentUser;
		if (this.state.tipus == "Pacient") {
			let doctors = await FirebaseAPI.getDoctorsAdded(user.uid);
			//console.log("Metges", doctors)
			this.setState({
				llistaData: doctors,
				isLoaded: true,
				llistaDataAux: doctors,
			},
				function () {
					this.arrayholder = doctors
				})

		}
		else if (this.state.tipus == "Doctor") {

			var pacients = await FirebaseAPI.getPacientsFromMetge(user.uid)
			var pending = await FirebaseAPI.getNumPendings(user.uid)
			//console.log("Pendings", pending)
			this.setState({
				pendings: pending,
				isLoaded: true,
				llistaData: pacients,
				llistaDataAux: pacients,
			},
				function () {
					this.arrayholder = pacients
				})

		}



	}

	agregarDoctor(uid_metge) {
		var user = firebase.auth().currentUser
		Alert.alert("Export migraines", "Do you want to export your migraines to this doctor?",
			[
				{ text: 'Cancel', onPress: () => { return null } },
				{
					text: 'Confirm', onPress: () => {
						Alert.alert("Export done")
					}
				},
			],
			{ cancelable: false })
	}

	clickOnUser(uid) {
		if (this.state.tipus == "Doctor") {
			this.obteDades(uid)
		}
		else if (this.state.tipus == "Pacient") {
			this.agregarDoctor(uid)
		}
	}
	desagregarPacient(uid) {
		Alert.alert("Delete pacient", "Do you want to delete this pacient?",
			[
				{ text: 'Cancel', onPress: () => { return null } },
				{
					text: 'Confirm', onPress: async () => {
						var user = firebase.auth().currentUser
						let error = await FirebaseAPI.desagregaPacient(user.uid, uid)

						ToastAndroid.show("User succesfully deleted", ToastAndroid.SHORT)
						this.getDades()

					}
				},
			],
			{ cancelable: false })

	}
	desagregarDoctor(uid) {
		Alert.alert("Delete doctor", "Do you want to delete this doctor?",
			[
				{ text: 'Cancel', onPress: () => { return null } },
				{
					text: 'Confirm', onPress: async () => {
						var user = firebase.auth().currentUser
						let error = await FirebaseAPI.desagregaDoctor(user.uid, uid)

						ToastAndroid.show("User succesfully deleted", ToastAndroid.SHORT)
						this.getDades()

					}
				},
			],
			{ cancelable: false })

	}
	desagregarUser(uid) {
		if (this.state.tipus == "Doctor") {
			this.desagregarPacient(uid)
		}
		else if (this.state.tipus == "Pacient") {
			this.desagregarDoctor(uid)
		}
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
			llistaData: newData,
			search: text,
		});
	}
	badgePendings() {
		if (this.state.pendings == 0) return
		else return this.state.pendings
	}
	render() {
		//console.log(this.props)
		/*if (this.state.loading) return (<View> <ActivityIndicator size="large" color="black" /> </View>)
		else {*/
		const { navigation } = this.props;
		const uid_user = navigation.getParam('uid_user', 'NO-User');
		var user = firebase.auth().currentUser;
		let pending
		let header
		let badge
		if (this.state.pendings != 0) badge = <Badge
			value={this.state.pendings}
			status="error"
			containerStyle={{ position: 'absolute', top: -4, right: -4 }}
			onPress={() => this.openPendings()}
		/>
		if (this.state.tipus == "Doctor") {
			header = <Header
				style={{ width: '100%' }}
				placement="left"
				leftComponent={<Icon name='menu'  color="#fff" onPress={() => this.obrirDrawer()} />}
				centerComponent={{ text: 'Pacient list', style: { color: '#fff', fontSize: 20 } }}
				rightComponent={
					<View>
						<Icon name='people' color="#fff"  onPress={() => this.openPendings()} />
						{badge}
					</View>

				}
			/>
		}
		else if (this.state.tipus == "Pacient") {
			header = <Header
				style={{ width: '100%' }}
				placement="left"
				leftComponent={<Icon name='menu' color="#fff"  onPress={() => this.obrirDrawer()} />}
				centerComponent={{ text: 'Doctors list', style: { color: '#fff', fontSize: 20 } }}
				rightComponent={<Icon name='add'  color="#fff" onPress={() => this.openAllDoctors()} />}
			/>
		}
		if (!this.state.isLoaded) return (<View style={[styles.container, { justifyContent: 'center' }]}><ActivityIndicator size="large" color='black' /></View>)
		if (this.state.llistaDataAux.length == 0 && this.state.tipus == "Doctor") return (
			<View style={styles.container}>
				{header}
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
					<Text style={{ fontSize: 30 }}>You don't have any pacient in your pacient list, ask some pacients to add you as their doctor or check your pending requests</Text>
					<Image source={require("./images/smile.jpeg")} style={{ width: 50, height: 50 }}></Image>
				</View>
			</View>
		)
		if (this.state.llistaDataAux.length == 0 && this.state.tipus == "Pacient") return (
			<View style={styles.container}>
				{header}
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
					<Text style={{ fontSize: 30 }}>You don't have any doctor on your doctor list, try to add one</Text>
					<Image source={require("./images/smile.jpeg")} style={{ width: 50, height: 50 }}></Image>
				</View>
			</View>
		)
		return (

			<View style={styles.container}>
				<View>
					{header}
				</View>
				{/*pending*/}
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
							data={this.state.llistaData}
							renderItem={({ item }) =>
								<TouchableOpacity onPress={() => this.clickOnUser(item.uid)} onLongPress={() => this.desagregarUser(item.uid)}>
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
		//}
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