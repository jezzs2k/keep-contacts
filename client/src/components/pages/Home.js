import React, { Fragment, useContext, useEffect } from 'react';

import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/Auth/Authcontext';

import SetToken from '../../utils/SetToken';

if (localStorage.token) {
  SetToken(localStorage.token);
}

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <h1>Home</h1>
      <div className='row'>
        <div className='col-sm-6'>
          <ContactForm />
        </div>
        <div className='col-sm-6'>
          <ContactFilter />
          <Contacts />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
