import { call, put, takeLatest } from "redux-saga/effects";
import { LOGIN, REGISTER } from "./constants";
import { loginApi, registerApi } from "../../domain/api";
import { setLoggedInUserAction } from "../../containers/ClientContainer/actions";

export function* doLogin({ username, password, cbSuccess, cbFailure }) {
  try {
    const result = yield call(loginApi, { username, password });
    console.log(result)

    yield put(setLoggedInUserAction(result.data));

    cbSuccess && cbSuccess(result);
  } catch (error) {
    cbFailure && cbFailure(error.message);
  }
}
export function* doRegister({ username, password, cbSuccess, cbFailure }) {
  try {
    const result = yield call(registerApi, { username, password });

    yield put(setLoggedInUserAction(result.data));

    cbSuccess && cbSuccess(result);
  } catch (error) {
    cbFailure && cbFailure(error.message);
  }
}


export default function* loginSaga() {
  yield takeLatest(LOGIN, doLogin);
  yield takeLatest(REGISTER, doRegister);
}
