import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../Context';

const CharacterCard = ({ id, name, img, status, specie }) => {
  const { setActivePage } = useContext(Context);

  const handleClick = () => {
    setActivePage(1);
  };

  const { locationId } = useParams();
  return (
    <Link
      to={`/location/${locationId}/character/${id}`}
      className="character-card"
      onClick={handleClick}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          marginBottom: '1.2rem',
          display: 'flex',
        }}
      >
        <img
          src={img}
          alt={`Image of ${name}`}
          className="character-card-img"
        />
      </div>
      <h1 className="character-card-name">{name}</h1>
      <div className="character-card-wrapper">
        <span
          className={`character-card-wrapper-dot ${
            status === 'Alive'
              ? 'color-alive'
              : status === 'Dead'
              ? 'color-dead'
              : 'color-unknown'
          }`}
        />
        <h3 className="character-card-wrapper-text">
          {status} - {specie}
        </h3>
      </div>
    </Link>
  );
};

export default CharacterCard;
