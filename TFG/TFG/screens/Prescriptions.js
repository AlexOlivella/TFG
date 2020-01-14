import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image } from 'react-native';
import { Header, Icon } from 'react-native-elements'
import * as FirebaseAPI from '../modules/firebaseAPI'
import firebase from 'firebase'

export default class Prescriptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            llistaPrescriptions: "",
            isLoading: true,
            tipusUser: "",

        }
    }

    static navigationOptions = {
        header: null
    }

    obrirDrawer = () => {
        this.props.navigation.openDrawer();
    }

    componentDidMount() {
        this.getDades()
    }
    async getDades() {
        var user = firebase.auth().currentUser
        let tipus = await FirebaseAPI.comprovarTipusUsuari(user.uid)
        this.setState({ tipusUser: tipus, isLoading: false, })
    }
    createPrescription() {
        this.props.navigation.navigate("CreatePrescription")
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

            if (this.state.llistaPrescriptions == 0) {
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
            if (this.state.llistaPrescriptions == 0) return (
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
