import axios from 'axios';
import {LOGIN, REGISTER, VERIFY_DEVICE, VERIFY_USER} from '../actions/Auth';
import {takeLatest, put, fork} from 'redux-saga/effects';
import AxiosInstance from '../Axios';

const baseURL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = baseURL;

function* loginFlow() {
  yield takeLatest(LOGIN, login);
}

function* verifyDeviceFlow() {
  yield takeLatest(VERIFY_DEVICE, verifyDevice);
}

function* registerFlow() {
  yield takeLatest(REGISTER, register);
}

function* verifyUserFlow() {
  yield takeLatest(VERIFY_USER, verifyUser);
}

function* login({payload}) {
  try {
    const resp = yield AxiosInstance.post('/login', payload);
    console.log('err', {resp});

    if (resp && resp.status === 200) {
      yield put({
        type: LOGIN + '_SUCCESS',
        data: resp.data,
      });
    }
  } catch (err) {
    console.log('err', {err});
    if (err.response?.status === 401) {
      yield put({
        type: LOGIN + '_FAILURE',
        data: 'Invalid email or password',
      });
    }
  }
}

function* verifyDevice({payload}) {
  try {
    const resp = yield AxiosInstance.post('/verifyDevice', payload);

    if (resp && resp.status === 200) {
      console.log('RESPPP', {resp});
      yield put({
        type: VERIFY_DEVICE + '_SUCCESS',
        data: resp.data,
      });
    }
  } catch (err) {
    if (err.response?.status === 401) {
      yield put({
        type: VERIFY_DEVICE + '_FAILURE',
        data: 'Invalid Device ID',
      });
    }
  }
}

function* register({payload}) {
  try {
    const resp = yield AxiosInstance.post('/register', payload);
    console.log('RESPPP', {resp});
    if (resp && resp.status === 200) {
      yield put({
        type: REGISTER + '_SUCCESS',
        data: resp.data,
        payload: payload,
      });
    }
  } catch (err) {
    console.log('RESPPP', {err}, {payload});
    if (err.response?.status === 401) {
      yield put({
        type: REGISTER + '_FAILURE',
        data: 'Register Fail',
      });
    }
  }
}

function* verifyUser({payload}) {
  try {
    const resp = yield AxiosInstance.post('/verification', payload);

    if (resp && resp.status === 200) {
      yield put({
        type: VERIFY_USER + '_SUCCESS',
        data: resp.data,
        payload: payload,
      });
    }
  } catch (err) {
    if (err.response?.status === 401) {
      yield put({
        type: VERIFY_USER + '_FAILURE',
        data: 'Verification Fail',
      });
    }
  }
}

export default [
  fork(loginFlow),
  fork(verifyDeviceFlow),
  fork(registerFlow),
  fork(verifyUserFlow),
];
