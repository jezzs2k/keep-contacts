import React, { Fragment, useContext } from 'react';

import ContactContext from '../../context/contacts/contactContext';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);

  const { deleteContact, setCurrent, clearCurrent } = contactContext;
  const { _id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <Fragment>
      <div className='card' style={{ width: '25rem', marginBottom: '5px' }}>
        <div className='card-body'>
          <div
            className='card-title'
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr'
            }}>
            <span>Name: {name}</span> {'   '}{' '}
            <span
              className={
                'badge' +
                (type === 'professional' ? ' badge-success' : ' badge-primary')
              }>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          </div>
          <ul className='list-group'>
            {email && (
              <li className='list-group-item'>
                <i className='fa fa-envelope mr-2'></i>
                {email}
              </li>
            )}
            {phone && (
              <li className='list-group-item'>
                <i className='fa fa-phone mr-2'></i>
                {phone}
              </li>
            )}
          </ul>
          <p
            style={{
              display: 'flex'
            }}>
            <button
              className='btn btn-dark btn-sm'
              style={{ flexGrow: '1' }}
              onClick={() => {
                setCurrent(contact);
              }}>
              Edit
            </button>
            <button
              className='btn btn-danger btn-sm'
              onClick={onDelete}
              style={{ flexGrow: '1' }}>
              Delete
            </button>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default ContactItem;
