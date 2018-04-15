import {POMODORO_STATE_CHANGE, POMODORO_STAGE_CHANGE, POMODORO_TIME_CHANGE} from './actions';
import {STATES, STAGES} from './constants';

const initialState = {
	state: STATES.STOPPED,
	stage: STAGES.WORK,
	time: null
};

export default function (state = initialState, {type, payload}) {
	switch (type) {
		case POMODORO_STATE_CHANGE:
			return {...state, state: payload};
		case POMODORO_STAGE_CHANGE:
			return {...state, stage: payload};
		case POMODORO_TIME_CHANGE:
			return {...state, time: payload};
		default:
			return state;
	}
}