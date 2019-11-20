import { SIGNUP, SIGNIN } from "../types";
import axios from "axios";
import {
  SIGN_UP,
  SIGN_IN,
  FIREBASEURL,
  REFRESH
} from "../../components/utils/misc";

export function signUp(data) {
  const request = axios({
    method: "POST",
    url: SIGN_UP,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    },
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(e => {
      return false;
    });

  return {
    type: SIGNUP,
    payload: request
  };
}

export function signIn(data) {
  const request = axios({
    method: "POST",
    url: SIGN_IN,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    },
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(e => {
      return false;
    });

  return {
    type: SIGNIN,
    payload: request
  };
}

const actionCreators = {
  signUp,
  signIn
};

export { actionCreators };
