import {OPEN_DRAWER, CLOSE_DRAWER} from "./actions";

export default function drawerReducer(state = {}, action) {
    switch (action.type) {
        case OPEN_DRAWER:
            return {...state, active: true};
        case CLOSE_DRAWER:
            return {...state, active: false};
        default:
            return state;
    }
};