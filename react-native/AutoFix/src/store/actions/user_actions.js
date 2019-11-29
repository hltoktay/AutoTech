import { SIGNUP, SIGNIN, AUTOSIGNIN, GET_USER_POSTS, DELETE_USER_POST } from "../types";
import axios from "axios";
import {
  SIGN_UP,
  SIGN_IN,
  FIREBASEURL,
  REFRESH
} from "../../components/utils/misc";
import {setTokens} from '../../components/utils/misc';

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

export const autoSignIn = (refToken) => {
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

export const deleteUserpost = (POSTID, USERDATA) => {

  const  promise = new Promise((resolve, reject) => {

      const URL = `${FIREBASEURL}/articles/${POSTID}.json`

      const request = axios({
        method: 'DELETE',
        url: `${URL}?auth=${USERDATA.token}`
      }).then( response => {
          resolve({ deletePost: true })
      }).catch(e => {
        const signIn = autoSignIn(USERDATA.refToken);

        signIn.payload.then( response => {
          let newTokens = {
            token: response.id_token,
            refToken: response.refresh_token,
            uid: response.user_id
          }

          setTokens(newTokens,() => {
            axios({
              method: 'DELETE',
              url: `${URL}?auth=${USERDATA.token}`
            }).then(() => {
              resolve({ 
                auth: newTokens,
                deletePost: true 
              })
            })
          })

        })
      })
  })

  return {
    type: DELETE_USER_POST,
    payload: promise
  }
}

const actionCreators = {
  signUp,
  signIn,
  autoSignIn,
  getUserPosts,
  deleteUserpost
};

export { actionCreators };
