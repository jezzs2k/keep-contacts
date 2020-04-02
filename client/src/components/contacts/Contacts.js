import React, { useContext, Fragment, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ContactContext from '../../context/contacts/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = () => {
  const contextContact = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contextContact;

  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length <= 0 && !loading) {
    return <h2 className='alert alert-warning'>You don't has contact ?</h2>;
  }

  return (
    <Fragment>
      {contacts !== null ? (
        <TransitionGroup>
          {filtered === null
            ? contacts.map((contact, i) => (
                <CSSTransition
                  key={contact._id}
                  timeout={300}
                  classNames='item'>
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : filtered.map((contact, i) => (
                <CSSTransition
                  key={contact._id}
                  timeout={300}
                  classNames='item'>
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
