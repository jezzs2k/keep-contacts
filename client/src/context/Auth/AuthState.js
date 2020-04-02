import React, { useReducer } from 'react';
import axios from 'axios';

import AuthContext from './Authcontext';
import AuthReducer from './AuthReducer';
import SetToken from '../../utils/SetToken';

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

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    loading: null,
    isAuthenticated: null,
    error: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load User
  const loadUser = async () => {
    //@ TODO - LoadToken into golbal headers

    if (localStorage.token) {
      SetToken(localStorage.token);
    }

    try {
      const res = await axios.get('http://localhost:5000/api/auth');
      dispatch({
        type: USER_LOADER,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };

  //Register User
  const register = async FormData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(
        'http://localhost:5000/api/users',
        FormData,
        config
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  //Login User
  const login = async FormData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth',
        FormData,
        config
      );

      dispatch({
        type: LOGIN_SECCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.msg
      });
    }
  };

  //Logout
  const logout = () => {
    dispatch({
      type: LOGOUT
    });
  };

  //clear Errors
  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        register,
        clearError,
        loadUser,
        login,
        logout
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
