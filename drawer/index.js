import React, {Component} from 'react';
import {View, Text, DrawerLayoutAndroid} from 'react-native';
import {connect} from 'react-redux';
import {closeDrawer, openDrawer} from "./actions";
import NavigationView from "./navigation-view";

class Drawer extends Component {
    constructor(props) {
        super(props);

        this.saveDrawer = this.saveDrawer.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.drawer.active) {
            this.drawer.openDrawer();
        } else {
            this.drawer.closeDrawer();
        }
    }

    saveDrawer(ref) {
        this.drawer = ref;
    }

    render() {
        const {children, openDrawer, closeDrawer} = this.props;

        return (
            <DrawerLayoutAndroid
                ref={this.saveDrawer}
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => <NavigationView />}
                onDrawerClose={closeDrawer}
                onDrawerOpen={openDrawer}
            >
                {children}
            </DrawerLayoutAndroid>
        );
    }
}

function mapStateToProps({drawer}) {
    return {
        drawer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer()),
        closeDrawer: () => dispatch(closeDrawer())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);