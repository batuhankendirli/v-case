import { useParams } from 'react-router-dom';

const CharacterDetailsPage = () => {
  const { characterId, locationId } = useParams();
  console.log(locationId);
  return <div>CharacterDetailsPage</div>;
};

export default CharacterDetailsPage;
