import React, { useState, useContext, useEffect } from 'react';

import AlertContext from '../../context/Alert/AlertContext';
import AuthContext from '../../context/Auth/Authcontext';

const Register = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearError, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'User is already exits') {
      setAlert(error, 'danger');
      clearError();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;
  const onchange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if ((name === '', password === '', password === '', email === '')) {
      setAlert('Please enter all fields', 'danger');
    } else if (password2 !== password) {
      setAlert('Please Check password again  !!', 'danger');
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <div>
      <h2 className='text-center mt-3'>
        Account <span className='text-primary'>Register</span>
      </h2>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            className='form-control'
            id='name'
            type='text'
            name='name'
            value={name}
            placeholder='Username....'
            onChange={onchange}
            required
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            className='form-control'
            id='email'
            type='email'
            name='email'
            value={email}
            placeholder='Email....'
            onChange={onchange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            className='form-control'
            id='password'
            type='password'
            name='password'
            value={password}
            placeholder='Password....'
            onChange={onchange}
            required
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password-again'>Comfirm Password</label>
          <input
            className='form-control'
            id='password-again'
            type='password'
            name='password2'
            value={password2}
            placeholder='Comfirm Password...'
            onChange={onchange}
            required
            minLength='6'
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};
export default Register;
