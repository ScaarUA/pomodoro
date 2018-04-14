import {combineReducers} from 'redux';
import navReducer from './app-navigator/reducer';
import drawerReducer from './drawer/reducer';
import headerReducer from './header/reducer';
import settingsReducer from './app/settings/reducer';
import pomodoroReducer from './app/pomodoro/reducer';

export default combineReducers({
    nav: navReducer,
    drawer: drawerReducer,
    header: headerReducer,
    settings: settingsReducer,
    pomodoro: pomodoroReducer
});