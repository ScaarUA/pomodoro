import {createSelector} from 'reselect';
import {STAGES} from './constants';

const getStage = state => state.pomodoro.stage;
const getDurations = ({settings}) => ({
	pomodoroLength: settings.pomodoroLength,
	breakLength: settings.breakLength,
	longBreakLength: settings.longBreakLength,
});

export const getLengthForStage = createSelector(
	[getStage, getDurations],
	(stage, {pomodoroLength, breakLength, longBreakLength}) => {
		switch (stage) {
			case STAGES.WORK:
				return pomodoroLength;
			case STAGES.BREAK:
				return breakLength;
			case STAGES.LONG_BREAK:
				return longBreakLength;
		}
	}
);