import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image, ListView ,FlatList, TouchableOpacity, } from 'react-native';
import { Header, Icon,SearchBar, List, ListItem,  } from 'react-native-elements'
import * as FirebaseAPI from '../modules/firebaseAPI'
import firebase from 'firebase'
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

export default class Prescriptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            llistaPrescriptions: "",
            isLoading: true,
            tipusUser: "",
            search: '',
            llistaPrescriptionsAux:"",

        }
        this.arrayHolder = [];
        this.daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        this.monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }

    static navigationOptions = {
        header: null
    }
    componentDidMount() {
        this.getDadesUser()
        //this.getPrescriptions()
    }

    obrirDrawer = () => {
        this.props.navigation.openDrawer();
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
            const itemData = item.medicine ? item.medicine.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });

        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            llistaPrescriptions: newData,
            search: text,
        });
    }
    async getDadesUser() {
        var user = firebase.auth().currentUser
        let tipus = await FirebaseAPI.comprovarTipusUsuari(user.uid)
        this.setState({ tipusUser: tipus, })
        this.getPrescriptions()
    }
    async getPrescriptions() {
        let user = firebase.auth().currentUser
       // console.log(this.state.tipusUser)
        let result = await FirebaseAPI.getLlistaPrescriptions(user.uid, this.state.tipusUser)
        //console.log("llsita prescriptions", result)
        this.setState({
            llistaPrescriptions:result,
            isLoading: false, 
            llistaPrescriptionsAux: result,

        }, function () {
            this.arrayholder = result
        })
    }
    refresh() {
        this.getDadesUser()
    }
    
    createPrescription() {
        this.props.navigation.navigate("CreatePrescription", { refresh: () => this.refresh() })
    }

    transformaDataEndIni(time) {
        if (time) {
            time = parseInt(time)
            let data = new Date(time);
            const date = data.getDate(); //Current Date
            const month = (data.getMonth()); //Current Month
            const year = data.getFullYear(); //Current Year
            var day = data.getDay();

            //console.log(month)

            var terminologia
            const dia = this.daysArray[day]
            const mes = this.monthsArray[month]

            if (date == 1 || date == 21 || date == 31) terminologia = "st"
            else if (date == 2 || date == 22) terminologia = "nd"
            else if (date == 3 || date == 23) terminologia = "rd"
            else terminologia = "th"

            return dia + " " + date + terminologia + " of " + mes + ", " + year
        }
        else return ""

    }
    obteInfo(recepta){
        //console.log("recepta", recepta)
        this.props.navigation.navigate("PrescriptionDetails", {recepta_uid: recepta, refresh:()=>this.refresh()})
    }
    render() {
        if (this.state.isLoading) return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="black"></ActivityIndicator></View>)
        if (this.state.tipusUser == "Doctor") {
            let header = <Header
                style={{ width: '100%' }}
                placement="left"
                leftComponent={<Icon name='menu' color="#fff" onPress={() => this.obrirDrawer()} />}
                centerComponent={{ text: 'Prescriptions', style: { color: '#fff', fontSize: 20 } }}
                rightComponent={<Icon name='add' color="#fff" onPress={() => this.createPrescription()}></Icon>}
            />

            if (this.state.llistaPrescriptionsAux == 0) {
                return (<View style={styles.container}>
                    {header}
                    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 30 }}>You didn't add any patient prescription yet</Text>
                        <Text style={{ fontSize: 30 }}>Try to add one clicking</Text>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ fontSize: 30 }}>this icon--></Text>
                            <Icon name='add' size={50} onPress={() => this.createPrescription()}></Icon>
                        </View>
                    </View>
                </View>)
            }
            else return (
                <View style={styles.container}>
                    {header}
                    <SafeAreaView style={styles.container}>
                        <ScrollView>
                            <SearchBar
                                round
                                searchIcon={{ size: 24 }}
                                onChangeText={text => this.SearchFilterFunction(text)}
                                onClear={text => this.SearchFilterFunction('')}
                                placeholder="Search by medicine..."
                                value={this.state.search}
                                lightTheme
                                containerStyle={{ backgroundColor: '#2089dc' }}
                                inputContainerStyle={{ backgroundColor: 'white' }}
                            />
                            <FlatList
                                data={this.state.llistaPrescriptions}
                                renderItem={({ item }) =>
                                    <TouchableOpacity onPress={() => this.obteInfo(item.uid)}>
                                        <ListItem containerStyle={{ backgroundColor: "#fff", borderBottomWidth: 1, borderColor: '#2089dc' }}
                                            title={this.transformaDataEndIni(item.dIni) + ", " + item.medicine}
                                        />
                                    </TouchableOpacity>
                                }
                                keyExtractor={item => item.uid}
                            />
                        </ScrollView>
                    </SafeAreaView>
                </View>
            );
        }
        else if (this.state.tipusUser == "Pacient") {
            let header = <Header
                style={{ width: '100%' }}
                placement="left"
                leftComponent={<Icon name='menu' color="#fff" onPress={() => this.obrirDrawer()} />}
                centerComponent={{ text: 'Prescriptions', style: { color: '#fff', fontSize: 20 } }}
            />
            if (this.state.llistaPrescriptionsAux == 0) return (
                <View style={styles.container}>
                    {header}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 30 }}>You don't have any prescription in your list, tell one of your doctors to add one</Text>
                        <Image source={require("./images/smile.jpeg")} style={{ width: 50, height: 50 }}></Image>
                    </View>
                </View>
            )
            else return (
                <View style={styles.container}>
                    {header}
                    <SafeAreaView style={styles.container}>
                        <ScrollView>
                        <SearchBar
                                round
                                searchIcon={{ size: 24 }}
                                onChangeText={text => this.SearchFilterFunction(text)}
                                onClear={text => this.SearchFilterFunction('')}
                                placeholder="Search by medicine..."
                                value={this.state.search}
                                lightTheme
                                containerStyle={{ backgroundColor: '#2089dc' }}
                                inputContainerStyle={{ backgroundColor: 'white' }}
                            />
                            <FlatList
                                data={this.state.llistaPrescriptions}
                                renderItem={({ item }) =>
                                    <TouchableOpacity onPress={() => this.obteInfo(item.uid)}>
                                        <ListItem containerStyle={{ backgroundColor: "#fff", borderBottomWidth: 1, borderColor: '#2089dc' }}
                                            title={this.transformaDataEndIni(item.dIni) + ", " + item.medicine}
                                        />
                                    </TouchableOpacity>
                                }
                                keyExtractor={item => item.uid}
                            />
                        </ScrollView>
                    </SafeAreaView>
                </View>
            );
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
