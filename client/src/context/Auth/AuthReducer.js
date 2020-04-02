import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADER,
  AUTH_ERROR,
  LOGIN_SECCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false
      };
    case LOGIN_SECCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload.token,
        isAuthenticated: true,
        loading: false
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
        user: null
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      break;
  }
};
