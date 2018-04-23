import {POMODORO_STATE_CHANGE, POMODORO_STAGE_CHANGE, POMODORO_TIME_CHANGE, POMODORO_ITERATION_INCREMENT} from './actions';
import {STATES, STAGES} from './constants';

const initialState = {
	state: STATES.STOPPED,
	stage: STAGES.WORK,
	time: null,
	iteration: 0
};

export default function (state = initialState, {type, payload}) {
	switch (type) {
		case POMODORO_STATE_CHANGE:
			return {...state, state: payload};
		case POMODORO_STAGE_CHANGE:
			return {...state, stage: payload};
		case POMODORO_TIME_CHANGE:
			return {...state, time: payload};
		case POMODORO_ITERATION_INCREMENT:
			return {...state, iteration: state.iteration + 1};
		default:
			return state;
	}
}