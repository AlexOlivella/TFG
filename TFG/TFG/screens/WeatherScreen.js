import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import Weather from '../components/Weather'
import { API_KEY } from '../src/utils';
import { ActivityIndicator } from 'react-native-paper';
import { Header, Icon } from 'react-native-elements'

export default class WeatherScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			temperature: 0,
			weatherCondition: null,
			error: null,
			currentTime: null,
			currentDay: null
		};
		this.daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	}

	componentWillMount() {
		this.getCurrentTime();
	}

	getCurrentTime = () => {
		let hour = new Date().getHours();
		let minutes = new Date().getMinutes();
		let day = new Date().getDay();
		if (minutes < 10) {
			minutes = '0' + minutes;
		}
		const dia = this.daysArray[day]
		this.setState({ currentDay: dia, currentTime: hour + ':' + minutes });
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	componentDidMount() {
		this.timer = setInterval(() => {
			this.getCurrentTime();
		}, 1000);
	}
	getCurrentPosition() {
		navigator.geolocation.getCurrentPosition(
			position => {
				this.fetchWeather(position.coords.latitude, position.coords.longitude);
				//console.log(position)
			},
			error => {
				this.setState({
					error: 'Error Gettig Weather Condtions'
				});
			}
		);
	}
	componentDidMount() {
		this.getCurrentPosition()
		this.timer = setInterval(() => {
			this.getCurrentTime();
		}, 1000);
	}

	fetchWeather(lat, lon) {
		fetch(
			`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
		)
			.then(res => res.json())
			.then(json => {
				//console.log(json);
				this.setState({
					temperature: json.main.temp,
					weatherCondition: json.weather[0].main,
					isLoading: false
				});
			});
	}
	obrirDrawer = () => {
		this.props.navigation.openDrawer();
	}
	render() {
		return (
			<View style={styles.container}>
				<Header
					style={{ width: '100%' }}
					placement="left"
					leftComponent={<Icon name='menu' onPress={() => this.obrirDrawer()} />}
					centerComponent={{ text: 'Weather', style: { color: '#fff' } }}
				/>
				{this.state.isLoading ? <ActivityIndicator size="large" /> : <Weather
					weather={this.state.weatherCondition}
					temperature={this.state.temperature}
					day={this.state.currentDay}
					date={this.state.currentTime}
				/>
				}

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	timeText: {
		fontSize: 50,
		color: '#f44336'
	},
	daysText: {
		color: '#2196f3',
		fontSize: 25,
		paddingBottom: 0
	}
});