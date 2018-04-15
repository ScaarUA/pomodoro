import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Animated, Easing, AppState} from'react-native';
import ProgressCircle from 'react-native-progress-circle';
import styles from './styles';

const AnimatedProgressCircle = Animated.createAnimatedComponent(ProgressCircle);
let timerAnimation;
let timingInterval;

export default class TimerCircle extends Component {
	constructor(props) {
		super(props);

		this.state = {
			percents: new Animated.Value(100)
		};
	}

	componentDidMount() {
		this.props.instance({
			start: this.launchTimer,
			stop: this.stopTimer,
			pause: this.pauseTimer
		});
		AppState.addEventListener('change', this.onAppStateChange);
	}

	componentDidUpdate() {
		if (this.props.time <= 0) {
			this.stopTimer();
			this.props.onTimerFinished();
		}
	}

	onAppStateChange = appState => {
		if (!timingInterval) {
			return;
		}

		if (appState === 'background') {
			this.pausedDate = new Date().getTime();
		} else if (appState === 'active' && this.pausedDate) {
			const difference = new Date().getTime() - this.pausedDate;
			this.props.onTimerTick(this.props.time = difference);
		}
	};

	pauseTimer = () => {
		clearInterval(timingInterval);
		timingInterval = null;
		timerAnimation.stop();
	};

	stopTimer = () => {
		this.pauseTimer();
		this.state.percents.setValue(100);
		this.props.onTimerStop();
	};

	launchTimer = () => {
		timerAnimation = Animated.timing(this.state.percents, {
			toValue: 0,
			duration: this.props.time,
			easing: Easing.linear()
		});
		timerAnimation.start();

		this.props.onTimerTick(this.props.time - 1000);
		timingInterval = setInterval(this.tickTimer, 1000);
	};

	tickTimer = () => {
		const time = this.props.time - 1000;
		this.props.onTimerTick(time);
	};

	getParsedTime() {
		const {time} = this.props;
		const minutes = Math.floor(time / (60 * 1000));
		let seconds = Math.floor(time / 1000 % 60);

		seconds = seconds.toString().length === 1 ? `0${seconds}` : seconds;

		return `${minutes}:${seconds}`;
	}

	render() {
		const {percents} = this.state;
		const color = percents.interpolate({
			inputRange: [0, 50, 100],
			outputRange: ['rgb(255, 23, 68)', 'rgb(174, 163, 212)', 'rgb(51, 153, 255)']
		});
		const time = this.getParsedTime();
		const fontSize = percents.interpolate({
			inputRange: [0, 100],
			outputRange: [28, 18]
		});

		return (
			<View style={styles.container}>
				<AnimatedProgressCircle
					percent={percents}
					radius={100}
					borderWidth={16}
					color={color}
					shadowColor="#eeeeee"
					bgColor="#ffffff"
				>
					<Animated.Text style={[styles.innerText, {fontSize, color}]}>
						{time}
					</Animated.Text>
				</AnimatedProgressCircle>
			</View>
		);
	}
}

TimerCircle.propTypes = {
	time: PropTypes.number.isRequired,
	onTimerFinished: PropTypes.func,
	onTimerTick: PropTypes.func,
	onTimerStop: PropTypes.func,
	instance: PropTypes.func
};

TimerCircle.defaultProps = {
	onTimerFinished: () => {},
	onTimerTick: () => {},
	onTimerStop: () => {},
	instance: () => {}
};