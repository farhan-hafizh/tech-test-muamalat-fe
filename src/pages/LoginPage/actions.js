import { LOGIN, REGISTER } from "./constants";

export function loginAction(username, password, cbSuccess, cbFailed) {
  return {
    type: LOGIN,
    username,
    password,
    cbSuccess,
    cbFailed,
  };
}

export function registerAction(username, password, cbSuccess, cbFailed) {
  return {
    type: REGISTER,
    username,
    password,
    cbSuccess,
    cbFailed,
  };
}
