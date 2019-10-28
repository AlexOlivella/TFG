import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, DrawerLayoutAndroid, TouchableHightlight, ToolbarAndroid, Button } from 'react-native';
import HamburgerMenu from '../components/HamburgerMenu'
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen');
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase'
export default class prova extends Component {

	constructor(props) {
		super(props);
		this.state = {
			active: false,
		};

	}

	static navigationOptions = {
		title: 'HeaderTitle',
		headerStyle: {
			backgroundColor: '#f4511e',
		},
		headerTintColor: '#0ff',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	}

	onPress = () => {
		this.drawer.openDrawer();

	}

	render() {
		////console.log(this.props)
		const { navigation } = this.props;
		const uid_user = navigation.getParam('uid_user', 'NO-User');
        var user = firebase.auth().currentUser;

		return (
			<View style={styles.container}>
				<Text style={{ fontSize: 30 }}> Hey {user.email}</Text>

			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#7BF0E6',
	},
	seccioBotons: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#7BF0E6',

	},
	toolbar: {
		height: 56,
		backgroundColor: '#FBEAFF'
	},
	seccioBotons: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#FBEAFF',

	},
});
/*
import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import { DrawerItems } from 'react-navigation';
import { Ionicons as Icon } from '@expo/vector-icons';

import { evaluateOuterDrawerListItems } from '../src/utils';
import OuterDrawerItem from '../components/OuterDrawerItem';
import DrawerHeader from '../components/DrawerHeader';

const styles = StyleSheet.create({
	customDrawerTouch: {
		paddingLeft: 13,
		paddingTop: 15,
	},
	customDrawerIcon: { paddingRight: 10 },
	backButtonRow: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: 17,
		paddingLeft: 3,
		borderBottomColor: '#F0F0F0',
		borderBottomWidth: 1,
	},
});

export default class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mainDrawer: true,
			currentComponent: '',
		};
	}

	toggleMainDrawer = () =>
		this.setState(prevState => ({ mainDrawer: !prevState.mainDrawer }));

	renderMainDrawerComponents = mainDrawerItems =>
		Object.keys(mainDrawerItems).map(item => (
			<OuterDrawerItem
				key={item}
				label={item}
				onPress={() => {
					this.setState({
						currentComponent: item,
						mainDrawer: false,
					});
				}}
			/>
		));

	navigateToCallback = routeName => {
		this.setState({ mainDrawer: true });
		this.props.navigation.navigate(routeName);
	};

	render() {
		const { items, ...restProps } = this.props;
		const { mainDrawer, currentComponent } = this.state;

		// get items objects with unique items and indexes
		const scopedItemsObject = evaluateOuterDrawerListItems(items);

		if (mainDrawer) {
			return (
				<ScrollView>
					<DrawerHeader navigateToCallback={this.navigateToCallback} />
					{this.renderMainDrawerComponents(scopedItemsObject)}
				</ScrollView>
			);
		}

		const index = scopedItemsObject[currentComponent];

		const scopedItemsArr = items.slice(index.start, index.end);

		return (
			<ScrollView>
				<DrawerHeader navigateToCallback={this.navigateToCallback} />
				<TouchableOpacity
					onPress={this.toggleMainDrawer}
					style={styles.customDrawerTouch}
				>
					<View style={styles.backButtonRow}>
						<Icon
							name="ios-arrow-back"
							size={25}
							style={styles.customDrawerIcon}
							color="#666666"
						/>
						<Text style={{ color: '#666666' }}>Back to Components</Text>
					</View>
				</TouchableOpacity>
			</ScrollView>
		);
	}
}
*/