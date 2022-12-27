import React from 'react';

const LocationCard = ({ id, name, type, dimension, residentCount }) => {
  const handleClick = () => {
    console.log(id);
  };

  return (
    <div className="location-card" onClick={handleClick}>
      <h2 className="location-card-title">{name}</h2>

      <div className="location-card-wrapper">
        <div className="location-card-wrapper-left">
          <h4 className="location-card-wrapper-left-text">Type</h4>
          <h4 className="location-card-wrapper-left-text">Dimension</h4>
          <h4 className="location-card-wrapper-left-text">Resident count</h4>
        </div>
        <div className="location-card-wrapper-right">
          <h4 className="location-card-wrapper-right-text">: {type}</h4>
          <h4 className="location-card-wrapper-right-text">
            : {dimension === 'unknown' ? '-' : dimension}
          </h4>
          <h4 className="location-card-wrapper-right-text">
            : {residentCount}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
