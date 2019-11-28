import { Dimensions, Platform } from "react-native";
import { AsyncStorage } from "react-native";

export const FIREBASEURL = "https://autotech-bc113.firebaseio.com";
export const APIKEY = "AIzaSyCaz9Tw-x2BbDkpfWY52qZFmfZgtybdOm8";

export const SIGN_UP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`;
export const SIGN_IN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`;

export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;

export const getOrientation = value => {
  return Dimensions.get("window").height > value ? "portrait" : "landscape";
};

export const setOrientationListener = cb => {
  return Dimensions.addEventListener("change", cb);
};

export const removeOrientationListener = () => {
  return Dimensions.removeEventListener("change");
};

export const getPlatform = () => {
  if (Platform.OS === "ios") {
    return "ios";
  } else {
    return "android";
  }
};

export const getTokens = cb => {
  AsyncStorage.multiGet([
    "@AutoTech@token",
    "@AutoTech@refreshToken",
    "@AutoTech@expireToken",
    "@AutoTech@uid"
  ]).then(value => {
    cb(value);
  });
};

export const setTokens = (values, cb) => {
  const dateNow = new Date();
  const expiration = dateNow.getTime() + 3600 * 1000;

  AsyncStorage.multiSet([
    ["@AutoTech@token", values.token],
    ["@AutoTech@refreshToken", values.refToken],
    ["@AutoTech@expireToken", expiration.toString()],
    ["@AutoTech@uid", values.uid]
  ]).then(response => {
    cb();
  });
};

export const gridTwoColumns = list => {
  let newArticles = [];
  let articles = list;

  let count = 1;
  let vessel = {};

  if (articles) {
    articles.forEach(element => {
      if (count === 1) {
        vessel["blockOne"] = element;
        count++;
      } else {
        vessel["blockTwo"] = element;
        newArticles.push(vessel);

        count = 1;
        vessel = {};
      }
    });
  }
  return newArticles;
};
