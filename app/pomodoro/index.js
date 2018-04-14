import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Button, Text} from 'react-native';
import TimerCircle from './timer-circle/index';
import {STAGES, STATES} from './constants';
import styles from './styles';
import {changeTimerState, changeTimerStage} from './actions';
import TimerButtons from './timer-buttons';

class Goals extends Component {
	onTimerFinished = () => {
        const {stage} = this.props.pomodoro;

        this.props.changeTimerState(STATES.STOPPED);
        this.props.changeTimerStage(stage === STAGES.WORK ? STAGES.BREAK : STAGES.WORK);
    };

    getStageLength() {
		const {pomodoroLength, breakLength, pomodoro} = this.props;

		switch (pomodoro.stage) {
            case STAGES.WORK:
                return pomodoroLength;
            case STAGES.BREAK:
                return breakLength;
        }
	}

    render() {
    	const {pomodoro, changeTimerState} = this.props;
        const length = this.getStageLength();

		return (
            <View style={styles.container}>
				<Text style={styles.title}>{pomodoro.stage}</Text>
				<Text style={styles.subtitle}>Do some work effectively</Text>
                <TimerCircle
                    amount={length}
                    instance={(timer) => this.timer = timer}
                    onTimerFinished={this.onTimerFinished}
                />
                <View style={styles.buttonsContainer}>
                    <TimerButtons
						pomodoroState={pomodoro.state}
						pomodoroStage={pomodoro.stage}
						changeTimerState={changeTimerState}
						getTimer={() => this.timer}
					/>
                </View>
            </View>
        );
    }
}

const mapStateToProps = ({settings, pomodoro}) => ({
    pomodoroLength: settings.pomodoroLength,
    breakLength: settings.breakLength,
    pomodoro
});

const mapDispatchToProps = dispatch => ({
	changeTimerState: state => dispatch(changeTimerState(state)),
	changeTimerStage: state => dispatch(changeTimerStage(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(Goals);