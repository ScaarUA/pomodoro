import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Slider, Text, View} from 'react-native';
import styles from './styles';
import {theme} from '../../../appConfig';
import DialogManager, {DialogContent, DialogButton} from 'react-native-dialog-component';

export default class DurationControl extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: props.value
		};
	}

	changeValue = value => {
		this.setState({
			value: value
		});
	};

	dismissModal = () => {
		this.props.onValueChange(this.props.value);
		this.closeModal();
	};

	closeModal() {
		DialogManager.dismiss();
	}

	get formattedDuration() {
		return `${this.state.value / this.props.multiplier} ${this.props.prefix}`;
	}

	render() {
		const {
			min, max, multiplier, step, value,
			onValueChange
		} = this.props;

		return (
			<DialogContent>
				<View style={styles.durationContainer}>
					<Text style={styles.durationText}>{this.formattedDuration}</Text>
				</View>
				<Slider
					style={styles.slider}
					value={value}
					minimumValue={min * multiplier}
					maximumValue={max * multiplier}
					step={step * multiplier}
					onValueChange={this.changeValue}
					onSlidingComplete={onValueChange}
					minimumTrackTintColor={theme.mainColor}
					maximumTrackTintColor={theme.mainColor}
					thumbTintColor={theme.mainColor}
				/>
				<View style={styles.dialogButtons}>
					<DialogButton onPress={this.dismissModal} text="Cancel" />
					<DialogButton onPress={this.closeModal} text="OK" />
				</View>
			</DialogContent>
		);
	}
}

DurationControl.propTypes = {
	multiplier: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
	onValueChange: PropTypes.func,
	value: PropTypes.number,
	prefix: PropTypes.string,
	step: PropTypes.number
};

DurationControl.defaultProps = {
	multiplier: 1,
	min: 0,
	max: 100,
	onValueChange: () => {},
	prefix: '',
	step: 1
};