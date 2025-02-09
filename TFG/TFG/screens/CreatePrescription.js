import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, SafeAreaView, ScrollView, Button, Alert, ToastAndroid, ActivityIndicator } from 'react-native';
import * as FirebaseAPI from '../modules/firebaseAPI'
import firebase from 'firebase'
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from "react-native-modal-datetime-picker";
import { TextField } from 'react-native-material-textfield';

export default class CreatePrescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            llistaData: [],
            pacientName: '',
            pacient_uid: "",
            metge_firstName: "",
            metge_lastName: "",
            dateSelected: false,
            dateSelected2: false,
            isDateTimePickerVisible: false,
            isDateTimePickerVisible2: false,
            dataIni: "",
            dataFi: "",
            timesPerDay: "",
            timesPerDay2: "",
            interval: "",
            interval2: "",
            numberDoses: "",
            numberDoses2: "",
            medicine: "",
            medicine2: "",
            dose: "",
            unity: "",
            observations: "",
            refresh: this.props.navigation.state.params.refresh(),
            isLoading: false,
        }
        this.medicineArray = ["Aspirin", "Paracetamol", "Metamizol", "Sodic naproxen", "Ibuprofen", "Dexketoprofen trometamol ", "Almotriptan", "Zolmitriptan", "Eletriptan",
            "Rizatriptan", "Enantyum", "Sumatriptan", "Chlorpromazine", "Metoclopramide", "Propranolol", "Timolol"]
        this.unityArray = ["mg", "g", "ml"]
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
        this.getDadesUsuari()
    }
    async getDadesUsuari() {
        var user = firebase.auth().currentUser
        let result = await FirebaseAPI.readUserData(user.uid, "Doctor")
        //console.log(result)
        this.setState({
            metge_firstName: result.firstName,
            metge_lastName: result.lastName
        })
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

    };

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

    creaDropdownNumeros(inici, final, text) {
        let result = []
        for (i = inici; i <= final; i++) {
            result.push({ value: i + " " + text })
        }
        result = result.concat({ value: "Other" })
        // console.log("dropdown numeros", result)
        return result
    }

    creaDropdownArray(array, other) {
        let result = []
        for (i = 0; i < array.length; i++) {
            result.push({ value: array[i] })
        }
        if (other != "") result = result.concat({ value: other })
        return result
    }

    comprovaIntervalDates() {
        if (this.state.dataIni <= this.state.dataFi) return true
        return false
    }
    checkTextInputs() {
        if (this.state.pacientName != '') {
            if (this.state.dataIni != '') {
                if (this.state.dataFi != '') {
                    if (this.comprovaIntervalDates()) {
                        if (this.state.timesPerDay != '') {
                            if (this.state.interval != '') {
                                if (this.state.numberDoses != '') {
                                    if (this.state.medicine != '') {
                                        if (this.state.dose != '') {
                                            if (this.state.unity != '') {
                                                return true;
                                            } else {
                                                alert('Please select an unity');
                                            }
                                        } else {
                                            alert('Please enter a valid dose');
                                        }
                                    } else {
                                        alert('Please select a medicine');
                                    }
                                } else {
                                    alert('Please select the number of doses');
                                }
                            }
                            else {
                                alert("Please select an interval between doses")
                            }
                        } else {
                            alert('Please select the times to take the medication daily');
                        }
                    } else {
                        alert('The final date must be after initial date');
                    }
                } else {
                    alert('Please select a final date');
                }
            } else {
                alert('Please select an initial date');
            }
        } else {
            alert('Please select a patient');
        }
        return false;

    }
    addPrescription() {
        Alert.alert("Add prescription", "Do you want to add this prescription?",
            [
                { text: 'Cancel', onPress: () => { return null } },
                {
                    text: 'Confirm', onPress: async () => {
                        if (this.checkTextInputs()) {
                            this.setState({ isLoading: true })
                            var user = firebase.auth().currentUser
                            let error = await FirebaseAPI.addPrescription(user.uid, this.state.metge_firstName + " " + this.state.metge_lastName, this.state.pacient_uid,
                                this.state.pacientName, this.state.dataIni, this.state.dataFi, this.state.timesPerDay2 ? this.state.timesPerDay2 : this.state.timesPerDay,
                                this.state.interval2 ? this.state.interval2 : this.state.interval, this.state.numberDoses2 ? this.state.numberDoses2 : this.state.numberDoses,
                                this.state.medicine2 ? this.state.medicine2 : this.state.medicine, this.state.dose, this.state.unity, this.state.observations)
                            this.setState({ isLoading: false })

                            if (error) alert(error)
                            else {
                                ToastAndroid.show("Appointment succesfully added", ToastAndroid.SHORT)
                                this.props.navigation.state.params.refresh()
                                this.props.navigation.navigate("Prescriptions")
                            }
                        }
                    }
                },
            ],
            { cancelable: false })


    }
    render() {
        let loading
        if (this.state.isLoading) loading = <View><ActivityIndicator size="large" color="black"></ActivityIndicator></View>
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={{}}>
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
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible2}
                        onConfirm={this.handleDatePicked2}
                        onCancel={this.hideDateTimePicker2}
                        minimumDate={new Date()}
                        mode='date'
                    />
                    <View style={{ paddingTop: 72 }}>
                        <TouchableOpacity onPress={this.showDateTimePicker} >
                            {!this.state.dateSelected && <Text style={{ fontSize: 16, color: '#B9ACAC', borderBottomColor: '#D3D0D0', borderBottomWidth: 1 }}>Select initial date</Text>}

                            {this.state.dateSelected && <View>
                                <Text style={{ fontSize: 12, color: '#0091EA' }}>Select initial date</Text>
                                <Text style={{ fontSize: 16, borderBottomColor: '#D3D0D0', borderBottomWidth: 1, }}>{this.transformaData(this.state.dataIni)}</Text>
                            </View>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingTop: 72 }}>
                        <TouchableOpacity onPress={this.showDateTimePicker2} >
                            {!this.state.dateSelected2 && <Text style={{ fontSize: 16, color: '#B9ACAC', borderBottomColor: '#D3D0D0', borderBottomWidth: 1 }}>Select final date</Text>}

                            {this.state.dateSelected2 && <View>
                                <Text style={{ fontSize: 12, color: '#0091EA' }}>Select final date</Text>
                                <Text style={{ fontSize: 16, borderBottomColor: '#D3D0D0', borderBottomWidth: 1, }}>{this.transformaData(this.state.dataFi)}</Text>
                            </View>}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.apartat}>
                        <Dropdown
                            label='Select the times to take the medication daily'
                            data={this.creaDropdownNumeros(1, 10, "times")}
                            value={this.state.timesPerDay}
                            onChangeText={(itemValue) => {
                                this.setState({ timesPerDay: itemValue });
                                //console.log("itemValue", itemValue,/* "itemIndex", itemIndex, "itemData", itemData,*/"itemData[itemIndex].uid", itemData[itemIndex].uid)
                            }}
                        />
                    </View>
                    {this.state.timesPerDay == "Other" ?
                        <View style={styles.apartat}>
                            <TextField
                                label="Specify the times to take the medication daily"
                                keyboardType="number-pad"
                                onChangeText={(text) => this.setState({ timesPerDay2: text })}
                            >

                            </TextField>
                        </View> : <View></View>}

                    <View style={styles.apartat}>
                        <Dropdown
                            label='Select the minimum interval between doses'
                            data={this.creaDropdownNumeros(1, 24, "hours")}
                            value={this.state.interval}
                            onChangeText={(itemValue) => {
                                this.setState({ interval: itemValue });
                                //console.log("itemValue", itemValue,/* "itemIndex", itemIndex, "itemData", itemData,*/"itemData[itemIndex].uid", itemData[itemIndex].uid)
                            }}
                        />
                    </View>
                    {this.state.interval == "Other" ?
                        <View style={styles.apartat}>
                            <TextField
                                label="Specify the minimum interval between doses"
                                keyboardType="number-pad"
                                onChangeText={(text) => this.setState({ interval2: text })}
                            >
                            </TextField>
                        </View> : <View></View>}

                    <View style={styles.apartat}>
                        <Dropdown
                            label='Select the number of doses at the time'
                            data={this.creaDropdownNumeros(1, 5, "doses")}
                            value={this.state.numberDoses}
                            onChangeText={(itemValue) => {
                                this.setState({ numberDoses: itemValue });
                                //console.log("itemValue", itemValue,/* "itemIndex", itemIndex, "itemData", itemData,*/"itemData[itemIndex].uid", itemData[itemIndex].uid)
                            }}
                        />
                    </View>
                    {this.state.numberDoses == "Other" ?
                        <View style={styles.apartat}>
                            <TextField
                                label="Specify the number of doses at the time"
                                keyboardType="number-pad"
                                onChangeText={(text) => this.setState({ numberDoses2: text })}
                            >
                            </TextField>
                        </View> : <View></View>}

                    <View style={styles.apartat}>
                        <Dropdown
                            label='Select the medicine'
                            data={this.creaDropdownArray(this.medicineArray, "Other")}
                            value={this.state.medicine}
                            onChangeText={(itemValue) => {
                                this.setState({ medicine: itemValue });
                                //console.log("itemValue", itemValue,/* "itemIndex", itemIndex, "itemData", itemData,*/"itemData[itemIndex].uid", itemData[itemIndex].uid)
                            }}
                        />
                    </View>
                    {this.state.medicine == "Other" ?
                        <View style={styles.apartat}>
                            <TextField
                                label="Specify the medicine"
                                onChangeText={(text) => this.setState({ medicine2: text })}
                            >
                            </TextField>
                        </View> : <View></View>}

                    <View style={{ flexDirection: "row", paddingTop: 40 }}>
                        <View style={{ width: "50%", paddingRight: 10 }}>
                            <TextField
                                label="Specify the dose"
                                keyboardType="numeric"
                                onChangeText={(text) => this.setState({ dose: text })}
                            >
                            </TextField>
                        </View>
                        <View style={{ width: "50%" }}>
                            <Dropdown
                                label='Select unity'
                                data={this.creaDropdownArray(this.unityArray, "")}
                                value={this.state.unity}
                                dropdownOffset={{ top: 34, left: 0 }}
                                onChangeText={(itemValue) => {
                                    this.setState({ unity: itemValue });
                                    //console.log("itemValue", itemValue,/* "itemIndex", itemIndex, "itemData", itemData,*/"itemData[itemIndex].uid", itemData[itemIndex].uid)
                                }}
                            />
                        </View>

                    </View>
                    <View style={styles.apartat}>
                        <TextField
                            label="Observations"
                            multiline={true}
                            onChangeText={(text) => this.setState({ observations: text })}
                        >
                        </TextField>
                    </View>
                    {loading}
                    <View style={[styles.apartat, { paddingBottom: 10 }]}>
                        <Button title="Add prescription" onPress={() => this.addPrescription()}></Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    apartat: {
        paddingTop: 40
    }
});
