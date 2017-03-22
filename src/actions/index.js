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
const PRIVATE_KEY = "-----BEGIN RSA PRIVATE KEY-----MIIBOAIBAAJAYS2ma8RmiLLVpVVLMWqAI/rmg1dTgTDkkqfIBWWJXidLyinmBC6/ky5in2FdodIVeHdwI6pP7IH4pEX4FbnxPwIDAQABAkBfak8pKSHzvoP/XgwCbSt8KHIFK80V4EfNp2fBxLxn8Lwu1CzygoJ02xZCNSpv6bLQN1pd+LpqNBBlrJMIyWghAiEAt5MN6C6rgoZph/GIY9lMDFhv+gcO6S4l5Kx7BSLILLsCIQCHhJ9Xm24+qN+8T6BOJvgwIyfNnVnBuaOxthUKENwnTQIgKXEmQ5M9ntLPQiRRwRDOLT9N0CkFwbhsT4psn0Ux4X8CIDASBC+gS8/gOVTj7dorCpiQr9rIuQD157HvA7GJX351AiBxY/BX+1ObVC4BBKOf8w0LTx3AShjyVKfYa/ERgo7WFg==-----END RSA PRIVATE KEY-----";

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