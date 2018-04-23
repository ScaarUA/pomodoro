export const POMODORO_STATE_CHANGE = 'POMODORO_STATE_CHANGE';
export const POMODORO_STAGE_CHANGE = 'POMODORO_STAGE_CHANGE';
export const POMODORO_TIME_CHANGE = 'POMODORO_TIME_CHANGE';
export const POMODORO_ITERATION_INCREMENT = 'POMODORO_ITERATION_INCREMENT';

export const changePomodoroState = state => ({
	type: POMODORO_STATE_CHANGE,
	payload: state
});

export const changePomodoroStage = stage => ({
	type: POMODORO_STAGE_CHANGE,
	payload: stage
});

export const changePomodoroTime = time => ({
	type: POMODORO_TIME_CHANGE,
	payload: time
});

export const incrementPomodoroIteration = () => ({
	type: POMODORO_ITERATION_INCREMENT
});