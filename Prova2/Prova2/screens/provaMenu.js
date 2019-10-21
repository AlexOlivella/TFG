import React from 'react';
import { StyleSheet, Text, View, DrawerLayoutAndroid, ToolbarAndroid, Button } from 'react-native';
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen');

export default class provaMenu extends React.Component {
    constructor() {
        super();
        this.openDrawer = this.openDrawer.bind(this);
    }
    static navigationOptions = {
        header: null,

    }
    openDrawer() {
        this.drawer.openDrawer();
    }

    render() {
        var { navigation } = this.props;
        var navigate = navigation.navigate;
        var drawer = (
            //Color del menu que es deplega
            <View style={{ flex: 1, backgroundColor: '#FBEAFF' }}>
                <View style={styles.seccioBotons}>
                    <View>
                        <Button title="Calendar" onPress={() => { navigate("Calendar") }}> </Button>
                    </View>
                    <View>
                        <Button title="LogOut" onPress={() => { navigate("LogOut") }}> </Button>
                    </View>
                </View>
            </View>
        );
        return (
            
            <DrawerLayoutAndroid renderNavigationView={() => drawer} drawerWidth={Math.min(height, width) * 0.7}
                ref={_drawer => (this.drawer = _drawer)}>
                <ToolbarAndroid style={styles.toolbar} navIcon={require('./hamburger.png')}
                    onIconClicked={this.openDrawer} />

            </DrawerLayoutAndroid>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FBEAFF',
    },
    toolbar: {
        height: 56,
        backgroundColor: '#FBEAFF'
    },
    seccioBotons: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FBEAFF',
    
      },
});

