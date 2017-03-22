import firebase from "../api/firebase";
import jwtDecode from "jwt-decode";
import {KJUR} from "jsrsasign";

export const sendUserText = (fullName, text) => dispatch => {
  dispatch({
    type: "SEND",
    payload: firebase.sendUserText(fullName, text)
  })
};

export const changeText = (text) => dispatch => {
  dispatch({
    type: "CHANGE_TEXT",
    payload: text
  })
};

const PUB_KEY = "-----BEGIN PUBLIC KEY-----MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAYS2ma8RmiLLVpVVLMWqAI/rmg1dTgTDkkqfIBWWJXidLyinmBC6/ky5in2FdodIVeHdwI6pP7IH4pEX4FbnxPwIDAQAB-----END PUBLIC KEY-----";

export const setCurrentUser = () => dispatch => {
  const user = getCurrentUserFromToken();
  if (user == null) {
    return;
  }

  dispatch({
    type: "SET_USER",
    payload: user
  })
};

const getCurrentUserFromToken = () => {
  const token = getParameterByName('t');
  if (!isValidToken(token)) {
    return null;
  }

  let decode = null;
  try {
    decode = jwtDecode(token);

  } catch (err) {
    return null;
  }

  return {
    name: decode.name,
    fullName: decode.fullName
  }
};

const isValidToken = (token) => {
  let isValid = false;
  try {
    isValid = KJUR.jws.JWS.verify(token, PUB_KEY, ["RS256"]);
  } catch (err) {
  }
  return isValid;
};

const getParameterByName = (name, url) => {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};