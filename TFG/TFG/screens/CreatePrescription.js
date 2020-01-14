import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import * as FirebaseAPI from '../modules/firebaseAPI'
import firebase from 'firebase'
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from "react-native-modal-datetime-picker";

export default class CreatePrescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            llistaData: [],
            pacientName: '',
            pacient_uid: "",
            dateSelected: false,
            //dateSelected2: false,
            isDateTimePickerVisible: false,
           // isDateTimePickerVisible2: false,
            dataIni: "",
            dataFi: "",
        }
        this.daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        this.monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }

    static navigationOptions = {
        title: "Create prescription",
        headerStyle: {
            backgroundColor: '#2089dc'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontSize: 20,
        },
    }
    componentDidMount() {
        this.getPacients()
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = (date) => {
        //console.log("A date inicial has been picked: ", date);
        this.setState({ dataIni: date.getTime(), dateSelected: true })
        this.hideDateTimePicker();

    };
    /*
    showDateTimePicker2 = () => {
        this.setState({ isDateTimePickerVisible2: true });
    };

    hideDateTimePicker2 = () => {
        this.setState({ isDateTimePickerVisible2: false });
    };

    handleDatePicked2 = (date) => {
        // //console.log("A date final has been picked: ", date);
        this.setState({ dataFi: date.getTime(), dateSelected2: true })
        this.hideDateTimePicker2();

    };*/

    creaDropdown(llista) {
        result = []
        let dades = llista.map(pacient => { return { uid: pacient.uid, value: pacient.nom } })
        result = [].concat(dades)
        return result
    }

    async getPacients() {
        var user = firebase.auth().currentUser
        var pacients = await FirebaseAPI.getPacientsFromMetge(user.uid)
        //console.log("pacients", pacients)
        var result = this.creaDropdown(pacients)
        this.setState({
            llistaData: result
        })
        //console.log("result", result)
    }

    transformaData(time) {
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
    render() {

        return (
            <View style={styles.container}>
                <View>
                    <Dropdown
                        label='Select patient'
                        data={this.state.llistaData}
                        value={this.state.pacientName}
                        onChangeText={(itemValue, itemIndex, itemData) => {
                            this.setState({ pacientName: itemValue, pacient_uid: itemData[itemIndex].uid });
                            //console.log("itemValue", itemValue,/* "itemIndex", itemIndex, "itemData", itemData,*/"itemData[itemIndex].uid", itemData[itemIndex].uid)
                        }}
                    />
                </View>
                <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                        minimumDate={new Date()}
                        mode='date'
                    />
                {/*<DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible2}
                    onConfirm={this.handleDatePicked2}
                    onCancel={this.hideDateTimePicker2}
                    mode='date'
                />*/}
                <View >
                        <TouchableOpacity onPress={this.showDateTimePicker} >
                            {!this.state.dateSelected && <Text style={{ fontSize: 16, color: '#808080', borderBottomColor: '#808080', borderBottomWidth: 1 }}>Select initial date</Text>}

                            {this.state.dateSelected && <View>
                                <Text style={{ fontSize: 12, color: '#0091EA' }}>Select initial date</Text>
                                <Text style={{ fontSize: 16, borderBottomColor: '#B4A9A9', borderBottomWidth: 1, }}>{this.transformaData(this.state.dataIni)}</Text>
                            </View>}
                        </TouchableOpacity>
                    </View>
                {/*<View>
                    <TouchableOpacity onPress={this.showDateTimePicker2} >
                        {!this.state.dateSelected && <Text style={{ fontSize: 16, color: '#B9ACAC', borderBottomColor: '#D3D0D0', borderBottomWidth: 1 }}>Select final date</Text>}

                        {this.state.dateSelected && <View>
                            <Text style={{ fontSize: 12, color: '#0091EA' }}>Select final date</Text>
                            <Text style={{ fontSize: 16, borderBottomColor: '#D3D0D0', borderBottomWidth: 1, }}>{this.transformaData(this.state.dataFi)}</Text>
                        </View>}
                    </TouchableOpacity>
                </View>*/}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10
    }
});
