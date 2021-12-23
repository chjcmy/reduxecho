import {
  CLEAR_ERROR_FAILURE,
  CLEAR_ERROR_REQUEST,
  CLEAR_ERROR_SUCCESS,
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

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  errorMsg: '',
  successMsg: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        errorMsg: '',
        isLoading: true
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        errorMsg: ''
      };
    case LOGOUT_FAILURE:
    case LOGIN_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        ...action.payload,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        errorMsg: ''
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        ...action.payload,
        token: null,
        isAuthenticated: true,
        isLoading: false,
        errorMsg: ''
      };
    case USER_LOADING_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADING_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case USER_LOADING_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false
      };
    case CLEAR_ERROR_REQUEST:
      return {
        ...state,
        errorMsg: null
      };
    case CLEAR_ERROR_SUCCESS:
      return {
        ...state,
        errorMsg: null
      };
    case CLEAR_ERROR_FAILURE:
      return {
        ...state,
        errorMsg: null
      };
    default:
      return state;
  }
};

export default authReducer;
