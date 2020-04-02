import React, { Fragment, useState, useContext, useEffect } from 'react';

import ContactContext from '../../context/contacts/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, current, clearCurrent, updateContact } = contactContext;
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    }
  }, [current]);

  const { name, email, phone, type } = contact;

  const onchange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const clearAll = e => {
    e.preventDefault();
    clearCurrent();
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    });
  };

  const onsubmit = e => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }

    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    });
  };

  return (
    <Fragment>
      <h2 className='text-center text-primary'>
        {' '}
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <form>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            className='form-control'
            id='name'
            placeholder='Name'
            name='name'
            value={name}
            onChange={onchange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            className='form-control'
            id='emali'
            placeholder='Email'
            name='email'
            value={email}
            onChange={onchange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='phone'>Phone</label>
          <input
            type='text'
            className='form-control'
            id='phone'
            placeholder='Phone Number'
            name='phone'
            value={phone}
            onChange={onchange}
          />
        </div>
        <div className='form-group'>
          <h5>Contact Type</h5>
          <input
            type='radio'
            name='type'
            value='personal'
            checked={type === 'personal'}
            onChange={onchange}
          />
          {'  '}Personal
          <input
            type='radio'
            name='type'
            className='ml-2'
            value='professional'
            checked={type === 'professional'}
            onChange={onchange}
          />
          {'  '}Professional
        </div>
        <button
          className='btn btn-outline-primary btn-block'
          onClick={onsubmit}>
          {current ? 'Update Contact' : 'Add Contact'}
        </button>
        {current && (
          <button
            className='btn btn-outline-linght btn-block'
            onClick={clearAll}>
            Clear
          </button>
        )}
      </form>
    </Fragment>
  );
};
export default ContactForm;
