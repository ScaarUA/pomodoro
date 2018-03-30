import {HEADER_TITLE_CHANGE, HEADER_COLOR_CHANGE} from "./actions";

const initialState = {
    customTitle: null,
    backgroundColor: '#03A9F4'
};

export default function headerReducer(state = initialState, action) {
    switch (action.type) {
        case HEADER_COLOR_CHANGE:
            return {
                ...state,
                backgroundColor: action.payload
            };
        case HEADER_TITLE_CHANGE:
            return {
                ...state,
                title: action.payload
            };
        default:
            return state;
    }
};