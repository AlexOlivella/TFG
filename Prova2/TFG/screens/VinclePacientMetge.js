import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ActivityIndicator, Alert,SafeAreaView, ScrollView } from 'react-native';
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen');
import firebase from 'firebase'
import * as FirebaseAPI from '../modules/firebaseAPI'
import { Header, Icon, SearchBar, List, ListItem, } from 'react-native-elements'

export default class VinclePacientMetge extends Component {

	constructor(props) {
		super(props);
		this.state = {
			llistaPacients: [],
			loading: false,
			search: '',

		};
		this.arrayHolder = [];

	}

	static navigationOptions = {
		header: null
	}

	obrirDrawer = () => {
		this.props.navigation.openDrawer();
	}
	async comprovaTipus() {
		var user = firebase.auth().currentUser;

		let resposta = await FirebaseAPI.comprovarTipusUsuari(user.uid)
		//console.log("resposta", resposta)
	}

	componentDidMount() {
		this.comprovaTipus()
		this.obteMetges();
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
	async obteMetges() {
		let result = await FirebaseAPI.getAllMetges();
		console.log("Metges", result)
		this.setState({ llistaPacients: result })
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
						centerComponent={{ text: 'Comunication', style: { color: '#fff' } }}
						rightComponent={{ icon: '' }}
					/>
				</View>
				<SafeAreaView style={{ flex: 1 }}>
					<ScrollView style={{ flex: 1 }}>
						<FlatList
							data={this.state.llistaPacients}
							renderItem={({ item }) =>
								<TouchableOpacity onPress={() => this.agregarDoctor(item.uid)}>
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