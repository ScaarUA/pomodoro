import {applyMiddleware, createStore} from 'redux';
import rootReducer from './rootReducer';
import {navigatorMiddleware} from './app-navigator';

export default createStore(
    rootReducer,
    applyMiddleware(navigatorMiddleware)
);