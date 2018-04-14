import React, {Component} from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import {Font, Permissions} from 'expo';
import store from './store';
import AppNavigator from './app-navigator';
import Drawer from './drawer';
import {getSettings} from './app/settings/actions'

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
		Permissions.askAsync(Permissions.NOTIFICATIONS);

        this.setState({
            fontLoaded: true
        });

        store.dispatch(getSettings());
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
