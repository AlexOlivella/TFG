import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen');
import firebase from 'firebase'
import * as FirebaseAPI from '../modules/firebaseAPI'
import { Header, Icon, SearchBar, List, ListItem, } from 'react-native-elements'

export default class LlistaUsuaris extends Component {

	constructor(props) {
		super(props);
		this.state = {
			llistaData: [],
			loading: false,
			search: '',
			pendings: "",
			tipus: ""


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
		this.getDades()
	}
	refresh() {
		this.comprovarTipus()
		this.getDades()

	}
	async comprovarTipus() {
		var user = firebase.auth().currentUser;
		resposta = await FirebaseAPI.comprovarTipusUsuari(user.uid)
		console.log("Tipus d'usuari", resposta)
		this.setState({ tipus: resposta })
	}


	openPendings() {
		this.props.navigation.navigate("Pendings", { refresh: () => this.refresh() })
	}
	obteDades(user_uid) {
		this.props.navigation.navigate("InfoPacient", { pacient: user_uid })
	}
	async getDades() {
		if (this.state.tipus == "Pacient") {
			let doctors = await FirebaseAPI.getAllMetges();
			console.log("Metges", doctors)
			this.setState({
				llistaData: doctors,
			})

		}
		else if (this.state.tipus == "Doctor") {
			var user = firebase.auth().currentUser;
			var pacients = await FirebaseAPI.getPacientsFromMetge(user.uid)
			this.setState({ llistaData: pacients })
			var pending = await FirebaseAPI.getPendings(user.uid)
			console.log("Pendings", pending)
			this.setState({
				pendings: pending,
			})
		}
	}
	agregarDoctor(uid_metge) {
		var user = firebase.auth().currentUser
		Alert.alert("Add doctor", "Do you want to add this doctor?",
			[
				{ text: 'Cancel', onPress: () => { return null } },
				{
					text: 'Confirm', onPress: () => {
						if (user.uid != uid_metge)
							FirebaseAPI.addDoctor(user.uid, uid_metge)
						else alert("You can't add yourself as a doctor")
					}
				},
			],
			{ cancelable: false })
	}

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

	clickOnUser(uid) {
		if (this.state.tipus == "Doctor") {
			this.obteDades(uid)
		}
		else if (this.state.tipus == "Pacient") {
			this.agregarDoctor(uid)
		}
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
			if (this.state.tipus == "Doctor") {
				pending = <Text style={{ fontSize: 40 }}> Pendings: {this.state.pendings} </Text>
				header = <Header
					style={{ width: '100%' }}
					placement="left"
					leftComponent={<Icon name='menu' onPress={() => this.obrirDrawer()} />}
					centerComponent={{ text: 'Pacient list', style: { color: '#fff' } }}
					rightComponent={<Icon name='people' onPress={() => this.openPendings()} />}
				/>
			}
			else if (this.state.tipus == "Pacient") {
				header = <Header
					style={{ width: '100%' }}
					placement="left"
					leftComponent={<Icon name='menu' onPress={() => this.obrirDrawer()} />}
					centerComponent={{ text: 'Doctors list', style: { color: '#fff' } }}
				/>
			}

			return (

				<View style={styles.container}>
					<StatusBar barStyle={"default"} />
					<View>
						{header}
					</View>
					{pending}
					<FlatList
						data={this.state.llistaData}
						renderItem={({ item }) =>
							<TouchableOpacity onPress={() => this.clickOnUser(item.uid)}>
								<ListItem containerStyle={{ backgroundColor: "#7BF0E6", borderBottomWidth: 1, borderBottomColor: 'white' }}
									title={item.nom}
								/>
							</TouchableOpacity>
						}
						ListHeaderComponent={<SearchBar
							placeholder="Type Here..."
							lightTheme
							round
							containerStyle={{ backgroundColor: '#7BF0E6' }}
							inputContainerStyle={{ backgroundColor: 'white' }}
							onChangeText={(itemValue) => this.setState({ search: itemValue })}
							value={this.state.search} />}
						ListFooterComponent={this.renderFooter}
						ItemSeparatorComponent={this.renderSeparator}

						keyExtractor={item => item.uid}
					/>

				</View>
			);
		//}
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