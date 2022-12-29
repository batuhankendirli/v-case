import React from 'react';

const NoResult = ({text}) => {
  return (
    <div className="no-result">
      <h1 className="no-result-text">{text}</h1>
    </div>
  );
};

export default NoResult;
