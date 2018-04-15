import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import TimerCircle from './timer-circle/index';
import {STAGES, STATES} from './constants';
import styles from './styles';
import {changePomodoroState, changePomodoroStage, changePomodoroTime} from './actions';
import TimerButtons from './timer-buttons';

let timerRef;

class Goals extends Component {
	componentWillUnmount() {
		if (this.props.state === STATES.STOPPED) {
			this.resetTimer();
		}
	}

	onTimerFinished = () => {
        const {stage, changePomodoroState, changePomodoroStage} = this.props;

        changePomodoroState(STATES.STOPPED);
        changePomodoroStage(stage === STAGES.WORK ? STAGES.BREAK : STAGES.WORK);
    };

	resetTimer = () => {
		this.props.changePomodoroTime(null);
	};

    render() {
    	const {state, stage, time, changePomodoroState, changePomodoroTime} = this.props;

		return (
            <View style={styles.container}>
				<Text style={styles.title}>{stage}</Text>
				<Text style={styles.subtitle}>Do some work effectively</Text>
                <TimerCircle
					time={time}
                    instance={(timer) => timerRef = timer}
                    onTimerFinished={this.onTimerFinished}
					onTimerTick={changePomodoroTime}
					onTimerStop={this.resetTimer}
                />
                <View style={styles.buttonsContainer}>
                    <TimerButtons
						pomodoroState={state}
						pomodoroStage={stage}
						changeTimerState={changePomodoroState}
						getTimer={() => timerRef}
						time={time}
					/>
                </View>
            </View>
        );
    }
}

const mapStateToProps = ({settings: {pomodoroLength, breakLength}, pomodoro: {state, stage, time}}) => {
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
		time: time !== null ? time : stageLength
	};
};

const mapDispatchToProps = dispatch => ({
	changePomodoroState: state => dispatch(changePomodoroState(state)),
	changePomodoroStage: stage => dispatch(changePomodoroStage(stage)),
	changePomodoroTime: time => dispatch(changePomodoroTime(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Goals);