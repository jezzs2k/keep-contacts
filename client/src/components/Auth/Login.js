import React, { useState, useContext, useEffect } from 'react';

import AlertContext from '../../context/Alert/AlertContext';
import AuthContext from '../../context/Auth/Authcontext';

const Login = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { error, login, isAuthenticated, clearError } = authContext;
  const { setAlert } = alertContext;

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid credentials') {
      setAlert(error, 'danger');
      clearError();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const { email, password } = user;
  const onchange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if ((email === '', password === '')) {
      setAlert('Please enter all fields', 'danger');
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <div>
      <h2 className='text-center mt-3'>
        Account <span className='text-primary'>Login</span>
      </h2>
      <form onSubmit={onSubmit}>
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

        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};
export default Login;
