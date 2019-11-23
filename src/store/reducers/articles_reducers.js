import { GET_ARTICLES } from "../types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_ARTICLES:
      return { ...state, list: action.payload };
    default:
      return state;
  }
}
