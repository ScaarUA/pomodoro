export const TIMER_STATE_CHANGE = 'TIMER_STATE_CHANGE';
export const TIMER_STAGE_CHANGE = 'TIMER_STAGE_CHANGE';

export const changeTimerState = state => ({
	type: TIMER_STATE_CHANGE,
	payload: state
});

export const changeTimerStage = stage => ({
	type: TIMER_STAGE_CHANGE,
	payload: stage
});