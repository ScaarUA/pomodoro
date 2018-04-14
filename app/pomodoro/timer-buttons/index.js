import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Button} from 'react-native';
import {Notifications} from 'expo';
import styles from './styles';
import {STATES, STAGES} from '../constants';

export default class TimerButtons extends Component {
	startTimer = () => {
		this.props.getTimer().start();
		this.props.changeTimerState(STATES.STARTED);
		this.dismissNotification();
		this.scheduleNotification();
	};

	stopTimer = () => {
		this.props.getTimer().stop();
		this.props.changeTimerState(STATES.STOPPED);
		this.cancelNotification();
	};

	pauseTimer = () => {
		this.props.getTimer().pause();
		this.props.changeTimerState(STATES.PAUSED);
		this.cancelNotification();
	};

	async scheduleNotification() {
		const time = new Date().getTime() + this.props.getTimer().getTime();
		const message = this.props.pomodoroStage === STAGES.WORK ?
			'Work finished. Lets have some break' :
			'Break finished. Lets continue working';

		this.notificationId = await Notifications.scheduleLocalNotificationAsync({
			title: 'Pomodoro',
			body: message,
			android: {
				sound: true
			}
		}, {
			time: time
		});
	}

	dismissNotification() {
		if (this.notificationId) {
			Notifications.dismissNotificationAsync(this.notificationId);
		}
	}

	cancelNotification() {
		Notifications.cancelScheduledNotificationAsync(this.notificationId);
	}

	showStopButton() {
		const {pomodoroState} = this.props;

		return pomodoroState === STATES.STARTED || pomodoroState === STATES.PAUSED;
	}

	showStartButton() {
		const {pomodoroState} = this.props;

		return pomodoroState === STATES.STOPPED || pomodoroState === STATES.PAUSED;
	}

	showPauseButton() {
		const {pomodoroState} = this.props;

		return pomodoroState === STATES.STARTED;
	}

	render() {
		return (
			<View style={styles.container}>
				{this.showStartButton() && (
					<Button
						onPress={this.startTimer}
						title="start"
					/>
				)}
				{this.showPauseButton() && (
					<Button
						onPress={this.pauseTimer}
						title="pause"
					/>
				)}
				{this.showStopButton() && (
					<Button
						onPress={this.stopTimer}
						title="stop"
						color="#ff1744"
					/>
				)}
			</View>
		);
	}
}

TimerButtons.propTypes = {
	getTimer: PropTypes.func.isRequired,
	pomodoroStage: PropTypes.string.isRequired,
	pomodoroState: PropTypes.string.isRequired,
	changeTimerState: PropTypes.func.isRequired
};