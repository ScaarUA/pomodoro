import React, {Component} from 'react';
import {Text} from'react-native';
import {changeHeaderColor} from "../../header/actions";

class Settings extends Component {
    componentDidMount() {
        this.props.navigation.dispatch(changeHeaderColor('#777777'));
    }

    componentWillUnmount() {
        this.props.navigation.dispatch(changeHeaderColor('#03A9F4'));
    }

    render() {
        return (
            <Text>Settings</Text>
        );
    }
}

export default Settings;