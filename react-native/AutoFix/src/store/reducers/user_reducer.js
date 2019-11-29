import { SIGNIN, SIGNUP, AUTOSIGNIN, GET_USER_POSTS, DELETE_USER_POST } from "../types";

export default function(state = {}, action) {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        auth: {
          uid: action.payload.localId || false,
          token: action.payload.idToken || false,
          refToken: action.payload.refreshToken || false
        }
      };
      break;
    case SIGNUP:
      return {
        ...state,
        auth: {
          uid: action.payload.localId || false,
          token: action.payload.idToken || false,
          refToken: action.payload.refreshToken || false
        }
      };
      break;
    case AUTOSIGNIN:
      return {
        ...state,
        auth: {
          uid: action.payload.user_id || false,
          token: action.payload.id_token || false,
          refToken: action.payload.refresh_token || false
        }
      };
      break;
    case GET_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload
      }
      break;
    case DELETE_USER_POST:
    return {...state,  ...action.payload}
    default:
      return state;
  }
}
