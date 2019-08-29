import React from 'react';

import Header from './Header';

const AppFrame = ({ ...prop }) => {
  return (
    <div className="wrapper">
      <Header />
      <div className="form-content">
        <div>{prop.body}</div>
      </div>
    </div>
  );
};

export default AppFrame;
