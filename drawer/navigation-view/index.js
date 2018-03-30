import React, {Component} from 'react';
import {View} from 'react-native';
import styles from "./styles";
import NavigationList from './navigation-list';
import SideHeader from './side-header';

class NavigationView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SideHeader />
                <NavigationList />
            </View>
        );
    }
}

export default NavigationView;