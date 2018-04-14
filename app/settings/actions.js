import {AsyncStorage} from 'react-native';
import {defaultState} from './reducer';

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
			dispatch(changeSettings(JSON.parse(settings || defaultState)))
		})
		.catch(() => dispatch(changeSettings(defaultState)))
};