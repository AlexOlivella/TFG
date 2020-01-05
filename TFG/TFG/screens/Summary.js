import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import * as FirebaseAPI from '../modules/firebaseAPI'
import firebase from 'firebase'
import { Header } from 'react-native-elements';


export default class Summary extends Component {

    constructor(props) {
        super(props);
        //console.log(this.props)
        //console.log(user_email.email_user)
        this.state = {
            isLoaded: true,

        }

    };
    static navigationOptions = {
        header: null
    }

    async next() {
        this.setState({isLoaded:false})
        var { navigation } = this.props;
        var dataInici = navigation.getParam('dataInici');
        var dataFinal = navigation.getParam('dataFinal');
        var intensitatDolor = navigation.getParam('intensitatDolor')
        var zonaCap = navigation.getParam('zonaCap')
        var simptomes = navigation.getParam('simptomes')
        var causes = navigation.getParam('causes')
        var menstruacio = navigation.getParam('menstruacio')
        var exercicis = navigation.getParam('exercicis')
        var impediments = navigation.getParam('impediments')
        var medicaments = navigation.getParam('medicaments')
        var user = firebase.auth().currentUser;
        var tipus = await FirebaseAPI.comprovarTipusUsuari(user.uid)
        await FirebaseAPI.createMigranya(
            user.uid,
            dataInici,
            dataFinal,
            intensitatDolor,
            zonaCap,
            simptomes,
            causes,
            menstruacio,
            exercicis,
            impediments,
            medicaments,
            tipus,
        )
        this.setState({ isLoaded: true })
        this.props.navigation.navigate(
            "Home"
        )
        ToastAndroid.show("Migraine added succesfully", ToastAndroid.SHORT)

        //console.log("summary")
    }
    render() {
        var { navigation } = this.props;
        var dataInici = navigation.getParam('dataInici');
        var dataFinal = navigation.getParam('dataFinal')
        var intensitatDolor = navigation.getParam('intensitatDolor')
        var zonaCap = navigation.getParam('zonaCap')
        var simptomes = navigation.getParam('simptomes')
        var causes = navigation.getParam('causes')
        var menstruacio = navigation.getParam('menstruacio')
        var exercicis = navigation.getParam('exercicis')
        var impediments = navigation.getParam('impediments')
        var medicaments = navigation.getParam('medicaments')

        var loading
        if (!this.state.isLoaded) loading = <View>
            <ActivityIndicator size="large" color="black"></ActivityIndicator>
        </View>
        return (
            <View style={styles.container}>
                <Header
                    centerComponent={{ text: 'Summary', style: { color: '#fff' } }}>

                </Header>
                <View>
                    <Text> {dataInici}</Text>
                    <Text> {dataFinal}</Text>
                    <Text> {intensitatDolor}</Text>
                    <Text> {zonaCap}</Text>
                    <Text> {simptomes}</Text>
                    <Text> {causes}</Text>
                    <Text> {impediments}</Text>
                    <Text> {exercicis}</Text>
                    <Text> {menstruacio}</Text>
                    <Text> {medicaments}</Text>
                </View>
                {loading}
                <View style={{ flex: 1 }}>
                    <Button
                        onPress={() => {
                            Alert.alert(
                                'Confirm',
                                'Do you want to confirm this data?',
                                [
                                    { text: 'Cancel', onPress: () => { return null } },
                                    {
                                        text: 'Confirm', onPress: () => {
                                            this.next()
                                        }
                                    },
                                ],
                                { cancelable: false }
                            )
                        }}
                        title="Confirm"
                    >

                    </Button>
                    <Button
                        onPress={() => {
                            Alert.alert(
                                'Cancel',
                                'Do you want to cancel this process?',
                                [
                                    { text: 'Cancel', onPress: () => { return null } },
                                    {
                                        text: 'Confirm', onPress: () => {
                                            this.props.navigation.navigate("Home")
                                        }
                                    },
                                ],
                                { cancelable: false }
                            )
                        }}
                        title="Cancel"
                    >
                    </Button>
                </View>

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
    }
});
