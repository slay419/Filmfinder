import { REGISTER, REGISTER_ERROR, ERROR } from "../types";

export default (state, action) => {
    switch (action.type) {
        case REGISTER:
            // successfully registered in back end, update state
            console.log(action.payload);
            return {
                ...state,
                User: action.payload,
                error: null,
            };
        case ERROR:
            // error occured in details passed, update to display error
            console.log(action.payload);
            return {
                ...state,
                error: action.payload.error,
            };        
        case REGISTER_ERROR:
            // unexpected error occured
            console.log("Error: " + action.payload);
        default:
            return state;
    }
};
