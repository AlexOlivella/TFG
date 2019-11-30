import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
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
		};
	}

	static navigationOptions = {
		headerStyle: {
			backgroundColor: '#2089dc'
		}
	}

	async getPendings() {
		var user = firebase.auth().currentUser;
		var result = await FirebaseAPI.getPendingsFromMetge(user.uid)
		//console.log("resultat", result)
		this.setState({ llistaPendings: result, isLoaded:true })
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
	componentDidMount() {
		this.getDataUser();

		this.getPendings()
		
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


	agregaPacient(uid_pacient) {
		var user = firebase.auth().currentUser
		Alert.alert("Add pacient", "Do you want to add this pacient?",
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

	render() {
		//console.log(this.props)
		const { navigation } = this.props;
		const uid_user = navigation.getParam('uid_user', 'NO-User');
		var user = firebase.auth().currentUser;
		if (!this.state.isLoaded) return (<View style={[styles.container, {justifyContent: 'center'}]}><ActivityIndicator  size="large" /></View>)
		if(this.state.llistaPendings.length==0) return (<View style={[styles.container, {justifyContent: 'center'}]}><Text>No such document!</Text></View>)
		return (

			<View style={styles.container}>
				<StatusBar barStyle={"default"} />
				<FlatList
					data={this.state.llistaPendings}
					renderItem={({ item }) =>
						<TouchableOpacity onPress={() => this.agregaPacient(item.uid)}>
							<ListItem containerStyle={{ backgroundColor: "#7BF0E6", borderBottomWidth: 1, borderBottomColor: 'white' }}
								title={item.nom}
							/>
						</TouchableOpacity>
					}

					ListFooterComponent={this.renderFooter}
					ItemSeparatorComponent={this.renderSeparator}

					keyExtractor={item => item}
				/>

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