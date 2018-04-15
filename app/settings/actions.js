import {AsyncStorage} from 'react-native';
import {defaultState} from './reducer';
import {changePomodoroTime} from '../pomodoro/actions';

export const SETTINGS_CHANGE = 'SETTINGS_CHANGE';

export const changeSettings = settings => {
	return {
		type: SETTINGS_CHANGE,
		payload: settings
	}
};

export const getSettings = () => dispatch => {
	AsyncStorage.getItem('settings')
		.then(settings => {
			const parsedSettings = JSON.parse(settings || defaultState);

			dispatch(changeSettings(parsedSettings))
		})
		.catch(() => {
			dispatch(changeSettings(defaultState))
		})
};