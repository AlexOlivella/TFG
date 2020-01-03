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
        if (time && time != "Happening") {
            let data = new Date(time);
            var date = data.getDate(); //Current Date
            var month = data.getMonth() + 1; //Current Month
            var year = data.getFullYear(); //Current Year
            var hour = data.getHours(); //Current Hours
            var min = data.getMinutes(); //Current Minutes
            var sec = data.getSeconds(); //Current Seconds
            if (min < 10) {
                min = '0' + min;
            }
            if (hour < 10) {
                hour = '0' + hour;
            }
            if(date < 10){
                date = '0' + date;
            }
            if(month < 10){
                month = '0' + month;
            }
            return date + '-' + month + '-' + year + ' ' + hour + ':' + min
        }
        else if (time == "Happening") return time
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
                    centerComponent={{ text: 'Select the attack time', style: { color: '#fff', fontSize: 20 } }}
                ></Header>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    mode='datetime'
                />

                <View style={{ flex: 3, paddingHorizontal: 10, justifyContent: 'space-around', }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 30 }}>Start time: </Text>
                        <Text style={{ fontSize: 25 }}>{this.transformaData(this.state.horaInici)}</Text>
                    </View>
                    <View style={styles.lateral}>

                        <View style={styles.rodonaIcon}>
                            <TouchableOpacity style={[styles.icons, { backgroundColor: '#7584D8' }]} onPress={() => this.setState({ horaInici: new Date().getTime() - 60 * 60 * 1000 })}>
                                <Image style={{ width: 75, height: 75 }} source={require('./images/timeblank2.png')}></Image>
                            </TouchableOpacity>
                            <Text style={styles.textBoto}>
                                1 hour ago
                            </Text>
                        </View>
                        <View style={styles.rodonaIcon}>
                            <TouchableOpacity style={styles.icons} onPress={() => this.setState({ horaInici: new Date().getTime() })}>
                                <Image style={{ width: 75, height: 75 }} source={require('./images/timeblank2.png')}></Image>
                            </TouchableOpacity>
                            <Text style={styles.textBoto}>
                                Now
                            </Text>
                        </View>
                        <View style={styles.rodonaIcon}>
                            <TouchableOpacity style={styles.icons} onPress={this.showDateTimePicker}>
                                <Image style={{ width: 60, height: 60 }} source={require('./images/calendar-clock.png')}></Image>
                            </TouchableOpacity>
                            <Text style={styles.textBoto}>
                                Other
                            </Text>
                            <Text style={styles.textBoto}>
                                moment
                            </Text>
                        </View>
                    </View>
                </View>

                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible2}
                    onConfirm={this.handleDatePicked2}
                    onCancel={this.hideDateTimePicker2}
                    mode='datetime'
                />
                <View style={{ flex: 3, paddingHorizontal: 10, justifyContent: 'space-around', }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 30 }}>End time: </Text>
                        <Text style={{ fontSize: 25 }}>{this.transformaData(this.state.horaFinal)}</Text>
                    </View>
                    <View style={styles.lateral}>

                        {/*<View style={styles.rodonaIcon}>
                            <TouchableOpacity style={[styles.icons, { backgroundColor: '#7584D8' }]} onPress={() => this.setState({ horaFinal: "Happening" })}>
                                <Image style={{ width: 75, height: 75 }} source={require('./images/timeblank2.png')}></Image>
                            </TouchableOpacity>
                            <Text style={styles.textBoto}>
                                Happening
                            </Text>
                        </View>*/}
                        <View style={styles.rodonaIcon}>
                            <TouchableOpacity style={[styles.icons]} onPress={() => this.setState({ horaFinal: new Date().getTime() })}>
                                <Image style={{ width: 75, height: 75 }} source={require('./images/timeblank2.png')}></Image>
                            </TouchableOpacity>
                            <Text style={styles.textBoto}>
                                Now
                            </Text>
                        </View>
                        <View style={styles.rodonaIcon}>
                            <TouchableOpacity style={styles.icons} onPress={this.showDateTimePicker2}>
                                <Image style={{ width: 60, height: 60 }} source={require('./images/calendar-clock.png')}></Image>
                            </TouchableOpacity>
                            <Text style={styles.textBoto}>
                                Other
                            </Text>
                            <Text style={styles.textBoto}>
                                moment
                            </Text>
                        </View>

                    </View>

                </View>
                <View style={styles.seccioBotons}>

                    <TouchableOpacity
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
                        style={{ width: '48%', alignItems: 'center', height: 52, justifyContent: 'center', backgroundColor: '#2196F3' }}
                    >
                        <View >
                            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>CANCEL</Text>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.next()
                    }}
                        title="Next"
                        style={{ width: '48%', alignItems: 'center', height: 52, justifyContent: 'center', backgroundColor: '#2196F3' }}
                    >
                        <View >


                            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>NEXT</Text>

                        </View>
                    </TouchableOpacity>
                </View>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        /*alignItems: 'center',*/
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 25
    },
    lateral: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10
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
    rodonaIcon: {
        flex: 1,
        alignItems: 'center'
    },
    icons: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        backgroundColor: '#38B3EF',
        borderRadius: 50,
    },
    textBoto: {
        fontSize: 20
    },
    seccioBotons: {
        flex: 1,
        flexDirection: 'row',

        justifyContent: 'space-around',
        alignItems: 'center',


    },
});
