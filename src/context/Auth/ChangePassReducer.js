import { NO_MATCH, CHANGE_ERROR, CHANGE_PASSWORD } from "../types";

export default (state, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD:
      console.log(action.payload);
      return {
        ...state,
        Changed: 1,
        Match: null,
      };
    case NO_MATCH:
      console.log(action.payload);
      return {
        ...state,
        Match: action.payload.error,
        Change: 0,
      };
    case CHANGE_ERROR:
      console.log(action.payload);
      return state;
    default:
      return state;
  }
};
