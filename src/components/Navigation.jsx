import React from 'react';

const Navigation = ({ goBack }) => {
  return (
    <nav className="navigation">
      <img
        src="/assets/Logo.svg"
        alt="Rick and Morty logo"
        className="navigation-logo"
      />

      {goBack && (
        <span className="navigation-arrow">
          <img src="/assets/NavBack.svg" alt="Navigation back" title="Back" />
        </span>
      )}
    </nav>
  );
};

export default Navigation;
