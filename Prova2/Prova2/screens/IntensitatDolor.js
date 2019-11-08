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
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marignTop: 20 }}>
                    <Text style={{ fontSize: 30 }}> IntensitatDolor</Text>
                </View>

                <View style={{ flex: 6 }}>
                    <TouchableOpacity style={[{ backgroundColor: '#7cb1b9' }, styles.painRow]} onPress={() => this.next(0)}>
                        <Text style={styles.text}>No pain</Text>
                        <Text style={styles.text}> 0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ backgroundColor: '#96b897' }, styles.painRow]} onPress={() => this.next(1)}>
                        <Text style={styles.text}>Very mild</Text>
                        <Text style={styles.text}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ backgroundColor: '#b3bd74' }, styles.painRow]} onPress={() => this.next(2)}>
                        <Text style={styles.text}>Discomforting </Text>
                        <Text style={styles.text}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ backgroundColor: '#d0c255' }, styles.painRow]} onPress={() => this.next(3)}>
                        <Text style={styles.text}>Tolerable</Text>
                        <Text style={styles.text}> 3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ backgroundColor: '#f2c93d' }, styles.painRow]} onPress={() => this.next(4)}>
                        <Text style={styles.text}>Distressing</Text>
                        <Text style={styles.text}> 4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ backgroundColor: '#e7a93c' }, styles.painRow]} onPress={() => this.next(5)}>
                        <Text style={styles.text}>Very distressing</Text>
                        <Text style={styles.text}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ backgroundColor: '#de8d3e' }, styles.painRow]} onPress={() => this.next(6)}>
                        <Text style={styles.text}>Intense</Text>
                        <Text style={styles.text}>6</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ backgroundColor: '#d6713b' }, styles.painRow]} onPress={() => this.next(7)}>
                        <Text style={styles.text}>Very intense</Text>
                        <Text style={styles.text}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ backgroundColor: '#d3573d' }, styles.painRow]} onPress={() => this.next(8)}>
                        <Text style={styles.text}>Utterly horrible</Text>
                        <Text style={styles.text}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ backgroundColor: '#cf4140' }, styles.painRow]} onPress={() => this.next(9)}>
                        <Text style={styles.text}>Unbearable pain</Text>
                        <Text style={styles.text}>9</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ backgroundColor: '#cf4140' }, styles.painRow]} onPress={() => this.next(10)}>
                        <Text style={styles.text}>Worst pain imaginable</Text>
                        <Text style={styles.text}>10</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "100%" }}>
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
        justifyContent: 'center',
        /*alignItems: 'center',*/
        backgroundColor: '#7BF0E6',
    },
    painRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        fontSize: 25,
        height: 48,
        paddingHorizontal: 10,
        paddingRight: 10,
        alignItems: 'center'

    },
    text: {
        fontSize: 25
    }

});
