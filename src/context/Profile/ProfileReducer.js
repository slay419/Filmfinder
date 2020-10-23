
import { REGISTER, REGISTER_ERROR, NAME_TAKEN } from "../types";
//
// Placeholder file
//
// No states currently used
//

export default (state, action) => {
    switch (action.type) {
        
        case REGISTER:
            console.log(action.payload);
            return {
                ...state,
            };
        case NAME_TAKEN:
            console.log(action.payload);
            return {
                ...state,
            };        
        case REGISTER_ERROR:
            console.log("Error: " + action.payload);
        default:
            return state;
    }
};