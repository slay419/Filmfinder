import {
  REGISTER,
  REGISTER_ERROR,
  NAME_TAKEN,
  BANNED_LIST_ERROR,
  GET_BANNED_LIST,
  BAN_USER,
  GET_WISHLIST,
  SET_LOADING,
  WISHLIST_ERROR,
  GET_USER_BY_ID,
  GET_RECOMMENDATIONS,
  BANNED,
  GET_NOTIFICATIONS,
  GET_FRIENDS,
  CHECK_PARTNER,
  ADD_PARTNER,
  REMOVE_PARTNER,
  GET_COMPATABILITY,
  GET_PROFILE_REVIEWS,
  CLEAR_NOTIFICATIONS,
} from "../types";
//
// Placeholder file
//
// No states currently used
//

export default (state, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
      };
    case NAME_TAKEN:
      return {
        ...state,
      };
    case GET_BANNED_LIST:
      return {
        ...state,
        bannedList: action.payload.banned_list,
      };
    case BAN_USER:
      return {
        ...state,
        banned: action.payload.success,
      };
    case REGISTER_ERROR:
      console.log("Error: " + action.payload);
      return state;
    case BANNED_LIST_ERROR:
      console.log("Error: " + action.payload);
      return state;

    case GET_WISHLIST:
      // retrieve the wishlist
      return {
        ...state,
        wishlist: action.payload,
        loading: !state.loading,
      };
    case GET_PROFILE_REVIEWS:
      // retrieve reviews the user has left
      return {
        ...state,
        reviews: action.payload,
        loading: !state.loading,
      };
    case SET_LOADING:
      // change the loading sign from active to inactive
      return {
        ...state,
        loading: !state.loading,
      };
    case WISHLIST_ERROR:
      // unexpected error has occured
      console.log(action.payload);
      return state;
    case GET_USER_BY_ID:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case GET_RECOMMENDATIONS:
      return {
        ...state,
        recommendations: action.payload.movies,
      };

    case BANNED:
      return {
        ...state,
        banned: action.payload.success,
      };

    case GET_FRIENDS:
      return {
        ...state,
        friends: action.payload
      }

    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload
      }
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: []
      }
      
    case ADD_PARTNER:
      return {
        ...state,
        partner: 1,
      }

    case REMOVE_PARTNER:
      return {
        ...state,
        partner: 0,
      }

    case CHECK_PARTNER:
      return {
        ...state,
        partner: action.payload,
      }
    
    case GET_COMPATABILITY:
      return {
        ...state,
        compatability: action.payload,
        loading: false,
      }
    default:
      return state;
  }
};
