
import { REGISTER, REGISTER_ERROR, NAME_TAKEN } from "../types";

export default (state, action) => {
    switch (action.type) {
        case REGISTER:
            console.log(action.payload);
            return {
                ...state,
                User: action.payload,
                error: "",
            };
        case NAME_TAKEN:
            console.log(action.payload);
            return {
                ...state,
                error: action.payload,
            };        
        case REGISTER_ERROR:
            console.log("Error: " + action.payload);
        default:
            return state;
    }
};