
import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, ScrollView, Alert, ToastAndroid } from 'react-native';
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen');
import firebase from 'firebase'
import * as FirebaseAPI from '../modules/firebaseAPI'
import { Header, Icon, SearchBar, List, ListItem, } from 'react-native-elements'

export default class MigranyesPropies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            llistaMigranyes: [],
            loading: false,
            search: '',
            pendings: "",

            isLoaded: false


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
        header: null
    }
    componentDidMount() {
        this.getMigranyes()
    }
    async getMigranyes() {
        var user = firebase.auth().currentUser
        var tipus = await FirebaseAPI.comprovarTipusUsuari(user.uid)
        let result = await FirebaseAPI.getLlistaMigranyes(user.uid, tipus)
        //console.log("Migranyes", result)
        this.setState({ llistaMigranyes: result, isLoaded: true })
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
        var user = firebase.auth().currentUser
        this.props.navigation.navigate("InfoMigranyesPropies", { pacient: user.uid, migranya: migranya_id })
    }
    obrirDrawer = () => {
        this.props.navigation.openDrawer();
    }

    createMigraine() {
        var user = firebase.auth().currentUser;

        this.props.navigation.navigate("HoraMigranya")
        //await FirebaseAPI.createMigranya(user.uid, this.getCurrentTime(), "estatAnim", "medicament", "zonaCos")
    }

    async deleteMigranya(migranya_id) {
        var user = firebase.auth().currentUser
        var tipus = await FirebaseAPI.comprovarTipusUsuari(user.uid)
        //console.log("delete migranya", user.uid, migranya_id, tipus)
        Alert.alert(
            "Delete migraine",
            "Do you want to delete this migraine?",
            [
                { text: 'Cancel', onPress: () => { return null } },
                {
                    text: 'Confirm', onPress: async () => {
                        await FirebaseAPI.deleteMigranya(user.uid, migranya_id, tipus)
                        ToastAndroid.show("Migraine succesfully deleted", ToastAndroid.SHORT)
                        this.getMigranyes()

                    }
                },
            ],
            { cancelable: false }
        )
    }
    render() {
        //console.log(this.props)
        const { navigation } = this.props;
        const uid_user = navigation.getParam('uid_user', 'NO-User');
        var user = firebase.auth().currentUser;
        if (!this.state.isLoaded) return (<View style={[styles.container, { justifyContent: 'center' }]}><ActivityIndicator size="large" /></View>)
        if (this.state.llistaMigranyes.length == 0)
            return (
                <View style={[styles.container,]}>
                    <Header
                        style={{ width: '100%' }}
                        placement="left"
                        leftComponent={<Icon name='menu' onPress={() => this.obrirDrawer()} />}
                        centerComponent={{ text: 'Migraines', style: { color: '#fff', fontSize:20 } }}
                        rightComponent={
                            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                {/*<Icon name="edit" onPress={() => alert("dit")} />*/}
                                <Icon name='add' onPress={() => this.createMigraine()} />
                            </View>}
                    />
                    <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 10, }}>
                        <View></View>
                        <Text style={{ fontSize: 30 }}>You didn't register any attack yet, try to add one!</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 25 }}>Click here! ---></Text>
                            <Icon size={40} name='add' onPress={() => this.createMigraine()} />
                        </View>
                        <View></View>
                    </View>
                </View>)
        return (

            <View style={styles.container}>
                <Header
                    style={{ width: '100%' }}
                    placement="left"
                    leftComponent={<Icon name='menu' onPress={() => this.obrirDrawer()} />}
                    centerComponent={{ text: 'Migraines', style: { color: '#fff',fontSize:20  } }}
                    rightComponent={
                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                            <Icon name='add' onPress={() => this.createMigraine()} />
                        </View>}
                />
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }}>
                        <FlatList
                            data={this.state.llistaMigranyes}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    onPress={() => this.obteDades(item.data)}
                                    onLongPress={() => this.deleteMigranya(item.data)}
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