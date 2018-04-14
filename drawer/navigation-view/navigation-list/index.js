import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from "react-navigation";
import styles from './styles';
import NavigationListItem from './navigation-list-item';
import {Icons} from 'react-native-fontawesome';
import {closeDrawer} from "../../actions";


class NavigationList extends Component {
    constructor(props) {
        super(props);

        this.goToMain = this.goToMain.bind(this);
        this.goToSettings = this.goToSettings.bind(this);
    }

    goTo(route, params, doNotReplace) {
        const {currentRoute, closeDrawer, goToRoute, replaceRoute} = this.props;

        closeDrawer();
        if (currentRoute.routeName !== route) {
            doNotReplace ? goToRoute(route, params) : replaceRoute(currentRoute.key, route, params);
        }
    }

    goToMain() {
        this.goTo('Pomodoro');
    }

    goToSettings() {
        this.goTo('Settings', null, true);
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationListItem
                    icon={Icons.home}
                    onPress={this.goToMain}
                >
                    Main
                </NavigationListItem>
                <NavigationListItem
                    icon={Icons.cog}
                    onPress={this.goToSettings}
                >
                    Settings
                </NavigationListItem>
            </View>
        );
    }
}

function mapStateToProps({nav}) {
    const currentRoute = nav.routes[nav.routes.length - 1];

    return {
        currentRoute
    };
}

function mapDispatchToProps(dispatch) {
    return {
        closeDrawer: () => dispatch(closeDrawer()),
        goToRoute: (routeName, params) => dispatch(NavigationActions.navigate({
            routeName,
            params
        })),
        replaceRoute: (key, routeName, params) => dispatch(NavigationActions.replace({
            key,
            routeName,
            params
        }))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationList);