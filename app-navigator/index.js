import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StackNavigator} from 'react-navigation';
import Pomodoro from '../app/pomodoro/index';
import {createReactNavigationReduxMiddleware, createReduxBoundAddListener} from "react-navigation-redux-helpers";
import {addNavigationHelpers} from "react-navigation";
import Header from '../header/index';
import Settings from '../app/settings/index';

export const navigatorMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);

const addListener = createReduxBoundAddListener("root");

export const Navigator = StackNavigator({
    'Pomodoro': {
        screen: Pomodoro
    },
    'Settings': {
        screen: Settings
    }
}, {
    navigationOptions: () => ({
        header: ({scene}) => <Header title={scene.route.routeName} />
    }),
	cardStyle: {
    	backgroundColor: '#ffffff'
    }
});

const AppNavigator = ({dispatch, nav, dataLoaded}) => dataLoaded && (
    <Navigator
        navigation={addNavigationHelpers({
            dispatch: dispatch,
            state: nav,
            addListener
        })}
    />
);

const mapStateToProps = ({nav, settings}) => ({
    nav,
    dataLoaded: settings // && other data
});

export default connect(mapStateToProps)(AppNavigator);