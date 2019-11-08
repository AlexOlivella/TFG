import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity } from 'react-native';



export default class IntensitatDolor extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };

    }

    static navigationOptions = {
        header: null
    }

    next(dolor) {
        var { navigation } = this.props;
        var dataIni = navigation.getParam('dataIni');
        this.props.navigation.navigate(
             "ZonaCap",
            {
                dataIni,
                intensitatDolor: dolor,

            }
        )
        console.log("intensistat dolor")
    }
    render() {

        return (
            //NO PAIN(0): #7cb1b9, MILD PAIN(1,2,3):#a4bb85, MODERATE PAIN(3,4,5):#f2c93d, SEVERE PAIN(5,6,7):#e49b3c, VERY SEVER PAIN(7,8,9):#d7713b, WORST PAIN IMAGINABLE(10):#d46061 
            //0-1:#7cb1b9, 1-2: #96b897, 2-3:#b3bd74, 3-4:#d0c255, 4-5:#f2c93d, 5-6:#e7a93c, 6-7:#de8d3e, 7-8:#d6713b, 8-9:#d3573d, 9-10:#cf4140
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Text style={{ fontSize: 30 }}> IntensitatDolor</Text>
                </View>

                <View style={{ flex: 5 }}>
                    <TouchableOpacity style={{ backgroundColor: '#7cb1b9', width: "100%" }} onPress={this.next(0)}>
                        <Text style={{ fontSize: 30 }}> 0 No pain</Text>
                    </TouchableOpacity>
                    {/*<Image source={require('./NoPain.png')} resizeMode='contain'></Image>*/}
                    <TouchableOpacity style={{ backgroundColor: '#96b897', width: "100%" }} /*onPress={this.next(1)}*/>
                        <Text style={{ fontSize: 30 }}> 1 Mild pain</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#b3bd74', width: "100%" }}/* onPress={this.next(2)}*/>
                        <Text style={{ fontSize: 30 }}> 2 Mild pain </Text>
                    </TouchableOpacity>

                    {/*<Image source={require('./MildPain.png')} resizeMode='contain'></Image>*/}

                    <TouchableOpacity style={{ backgroundColor: '#d0c255', width: "100%" }} /*onPress={this.next(3)}*/>

                        <Text style={{ fontSize: 30 }}> 3 Moderate pain</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#f2c93d', width: "100%" }}/* onPress={this.next(4)}*/>
                        <Text style={{ fontSize: 30 }}> 4 Moderate pain</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: '#e7a93c', width: "100%" }} /*onPress={this.next(5)}*/>
                        <Text style={{ fontSize: 30 }}> 5 Severe pain</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#de8d3e', width: "100%" }}/* onPress={this.next(6)}*/>
                        <Text style={{ fontSize: 30 }}> 6 Severe pain</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#d6713b', width: "100%" }}/* onPress={this.next(7)}*/>
                        <Text style={{ fontSize: 30 }}> 7 Very severe pain</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#d3573d', width: "100%" }}/* onPress={this.next(8)}*/>
                        <Text style={{ fontSize: 30 }}> 8 Very severe pain</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#cf4140', width: "100%" }}/* onPress={this.next(9)}*/>
                        <Text style={{ fontSize: 30 }}> 9 Worst pain imaginable</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#cf4140', width: "100%" }} /*onPress={this.next(10)}*/>
                        <Text style={{ fontSize: 30 }}> 10 Worst pain imaginable</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width:"100%"}}>
                    { /*<Button
                        onPress={() => {
                            this.next()
                        }}
                        title="Next"
                    >

                    </Button>*/}
                    <Button
                        onPress={() => {
                            Alert.alert(
                                'Cancel',
                                'Do you want to canel this process?',
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7BF0E6',
    }

});
