import {Navigator} from './index';

const initialState = Navigator.router.getStateForAction(Navigator.router.getActionForPathAndParams('Goals'));

export default function navReducer(state = initialState, action) {
    const nextState = Navigator.router.getStateForAction(action, state);

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
};