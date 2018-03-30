import React, {Component} from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import {Font} from 'expo';
import store from './store';
import AppNavigator from './app-navigator';
import Header from './header';
import Drawer from './drawer';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fontLoaded: false
        };
    }
    async componentDidMount() {
        await Font.loadAsync({
            'FontAwesome': require('./assets/fonts/fontawesome-webfont.ttf')
        });

        this.setState({
            fontLoaded: true
        })
    }

    render() {
        const {fontLoaded} = this.state;

        return (
            <Provider store={store}>
                <View style={styles.container}>
                    {fontLoaded && (
                        <Drawer>
                            <StatusBar
                                barStyle="light-content"
                                translucent={false}
                                networkActivityIndicatorVisible={false}
                            />
                            <AppNavigator />
                        </Drawer>
                    )}
                </View>
            </Provider>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
    },
    content: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
