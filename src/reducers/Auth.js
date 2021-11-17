import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  SET_AUTH_STATE,
  VERIFY_DEVICE,
  VERIFY_USER,
  GET_USER,
} from '../actions/Auth';

const initialState = {
  error: '',
  device_id: null,
  isDeviceVerified: null,
  isAuthenticated: null,
  token: null,
  user: null,
  isOtpSent: null,
  redirect: null,
};

const auth = async (state = initialState, action) => {
  let {type, data, payload} = action;

  switch (type) {
    case LOGIN + '_SUCCESS':
      await AsyncStorage.setItem('user', JSON.stringify(data));
      console.log('TOKRN', data.token);
      return {
        ...state,
        isAuthenticated: true,
        token: data.token,
        user: data,
        redirect: true,
      };
    case LOGIN + '_FAILURE':
      return {
        ...state,
        isAuthenticated: null,
      };
    case REGISTER + '_SUCCESS':
      console.log('SUccess', {payload});
      return {
        ...state,
        isOtpSent: true,
        user: payload,
      };
    case REGISTER + '_FAILURE':
      return {
        ...state,
        isOtpSent: null,
        error: 'ERROR Sending OTP',
      };
    case VERIFY_USER + '_SUCCESS':
      return {
        ...state,
        isAuthenticated: null,
        token: null,
        redirect: true,
      };
    case VERIFY_USER + '_FAILURE':
      return {
        ...state,
        isAuthenticated: null,
        user: null,
        token: null,
        error: 'ERROR Sending OTP',
      };
    case VERIFY_DEVICE + '_SUCCESS':
      return {
        ...state,
        device_id: data.device_id,
        isDeviceVerified: true,
      };
    case VERIFY_DEVICE + '_FAILURE':
      return {
        ...state,
        isDeviceVerified: null,
      };
    case LOGOUT:
      console.log('ll');
      AsyncStorage.removeItem('user');
      return {
        ...state,
        device_id: null,
        isDeviceVerified: null,
        isAuthenticated: null,
        token: null,
        user: null,
        isOtpSent: null,
        redirect: true,
      };
    default:
      return state;
  }
};

export default auth;
