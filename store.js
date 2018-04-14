import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';
import {navigatorMiddleware} from './app-navigator';

export default createStore(
    rootReducer,
    applyMiddleware(navigatorMiddleware, thunkMiddleware)
);