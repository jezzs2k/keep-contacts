import React, { useReducer } from 'react';
import axios from 'axios';

import ContactContext from './contactContext';
import ContactReducer from './contactReducer';

import {
  GET_CONTACTs,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTs,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //GET CONTACTS
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');

      dispatch({
        type: GET_CONTACTs,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };

  //Add Contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg
      });
    }
  };
  //Delete Contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({
        type: DELETE_CONTACT,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };
  //SET CURRENT
  const setCurrent = contact => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    });
  };

  //REMOVE CURRENT
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  //Update Contact
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      await axios.put(`/api/contacts/${contact._id}`, contact, config);

      dispatch({
        type: UPDATE_CONTACT,
        payload: contact
      });
    } catch (error) {
      dispatch({
        type: UPDATE_CONTACT,
        payload: contact
      });
    }
  };

  //Filter Contact
  const filterContact = text => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text
    });
  };

  //Cleart Contact
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };

  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTs
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter,
        getContacts,
        clearContacts
      }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
