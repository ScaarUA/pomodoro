import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, View, Text} from 'react-native';
import TimerCircle from './timer-circle/index';
import {STAGES, STATES} from './constants';
import styles from './styles';
import {changePomodoroState, changePomodoroStage, changePomodoroTime, incrementPomodoroIteration} from './actions';
import TimerButtons from './timer-buttons';
import IterationCounter from './iteration-counter';

let timerRef;

class Goals extends Component {
	componentWillUnmount() {
		if (this.props.state === STATES.STOPPED) {
			this.resetTimer();
		}
	}

	onTimerFinished = () => {
        const {stage, changePomodoroState, changePomodoroStage, incrementPomodoroIteration} = this.props;

        changePomodoroState(STATES.STOPPED);

        switch (stage) {
			case STAGES.WORK:
				changePomodoroStage(STAGES.BREAK);
				break;
			case STAGES.BREAK:
				incrementPomodoroIteration();
				changePomodoroStage(STAGES.WORK);

		}
    };

	resetTimer = () => {
		this.props.changePomodoroTime(null);
	};

    render() {
    	const {
    		state, stage, time, iteration, duration, isCurrentRoute, pomodorosPerDay,
			changePomodoroState, changePomodoroTime
    	} = this.props;

		return (
            <ScrollView contentContainerStyle={styles.container}>
				<Text style={styles.title}>{stage}</Text>
				<Text style={styles.subtitle}>Do some work effectively</Text>
				<TimerCircle
					time={time}
					instance={(timer) => timerRef = timer}
					onTimerFinished={this.onTimerFinished}
					onTimerTick={changePomodoroTime}
					onTimerStop={this.resetTimer}
					duration={duration}
					active={isCurrentRoute}
				/>
				<TimerButtons
					pomodoroState={state}
					pomodoroStage={stage}
					changeTimerState={changePomodoroState}
					getTimer={() => timerRef}
					time={time}
				/>
				<Text style={styles.title}>COMPLETED POMODOROS</Text>
				<IterationCounter amountOfIterations={iteration} pomodorosPerDay={pomodorosPerDay} />
			</ScrollView>
        );
    }
}

const mapStateToProps = ({settings: {pomodoroLength, breakLength, pomodorosPerDay}, pomodoro: {state, stage, time, iteration}, nav}) => {
	const currentRoute = nav.routes[nav.index];
	let stageLength;
	switch (stage) {
		case STAGES.WORK:
			stageLength = pomodoroLength;
			break;
		case STAGES.BREAK:
			stageLength = breakLength;
			break;
	}

	return {
		state,
		stage,
		time: time !== null ? time : stageLength,
		iteration,
		duration: stageLength,
		isCurrentRoute: currentRoute.routeName === 'Pomodoro',
		pomodorosPerDay
	};
};

const mapDispatchToProps = dispatch => ({
	changePomodoroState: state => dispatch(changePomodoroState(state)),
	changePomodoroStage: stage => dispatch(changePomodoroStage(stage)),
	changePomodoroTime: time => dispatch(changePomodoroTime(time)),
	incrementPomodoroIteration: () => dispatch(incrementPomodoroIteration()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Goals);