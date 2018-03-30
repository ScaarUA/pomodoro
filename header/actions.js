export const HEADER_TITLE_CHANGE = 'HEADER_TITLE_CHANGE';
export const HEADER_COLOR_CHANGE = 'HEADER_COLOR_CHANGE';

export function changeHeaderTitle(title) {
    return {
        type: HEADER_TITLE_CHANGE,
        payload: title
    }
}

export function changeHeaderColor(color) {
    return {
        type: HEADER_COLOR_CHANGE,
        payload: color
    }
}