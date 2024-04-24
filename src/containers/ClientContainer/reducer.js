import { produce } from 'immer';
import {
  SET_ACCESS_TOKEN,
  SET_LOGGED_IN_USER,
  SET_REFRESH_TOKEN,
} from './constants';

export const initialState = {
  accessToken: null,
  refreshToken: null,
  loggedInUser: null,
};

export const persistedKey = ['accessToken', 'refreshToken', 'loggedInUser'];

const clientReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ACCESS_TOKEN:
        draft.accessToken = action.accessToken;
        break;
      case SET_REFRESH_TOKEN:
        draft.refreshToken = action.refreshToken;
        break;
      case SET_LOGGED_IN_USER:
        draft.loggedInUser = action.loggedInUser;
        break;
      default:
        break;
    }
  });

export default clientReducer;
