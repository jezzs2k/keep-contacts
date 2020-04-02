import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/Auth/Authcontext';
import ContactContext from '../../context/contacts/contactContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const { clearContacts } = useContext(ContactContext);

  const { logout, isAuthenticated, user } = authContext;

  const onLogout = () => {
    clearContacts();
    logout();
  };

  const authLinks = (
    <Fragment>
      <li className='nav-item'>
        <Link className='nav-link' to='#'>
          Hello <span className='text-warning'>{user && user.name}</span>
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/'>
          Home
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/about'>
          About
        </Link>
      </li>

      <li className='nav-item'>
        <Link className='nav-link' onClick={onLogout} to='#'>
          Logout
        </Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className='nav-item'>
        <Link className='nav-link' to='/login'>
          Login
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/register'>
          Register
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className='navbar bg-primary'>
      <div className='container'>
        <h3>
          <i className={icon}></i> {title}
        </h3>
        <ul className='navbar-nav'>
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Contacts Keeper',
  icon: 'fa fa-address-book'
};

export default Navbar;
