import { SET_ACCESS_TOKEN, SET_LOGGED_IN_USER, SET_REFRESH_TOKEN } from "./constants";

export function setAccessTokenAction(accessToken) {
  return {
    type: SET_ACCESS_TOKEN,
    accessToken,
  }
}

export function setRefreshTokenAction(refreshToken) {
  return {
    type: SET_REFRESH_TOKEN,
    refreshToken,
  }
}

export function setLoggedInUserAction(loggedInUser) {
  return {
    type: SET_LOGGED_IN_USER,
    loggedInUser,
  }
}