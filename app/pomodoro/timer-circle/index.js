import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Animated, Easing, AppState} from'react-native';
import ProgressCircle from 'react-native-progress-circle';
import styles from './styles';

const AnimatedProgressCircle = Animated.createAnimatedComponent(ProgressCircle);

export default class TimerCircle extends Component {
	constructor(props) {
		super(props);

		this.state = {
			time: props.amount * 60 * 1000,
			percents: new Animated.Value(100)
		};
	}

	componentDidMount() {
		this.props.instance({
			start: this.launchTimer,
			stop: this.stopTimer,
			pause: this.pauseTimer,
			getTime: this.getTime
		});
		AppState.addEventListener('change', this.onAppStateChange);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.amount !== this.props.amount) {
			this.setState({
				time: this.props.amount * 60 * 1000
			})
		}

		if (this.state.time <= 0) {
			this.stopTimer();
			this.props.onTimerFinished();
		}
	}

	onAppStateChange = appState => {
		if (!this.timingInterval) {
			return;
		}

		if (appState === 'background') {
			this.pausedDate = new Date().getTime();
		} else if (appState === 'active' && this.pausedDate) {
			const difference = new Date().getTime() - this.pausedDate;
			this.setState({
				time: this.state.time - difference
			});
		}
	};

	pauseTimer = () => {
		clearInterval(this.timingInterval);
		this.timingInterval = null;
		this.animation.stop();
	};

	stopTimer = () => {
		this.pauseTimer();
		this.setState({
			time: this.props.amount * 60 * 1000,
			percents: new Animated.Value(100)
		});
	};

	launchTimer = () => {
		this.animation = Animated.timing(this.state.percents, {
			toValue: 0,
			duration: this.state.time,
			easing: Easing.linear()
		});
		this.animation.start();

		this.timingInterval = setInterval(() => {
			this.setState({
				time: this.state.time - 1000
			});
		}, 1000);
	};

	getTime = () => {
		return this.state.time;
	};

	getParsedTime() {
		const {time} = this.state;
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
	amount: PropTypes.number.isRequired,
	onTimerFinished: PropTypes.func,
	instance: PropTypes.func
};

TimerCircle.defaultProps = {
	onTimerFinished: () => {},
	instance: () => {}
};