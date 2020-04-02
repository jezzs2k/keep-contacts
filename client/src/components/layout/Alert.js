import React, { useContext } from 'react';

import AlertContext from '../../context/Alert/AlertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);

  const { alerts } = alertContext;

  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <div
        key='alert.id'
        className={`alert alert-${alert.type} text-center w-50 mr-auto ml-auto mt-4 `}>
        <i className='fa fa-info-circle'></i> {alert.msg}
      </div>
    ))
  );
};

export default Alert;
