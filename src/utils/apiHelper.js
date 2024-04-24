import { setAccessTokenAction, setRefreshTokenAction } from '../containers/ClientContainer/actions';
import store from '../configureStore';
import { toast } from 'react-toastify';

export const requestInterceptor = (req) => {
  const { accessToken } = store.getState().client;

  const headers = {
    'Content-type': 'application/json',
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  req.headers = headers;
  return req;
};

export const responseInterceptor = (res) => {
  const { dispatch } = store;
  const response = res.data;
  if (response.accessToken) {
    const { accessToken } = response;
    dispatch(setAccessTokenAction(accessToken));
  }

  if (response.refreshToken) {
    const { refreshToken } = response;
    dispatch(setRefreshTokenAction(refreshToken));
  }

  return response;
};

const reauthenticate = () => {
//   const { accessToken, reauthenticated } = store.getState().app;
//   const { dispatch } = store;

// //   if (accessToken && !reauthenticated) {
// //     dispatch(getNewAccessTokenAction());
// //   }
};

export const errorInterceptor = (err) => {
    console.log(err)
  if (err.response) {
    const { status } = err.response;
    if (status === 401) {
      reauthenticate();
      err.message = err.message || 'Unauthorized!';
      // toastError(err.message);
    } else {
      // 400 <= err.status but not 401
      err.message = err.response.data?.message || 'Oops, Something went wrong!';
      if (err.message === 'Refresh token is invalid') return err;
      toast.error(err.message);
    }
  } else {
    err.message = 'Oops, Something went wrong!';
  }
  return err;
};
