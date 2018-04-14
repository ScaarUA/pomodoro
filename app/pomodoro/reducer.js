import {TIMER_STATE_CHANGE, TIMER_STAGE_CHANGE} from './actions';
import {STATES, STAGES} from './constants';

const initialState = {
	state: STATES.STOPPED,
	stage: STAGES.WORK
};

export default function (state = initialState, {type, payload}) {
	switch (type) {
		case TIMER_STATE_CHANGE:
			return {...state, state: payload};
		case TIMER_STAGE_CHANGE:
			return {...state, stage: payload};
		default:
			return state;
	}
}