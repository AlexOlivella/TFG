import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen');
import firebase from 'firebase'
import * as FirebaseAPI from '../modules/firebaseAPI'
import { Header, Icon, SearchBar, List, ListItem, } from 'react-native-elements'

export default class HomeScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			llistaPacients: [],
			loading: false,
			search: "",

		};

	}

	static navigationOptions = {
		header: null
	}

	obrirDrawer = () => {
		this.props.navigation.openDrawer();
	}

	async getPacients() {
		var user = firebase.auth().currentUser;

		var result = await FirebaseAPI.getPacientsFromMetge(user.uid)
		console.log("resultat", result)
		this.setState({ llistaPacients: result })
	}



	componentDidMount() {
		this.getPacients()
	}
	renderHeader = () => {
		return <SearchBar
			placeholder="Type Here..."
			lightTheme
			round
			containerStyle={{ backgroundColor: '#7BF0E6' }}
			inputContainerStyle={{backgroundColor: 'white'}}
			onChangeText={(itemValue)=> this.setState({search: itemValue})}
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

	obteDades(user_uid){
		this.props.navigation.navigate("InfoPacient", {pacient: user_uid})
	}
	render() {
		////console.log(this.props)
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
						centerComponent={{ text: 'Pacient list', style: { color: '#fff' } }}
					/>
				</View>
				<FlatList
					data={this.state.llistaPacients}
					renderItem={({ item }) =>
					<TouchableOpacity onPress={()=> this.obteDades(item)}>
						<ListItem containerStyle={{backgroundColor: "#7BF0E6", borderBottomWidth:1, borderBottomColor: 'white'}}
							title={item}
						/>
						</TouchableOpacity>
					}
					ListHeaderComponent={this.renderHeader}
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