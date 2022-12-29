import { Link } from 'react-router-dom';

const OtherCharacters = ({
  locationId,
  id,
  name,
  img,
  origin,
  type,
  gender,
}) => {
  const handleClick = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <Link
      to={`/location/${locationId}/character/${id}`}
      className="other-card"
      onClick={handleClick}
    >
      <img src={img} alt={`Image of ${name}`} className="other-card-img" />
      <div className="other-card-texts">
        <h2 className="other-card-texts-name">{name}</h2>
        <h3 className="other-card-texts-origin">{origin}</h3>
        <h3 className="other-card-texts-type">
          <i>
            {type} - {gender}
          </i>
        </h3>
      </div>
    </Link>
  );
};

export default OtherCharacters;
