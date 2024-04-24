import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectClient = (state) => state.client || initialState;

const selectAccessToken = createSelector(selectClient, (state) => state.accessToken);
const selectRefreshToken = createSelector(selectClient, (state) => state.refreshToken);
const selectLoggedInUser = createSelector(selectClient, (state) => state.loggedInUser);

export {
  selectAccessToken,
  selectRefreshToken,
  selectLoggedInUser
};
