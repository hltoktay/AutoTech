import { SIGNIN, SIGNUP, AUTOSIGNIN } from "../types";

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
    case SIGNUP:
      return {
        ...state,
        auth: {
          uid: action.payload.localId || false,
          token: action.payload.idToken || false,
          refToken: action.payload.refreshToken || false
        }
      };

    case AUTOSIGNIN:
      return {
        ...state,
        auth: {
          uid: action.payload.user_id || false,
          token: action.payload.id_token || false,
          refToken: action.payload.refresh_token || false
        }
      };

    default:
      return state;
  }
}
