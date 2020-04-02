import React, { useEffect, useRef, useContext } from 'react';

import ContactContext from '../../context/contacts/contactContext';

const ContactFilter = () => {
  const text = useRef('');
  const contacContext = useContext(ContactContext);

  const { filterContact, clearFilter, filtered } = contacContext;
  const onchange = e => {
    if (text.current.value !== '') {
      filterContact(e.target.value);
    } else {
      clearFilter();
    }
  };

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });
  return (
    <form>
      <div className='form-group'>
        <input
          ref={text}
          className='form-control'
          type='text'
          placeholder='Filter contact ....'
          onChange={onchange}
        />
      </div>
    </form>
  );
};
export default ContactFilter;
