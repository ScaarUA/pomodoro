import {AsyncStorage} from 'react-native';
import {SETTINGS_CHANGE} from './actions';

export const defaultState = {
	pomodoroLength: 25,
	breakLength: 5
};

export default function(state = null, {type, payload}) {
	if (type === SETTINGS_CHANGE) {
		state = {...state, ...payload};
		AsyncStorage.setItem('settings', JSON.stringify(state));
	}

	return state;
}