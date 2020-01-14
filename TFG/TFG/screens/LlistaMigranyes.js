import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, ScrollView, Image } from 'react-native';
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
            isLoaded: false,
            llistaMigranyesAux: "",


        };
        this.arrayHolder = [];
        this.daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        this.monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.colorsDots = [
            '#7cb1b9',
            '#96b897',
            '#b3bd74',
            '#d0c255',
            '#f2c93d',
            '#e7a93c',
            '#de8d3e',
            '#d6713b',
            '#d3573d',
            '#cf4140',
            '#B93B69',
            'black'
        ]
    }


    static navigationOptions = {
        title:"Patient migraine list",
        headerStyle: {
            backgroundColor: '#2089dc'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontSize:20,
        },
    }
    componentDidMount() {
        this.getMigranyes()
    }
    async getMigranyes() {
        var user = firebase.auth().currentUser
        var tipus = await FirebaseAPI.comprovarTipusUsuari(this.state.uid)
        let result = await FirebaseAPI.getLlistaMigranyes(this.state.uid, tipus)
        this.setState({
            llistaMigranyes: result,
            isLoaded: true,
            llistaMigranyesAux: result,
        },
            function () {
                this.arrayholder = result
            })
    }

    transformaData(time) {
        if (time) {
            time = parseInt(time)
            let data = new Date(time);
            const date = data.getDate(); //Current Date
            const month = (data.getMonth()); //Current Month
            const year = data.getFullYear(); //Current Year
            let hour = data.getHours(); //Current Hours
            let min = data.getMinutes(); //Current Minutes
            const day = data.getDay();

            if (min < 10) {
                min = '0' + min;
            }
            if (hour < 10) {
                hour = '0' + hour;
            }

            var terminologia
            const dia = this.daysArray[day]
            const mes = this.monthsArray[month]

            if (date == 1 || date == 21 || date == 31) terminologia = "st"
            else if (date == 2 || date == 22) terminologia = "nd"
            else if (date == 3 || date == 23) terminologia = "rd"
            else terminologia = "th"

            return dia + " " + date + terminologia + " of " + mes + ", " + year + " at " + hour + ':' + min
        }
        else return ""
    }

    obteDades(migranya_id) {
        this.props.navigation.navigate("InfoMigranya", { pacient: this.state.uid, migranya: migranya_id })
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
            llistaMigranyes: newData,
            search: text,
        });
    }
    render() {
        //console.log(this.props)
        const { navigation } = this.props;
        const uid_user = navigation.getParam('uid_user', 'NO-User');
        var user = firebase.auth().currentUser;
        if (!this.state.isLoaded) return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="black" /></View>)
        if (this.state.llistaMigranyesAux.length == 0) return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 30 }}>This patient didn't registered any migraine yet</Text>
                <Image source={require("./images/sadImage.png")} style={{ width: 50, height: 50 }}></Image>
            </View>)
        return (

            <View style={styles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }}>
                        <FlatList
                            data={this.state.llistaMigranyes}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    onPress={() => this.obteDades(item.data)}
                                >
                                    <ListItem containerStyle={{ backgroundColor: this.colorsDots[parseInt(item.intensitat)], /*borderBottomWidth: 1, borderBottomColor: 'white'*/ }}
                                        title={this.transformaData(item.data)}
                                    />
                                </TouchableOpacity>
                            }
                            keyExtractor={item => item.data}
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
        backgroundColor: '#fff',
    },
});