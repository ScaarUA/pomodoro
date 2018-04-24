import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, View, Text} from 'react-native';
import TimerCircle from './timer-circle/index';
import {STAGES, STATES} from './constants';
import styles from './styles';
import {changePomodoroState, changePomodoroStage, changePomodoroTime, incrementPomodoroIteration} from './actions';
import TimerButtons from './timer-buttons';
import IterationCounter from './iteration-counter';
import {getLengthForStage} from './selectors';

let timerRef;

class Goals extends Component {
	componentWillUnmount() {
		if (this.props.state === STATES.STOPPED) {
			this.resetTimer();
		}
	}

	goToNextStage = (wasSkipped) => {
        const {stage, changePomodoroState, changePomodoroStage, incrementPomodoroIteration} = this.props;

        changePomodoroState(STATES.STOPPED);

        switch (stage) {
			case STAGES.WORK:
				if (!wasSkipped) {
					incrementPomodoroIteration();
				}
				changePomodoroStage(!wasSkipped && this.shouldHaveLongBreak() ? STAGES.LONG_BREAK : STAGES.BREAK);
				break;
			case STAGES.LONG_BREAK:
			case STAGES.BREAK:
				changePomodoroStage(STAGES.WORK);
				break;
		}
    };

	resetTimer = () => {
		this.props.changePomodoroTime(null);
	};

	shouldHaveLongBreak() {
		const {iteration, longBreakAfter} = this.props;

		return iteration + 1 % longBreakAfter === 0;
	}

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
					onTimerFinished={this.goToNextStage}
					onTimerTick={changePomodoroTime}
					onTimerStop={this.resetTimer}
					duration={duration}
					active={isCurrentRoute}
				/>
				<TimerButtons
					pomodoroState={state}
					pomodoroStage={stage}
					changeTimerState={changePomodoroState}
					onSkip={this.goToNextStage}
					getTimer={() => timerRef}
					time={time}
				/>
				<Text style={styles.title}>COMPLETED POMODOROS</Text>
				<IterationCounter amountOfIterations={iteration} pomodorosPerDay={pomodorosPerDay} />
			</ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
	const {settings, pomodoro, nav} = state;
	const currentRoute = nav.routes[nav.index];
	const stageLength = getLengthForStage(state);

	return {
		state: pomodoro.state,
		stage: pomodoro.stage,
		time: pomodoro.time !== null ? pomodoro.time : stageLength,
		iteration: pomodoro.iteration,
		duration: stageLength,
		isCurrentRoute: currentRoute.routeName === 'Pomodoro',
		pomodorosPerDay: settings.pomodorosPerDay,
		longBreakAfter: settings.longBreakAfter
	};
};

const mapDispatchToProps = dispatch => ({
	changePomodoroState: state => dispatch(changePomodoroState(state)),
	changePomodoroStage: stage => dispatch(changePomodoroStage(stage)),
	changePomodoroTime: time => dispatch(changePomodoroTime(time)),
	incrementPomodoroIteration: () => dispatch(incrementPomodoroIteration()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Goals);