import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements'
import DateTimePicker from "react-native-modal-datetime-picker";


export default class HoraMigranya extends Component {

    constructor(props) {
        super(props);
        this.state = {
            horaInici: "",
            horaFinal: "",
            isDateTimePickerVisible: false,
            isDateTimePickerVisible2: false
        };
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = (date) => {
        //console.log("A date inicial has been picked: ", date);
        this.setState({ horaInici: date.getTime() })
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
        this.setState({ horaFinal: date.getTime() })
        this.hideDateTimePicker2();

    };


    static navigationOptions = {
        header: null
    }

    transformaData(time) {
        if (time && time!="Happening") {
            let data = new Date(time);
            var date = data.getDate(); //Current Date
            var month = data.getMonth() + 1; //Current Month
            var year = data.getFullYear() ; //Current Year
            var hour= data.getHours(); //Current Hours
            var min = data.getMinutes(); //Current Minutes
            var sec = data.getSeconds(); //Current Seconds
            if (min < 10) {
                min = '0' + min;
              }
              if (hour < 10) {
                hour = '0' + hour;
              }
            return date + '-' + month + '-' + year + ' ' + hour+ ':' + min
        }
        else if(time=="Happening") return time
        else return ""
    }

    next() {
        if (this.state.horaInici == "") Alert.alert("Select the start time")
        else if (this.state.horaFinal == "") Alert.alert("Select end time")
        else if (this.state.horaFinal <= this.state.horaInici) {
            Alert.alert("Error", "The end time must be after start time")

        }
        else this.props.navigation.navigate(
            "IntensitatDolor", {
            dataInici: this.state.horaInici,
            dataFinal: this.state.horaFinal
        })

        //console.log("dataInici:", this.state.horaInici)
        //console.log("datafinal:", this.state.horaFinal)
        //console.log("diferencia", this.state.horaFinal > new Date(this.state.horaInici))
    }
    render() {

        return (
            <View style={styles.container}>
                <Header
                    centerComponent={{ text: 'Attack time', style: { color: '#fff', fontSize: 20 } }}
                ></Header>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    mode='datetime'
                />

                <View style={{ flex: 4 }}>

                    <Text style={styles.textSeccio}>Start time: {this.transformaData(this.state.horaInici)}</Text>
                    <View style={styles.lateral}>
                        <TouchableOpacity style={styles.iconos} onPress={() => this.setState({ horaInici: new Date().getTime() - 60 * 60 * 1000 })}>
                            <Text style={styles.text}>1 hour ago</Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconos} onPress={() => this.setState({ horaInici: new Date().getTime() })}>
                            <Text style={styles.text}>Now</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconos} onPress={this.showDateTimePicker} >
                            <Text style={styles.text}>Other moment</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={{ flex: 4 }}>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible2}
                        onConfirm={this.handleDatePicked2}
                        onCancel={this.hideDateTimePicker2}
                        mode='datetime'
                    />
                    <Text style={styles.textSeccio}>End time: {this.transformaData(this.state.horaFinal)}</Text>
                    <View style={styles.lateral}>
                        <TouchableOpacity style={styles.iconos} onPress={() => this.setState({ horaFinal: "Happening" })}>
                            <Text style={{ fontSize: 20 }}>Happening</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconos} onPress={() => this.setState({ horaFinal: new Date().getTime() })}>
                            <Text style={styles.text}>Now </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconos} onPress={this.showDateTimePicker2}>
                            <Text style={styles.text}>Other moment</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        onPress={() => {
                            this.next()
                        }}
                        title="Next"
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
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        /*alignItems: 'center',*/
        backgroundColor: '#7BF0E6',
    },
    text: {
        fontSize: 25
    },
    lateral: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    iconos: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 105,
        height: 105,
        backgroundColor: '#38B3EF',
        borderRadius: 50,
    },
    textSeccio: {
        fontSize: 30
    },

});
