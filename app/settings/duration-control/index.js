import React, {Component} from 'react';
import {Slider, Text, View} from 'react-native';
import styles from './styles';
import {theme} from '../../../appConfig';
import DialogManager, {DialogContent, DialogButton} from 'react-native-dialog-component';

export default class DurationControl extends Component {
	constructor(props) {
		super(props);

		this.state = {
			duration: props.duration
		};
	}

	changeValue = value => {
		this.setState({
			duration: value
		});
	};

	dismissModal = () => {
		this.props.onValueChange(this.props.duration);
		this.closeModal();
	};

	closeModal() {
		DialogManager.dismiss();
	}

	get formattedDuration() {
		return `${this.state.duration / 60 / 1000} minute(s)`;
	}

	render() {
		const {
			min, max,
			onValueChange
		} = this.props;

		return (
			<DialogContent>
				<View style={styles.durationContainer}>
					<Text style={styles.durationText}>{this.formattedDuration}</Text>
				</View>
				<Slider
					style={styles.slider}
					value={this.props.duration}
					minimumValue={min * 60 * 1000}
					maximumValue={max * 60 * 1000}
					step={60 * 1000}
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