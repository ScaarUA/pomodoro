import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import Hamburger from 'react-native-hamburger';
import styles from './styles';
import {openDrawer} from "../drawer/actions";

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {title, drawer, header, openDrawer} = this.props;
		const stateStyle = {
            backgroundColor: header.backgroundColor
        };

		return (
            <View style={[styles.container, stateStyle]}>
                <Hamburger
                    active={false}
                    onPress={openDrawer}
                />
                <Text
                    style={styles.title}
                >
                    {header.customTitle || title}
                </Text>
            </View>
        );
	}
}

function mapStateToProps({drawer, header}) {
    return {
        drawer,
        header
    };
}

function mapDispatchToProps(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);