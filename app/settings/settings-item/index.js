import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableNativeFeedback} from 'react-native';
import DialogManager, {SlideAnimation} from 'react-native-dialog-component';
import styles from './styles';

export default class SettingsItem extends Component {
	openModal = () => {
		DialogManager.show({
			title: this.props.name,
			titleAlign: 'center',
			animationDuration: 200,
			dialogAnimation: new SlideAnimation({
				slideFrom: 'bottom'
			}),
			width: '80%',
			children: this.props.children
		});
	};

	render() {
		const {name, description} = this.props;

		return (
			<TouchableNativeFeedback onPress={this.openModal}>
				<View style={[styles.container, description && styles.containerWithDescription]}>
					<Text style={styles.name}>{name}</Text>
					{description && <Text style={styles.description}>{description}</Text>}
				</View>
			</TouchableNativeFeedback>
		);
	}
};

SettingsItem.propTypes = {
	name: PropTypes.string.isRequired,
	description: PropTypes.string
};