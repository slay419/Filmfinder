import { NO_MATCH, CHANGE_ERROR, CHANGE_PASSWORD } from "../types";

export default (state, action) => {
    switch (action.type) {
        case CHANGE_PASSWORD:
            console.log(action.payload);
            return {
                ...state,
                Changed: 1,
                Match: 1
            };
        case NO_MATCH:
            console.log(action.payload);
            return {
                ...state,
                Match: 0,
            };
        case CHANGE_ERROR:
            console.log(action.payload);
        default:
            return state;
    }
};