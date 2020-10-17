
import { REGISTER, REGISTER_ERROR, ERROR } from "../types";

export default (state, action) => {
    switch (action.type) {
        case REGISTER:
            console.log(action.payload);
            return {
                ...state,
                User: action.payload,
                error: null,
            };
        case ERROR:
            console.log(action.payload);
            return {
                ...state,
                error: action.payload.error,
            };        
        case REGISTER_ERROR:
            console.log("Error: " + action.payload);
        default:
            return state;
    }
};