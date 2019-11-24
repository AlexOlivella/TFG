import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen');
import firebase from 'firebase'
import * as FirebaseAPI from '../modules/firebaseAPI'
import { Header, Icon, SearchBar, List, ListItem, } from 'react-native-elements'

export default class LlistaMigranyes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            llistaMigranyes: [],
            loading: false,
            search: '',
            pendings: "",
            uid: this.props.navigation.getParam("pacient"),


        };
        this.arrayHolder = [];

    }


    static navigationOptions = {
		headerStyle:{
            backgroundColor: '#2089dc'
        }
	}
    componentDidMount() {
        this.getMigranyes()
    }
    async getMigranyes() {
        let result = await FirebaseAPI.getLlistaMigranyes(this.state.uid)
        console.log("Migranyes", result)
        this.setState({ llistaMigranyes: result })
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

    transformaData(time) {
        if (time) {
            let data = new Date(time);
            var date = data.getDate(); //Current Date
            var month = data.getMonth() + 1; //Current Month
            var year = data.getFullYear(); //Current Year
            var hours = data.getHours(); //Current Hours
            var min = data.getMinutes(); //Current Minutes
            var sec = data.getSeconds(); //Current Seconds
            return date + '-' + month + '-' + year + ' ' + hours + ':' + min + ':' + sec
        }
        else return ""
    }

    obteDades(migranya_id) {
        this.props.navigation.navigate("InfoMigranya", { pacient: this.state.uid, migranya: migranya_id })
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
                    data={this.state.llistaMigranyes}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => this.obteDades(item)}>
                            <ListItem containerStyle={{ backgroundColor: "#7BF0E6", borderBottomWidth: 1, borderBottomColor: 'white' }}
                                title={item}
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