import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Animated, Easing, AppState, Dimensions} from'react-native';
import ProgressCircle from 'react-native-progress-circle';
import styles, {circleHeight} from './styles';
import {theme} from '../../../appConfig';

const {width: screenWidth} = Dimensions.get('window');
const AnimatedProgressCircle = Animated.createAnimatedComponent(ProgressCircle);
let timerAnimation;
let timingInterval;
let pausedDate;
let percents = new Animated.Value(100);

export default class TimerCircle extends Component {
	componentDidMount() {
		this.props.instance({
			start: this.launchTimer,
			stop: this.stopTimer,
			pause: this.pauseTimer
		});
		AppState.addEventListener('change', this.onAppStateChange);
	}

	componentDidUpdate(prevProps) {
		if (this.props.time <= 0) {
			this.stopTimer();
			this.props.onTimerFinished();
		}
		if (this.props.active !== prevProps.active) {
			if (!this.props.active) {
				timingInterval && this.backupTimer();
			} else {
				pausedDate && this.restoreTimer();
			}
		}
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this.onAppStateChange);
	}

	onAppStateChange = appState => {
		if (appState === 'background' && timingInterval) {
			this.backupTimer();
		} else if (appState === 'active' && pausedDate) {
			this.restoreTimer();
		}
	};

	backupTimer = () => {
		this.pauseTimer();
		pausedDate = new Date().getTime();
	};

	restoreTimer = () => {
		const difference = new Date().getTime() - pausedDate;
		const newTime = this.props.time - difference;
		const newPercents = newTime * 100 / this.props.duration;

		pausedDate = null;
		if (newTime <= 0) {
			this.stopTimer();
			this.props.onTimerFinished();
		} else {
			percents.setValue(newPercents);
			this.launchTimer(newTime);
		}
	};

	pauseTimer = () => {
		clearInterval(timingInterval);
		timingInterval = null;
		timerAnimation.stop();
	};

	stopTimer = () => {
		this.pauseTimer();
		percents.setValue(100);
		this.props.onTimerStop();
	};

	launchTimer = (duration = this.props.time) => {
		timerAnimation = Animated.timing(percents, {
			toValue: 0,
			duration,
			easing: Easing.linear
		});
		timerAnimation.start();

		this.props.onTimerTick(duration - 1000);
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
					radius={circleHeight / 2}
					borderWidth={16}
					color={color}
					shadowColor="#eeeeee"
					bgColor={theme.backgroundColor}
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
	duration: PropTypes.number.isRequired,
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