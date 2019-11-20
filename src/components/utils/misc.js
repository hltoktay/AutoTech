import { Dimensions, Platform } from "react-native";

export const FIREBASEURL = "https://autotech-bc113.firebaseio.com";
export const APIKEY = "AIzaSyCaz9Tw-x2BbDkpfWY52qZFmfZgtybdOm8";

export const SIGN_UP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`;
export const SIGN_IN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`;

export const REFRESH = ``;

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
