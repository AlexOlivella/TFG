import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Button } from 'react-native';
import { Dimensions, Image } from 'react-native'
const { width, height } = Dimensions.get('screen');
import firebase from 'firebase'
import * as FirebaseAPI from '../modules/firebaseAPI'
import { Header, Icon } from 'react-native-elements'
import { FloatingAction } from "react-native-floating-action";
//import CircleMenu from '@ramotion/react-native-circle-menu'
//import CircleButton from 'react-native-circle-button';
import CircleButton from 'react-native-circle-button';
import ActionButton from 'react-native-circular-action-menu';


export default class HomeScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
		};

	}


	obrirDrawer = () => {
		this.props.navigation.openDrawer();
	}


	createMigraine() {
		var user = firebase.auth().currentUser;

		this.props.navigation.navigate("HoraMigranya")
		//await FirebaseAPI.createMigranya(user.uid, this.getCurrentTime(), "estatAnim", "medicament", "zonaCos")
	}

	render() {
		//console.log(this.props)
		const { navigation } = this.props;
		var user = firebase.auth().currentUser;
		const actions = [
			{
				text: "Accessibility",
				//icon: require("./images/ic_accessibility_white.png"),
				name: "bt_accessibility",
				position: 2
			},
			{
				text: "Language",
				//icon: require("./images/ic_language_white.png"),
				name: "bt_language",
				position: 1
			},
			{
				text: "Location",
				//icon: require("./images/ic_room_white.png"),
				name: "bt_room",
				position: 3
			},
			{
				text: "Video",
				icon: require("./images/ullIcon.png"),
				name: "bt_videocam",
				position: 4
			}
		];


		items = [
			{
				name: 'md-home',
				color: '#298CFF'
			},
			{
				name: 'md-search',
				color: '#30A400'
			},
			{
				name: 'md-time',
				color: '#FF4B32'
			},
			{
				name: 'md-settings',
				color: '#8A39FF'
			},
			{
				name: 'md-navigate',
				color: '#FF6A00'
			}
		];
		onPress = index => console.warn(`${this.items[index].name} icon pressed!`);

		return (

			<View style={styles.container}>
				<StatusBar barStyle={"default"} />

				<View>
					<Header
						style={{ width: '100%' }}
						placement="left"
						leftComponent={<Icon name='menu' onPress={() => this.obrirDrawer()} />}
						centerComponent={{ text: 'Home', style: { color: '#fff' } }}
					/>
				</View>
				<View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ fontSize: 30 }}> Welcome to Mygraine </Text>
				</View>

				<CircleButton
					size={100}
					primaryColor="#41727E"
					secondaryColor="#459186"
					onPressButtonTop={() => alert('Top Button Clicked')}
					onPressButtonRight={() => alert('Right Button Clicked')}
					onPressButtonBottom={() => alert('Bottom Button Clicked')}
					onPressButtonLeft={() => alert('Left Button Clicked')}
				/>
				{/*<CircleButton size={45} />*/}

				{/*<CircleMenu
					bgColor="#E74C3C"
					items={this.items}
					onPress={this.onPress}
				/>*/}
				{/*<ActionButton buttonColor="rgba(231,76,60,1)" icon={<Image source={require('./images/ullIcon.png')}></Image>} onPress={() => console.log("main buton")}>
					<ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
						<Icon name="md-create" style={styles.actionButtonIcon} />
					</ActionButton.Item>
					<ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => { }}>
						<Icon name="md-notifications-off" style={styles.actionButtonIcon} />
					</ActionButton.Item>
					<ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => { }}>
						<Icon name="md-done-all" style={styles.actionButtonIcon} />
					</ActionButton.Item>
		</ActionButton>}
		{<ActionButton buttonColor="rgba(231,76,60,1)" position={'center'}  icon={<Image source={require('./images/ullIcon.png')}></Image>} onPress={() => console.log("main buton")}>
					<ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
						<Icon name="md-create" style={styles.actionButtonIcon} />
					</ActionButton.Item>
					<ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => { }}>
						<Icon name="md-notifications-off" style={styles.actionButtonIcon} />
					</ActionButton.Item>
					<ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => { }}>
						<Icon name="md-done-all" style={styles.actionButtonIcon} />
					</ActionButton.Item>
		</ActionButton>*/}

				<View style={{ flex: 2, justifyContent: 'center', paddingHorizontal: 10 }}>
					<Button onPress={() => { this.createMigraine() }} title="Register an attack"> </Button>
				</View>
				{/*<FloatingAction
					actions={actions}
					onPressItem={name => {
						console.log(`selected button: ${name}`);
					}}
					position='center'
					floatingIcon={<Image source={require('./ullIcon.png')}></Image>}
				/>*/}
				<ActionButton buttonColor="rgba(231,76,60,1)">
					<ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
						<Icon name="android-create" style={styles.actionButtonIcon} />
					</ActionButton.Item>
					<ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => { }}>
						<Icon name="android-notifications-none" style={styles.actionButtonIcon} />
					</ActionButton.Item>
					<ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => { }}>
						<Icon name="android-done-all" style={styles.actionButtonIcon} />
					</ActionButton.Item>
				</ActionButton>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,

		backgroundColor: '#fff',
	},

});