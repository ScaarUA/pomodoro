import {combineReducers} from 'redux';
import navReducer from './app-navigator/reducer';
import drawerReducer from './drawer/reducer';
import headerReducer from './header/reducer';

export default combineReducers({
    nav: navReducer,
    drawer: drawerReducer,
    header: headerReducer
});