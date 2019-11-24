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
            refresh:"",
        		};
	}

    static navigationOptions = {
		headerStyle:{
            backgroundColor: '#2089dc'
        }
	}

	async getPendings() {
		var user = firebase.auth().currentUser;

		var result = await FirebaseAPI.getPendingsFromMetge(user.uid)
		console.log("resultat", result)
		this.setState({ llistaPendings: result })
	}
	
	componentDidMount() {
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
	
	
    agregaPacient(uid_pacient){
        var user = firebase.auth().currentUser
        Alert.alert("Add pacient", "Do you want to add this pacient?",
         [
            { text: 'Cancel', onPress: () => { return null } },
            {
                text: 'Confirm', onPress: () => {
                    FirebaseAPI.addPacient(user.uid, uid_pacient)
                    this.setState({refresh: "hola"})
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