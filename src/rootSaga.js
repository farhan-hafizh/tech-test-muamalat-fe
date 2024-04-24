import { all } from 'redux-saga/effects';
import loginSaga from './pages/LoginPage/saga';

export default function* rootSaga() {
  yield all([
    loginSaga()
  ]);
}
