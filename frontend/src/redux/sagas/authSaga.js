import axios from 'axios';
import {
  call, put, takeEvery, all, fork
} from 'redux-saga/effects';
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  USER_LOADING_FAILURE,
  USER_LOADING_REQUEST,
  USER_LOADING_SUCCESS
} from '../types';
import { push } from 'connected-react-router';

const loginUserAPI = (loginData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axios.post('/login', loginData, config);
};

function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);
    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    yield put({
      type: LOGIN_FAILURE,
      payload: e.response
    });
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}
function* logout() {
  try {
    yield put({
      type: LOGOUT_SUCCESS
    });
    yield put(push('/'));
  } catch (e) {
    yield put({
      type: LOGOUT_FAILURE
    });
  }
}

function* watchLogout() {
  yield takeEvery(LOGOUT_REQUEST, logout);
}

const userLoadingAPI = (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
  return axios.get('/re/login', config);
};

function* userLoading(action) {
  try {
    const result = yield call(userLoadingAPI, action.payload);
    yield put({
      type: USER_LOADING_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    yield put({
      type: USER_LOADING_FAILURE,
      payload: e.response
    });
  }
}

function* watchuserloading() {
  yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogout),
    fork(watchuserloading)
  ]);
}
