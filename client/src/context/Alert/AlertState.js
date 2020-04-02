import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';

import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
  const intinalState = [];

  const [state, dispatch] = useReducer(AlertReducer, intinalState);

  const setAlert = (msg, type, Timeout = 5000) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { id, msg, type }
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id
      });
    }, Timeout);
  };
  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
