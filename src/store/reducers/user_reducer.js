import { SIGNIN, SIGNUP } from "../types";

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

    default:
      return state;
  }
}
