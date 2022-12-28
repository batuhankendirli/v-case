import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../Context';

const Navigation = ({ goBack }) => {
  const { setActivePage } = useContext(Context);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
    setActivePage(1);
  };

  return (
    <nav className="navigation">
      <Link
        to={'/'}
        onClick={() => setActivePage(1)}
        style={{ display: 'inherit' }}
      >
        <img
          src="/assets/Logo.svg"
          alt="Rick and Morty logo"
          className="navigation-logo"
        />
      </Link>

      {goBack && (
        <button className="navigation-arrow" onClick={handleGoBack}>
          <img src="/assets/NavBack.svg" alt="Navigation back" title="Back" />
        </button>
      )}
    </nav>
  );
};

export default Navigation;
