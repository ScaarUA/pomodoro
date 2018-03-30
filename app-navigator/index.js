import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StackNavigator} from 'react-navigation';
import Goals from '../goals';
import {createReactNavigationReduxMiddleware, createReduxBoundAddListener} from "react-navigation-redux-helpers";
import {addNavigationHelpers} from "react-navigation";
import Header from '../header';
import Settings from '../settings';

export const navigatorMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);

const addListener = createReduxBoundAddListener("root");

export const Navigator = StackNavigator({
    'Goals': {
        screen: Goals
    },
    'Settings': {
        screen: Settings
    }
}, {
    navigationOptions: () => ({
        header: ({scene}) => <Header title={scene.route.routeName} />
    })
});

const AppNavigator = ({dispatch, nav}) => (
    <Navigator
        navigation={addNavigationHelpers({
            dispatch: dispatch,
            state: nav,
            addListener
        })}
    />
);

const mapStateToProps = ({nav}) => ({
    nav
});

export default connect(mapStateToProps)(AppNavigator);