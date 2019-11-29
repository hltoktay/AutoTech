import { SIGNUP, SIGNIN, AUTOSIGNIN, GET_USER_POSTS } from "../types";
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

export function autoSignIn(refToken) {
  const request = axios({
    method: "POST",
    url: REFRESH,
    data: "grant_type=refresh_token&refresh_token=" + refToken,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(e => {
      return false;
    });

  return {
    type: AUTOSIGNIN,
    payload: request
  };
}

export function getUserPosts(UID) {
  const request = axios(
    `${FIREBASEURL}/articles.json?orderBy=\"uid\"&equalTo=\"${UID}\"`
  ).then(response => {
    let articles = [];

    for (let key in response.data) {
      articles.push({
        ...response.data[key],
        id: key
      });
    }
    return articles;
  });

  return {
    type: GET_USER_POSTS,
    payload: request
  };
}

const actionCreators = {
  signUp,
  signIn,
  autoSignIn,
  getUserPosts
};

export { actionCreators };
