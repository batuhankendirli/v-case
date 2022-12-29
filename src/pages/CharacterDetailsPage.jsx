import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import OtherCharacters from '../components/OtherCharacters';
import Pagination from '../components/Pagination';
import paginateArray from '../helpers/paginateArray';
import { Context } from '../Context';
import OtherCharacterSkeleton from '../components/OtherCharacterSkeleton';
import MainCharacterSkeleton from '../components/MainCharacterSkeleton';
import NoResult from '../components/NoResult';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const CharacterDetailsPage = () => {
  const { characterId, locationId } = useParams();
  const lastIndexOfSlash = import.meta.env.VITE_CHARACTER_API.length;
  const [allIDs, setAllIDs] = useState('');
  const [normalizedData, setNormalizedData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [parent] = useAutoAnimate();

  const { data: locationData } = useFetch(
    `${import.meta.env.VITE_LOCATION_API}/${locationId}`
  );
  const { activePage } = useContext(Context);

  useEffect(() => {
    setAllIDs(
      locationData?.residents
        ?.map((character) => character.slice(lastIndexOfSlash))
        .join(',')
    );
  }, [locationData]);

  const { data: characterData, loading } = useFetch(
    `${import.meta.env.VITE_CHARACTER_API}${allIDs}`
  );

  useEffect(() => {
    if (allIDs?.length === 0) {
      setNormalizedData([]);
    } else if (
      !Array.isArray(characterData) &&
      typeof characterData === 'object' &&
      characterData !== null
    ) {
      setNormalizedData([characterData]);
    } else {
      setNormalizedData(() => {
        const mainCharacter = characterData.find(
          (character) => character.id === Number(characterId)
        );
        return characterData.filter(
          (character) => character.status === mainCharacter.status
        );
      });
    }
  }, [characterData]);

  useEffect(() => {
    setPaginatedData(
      paginateArray(
        normalizedData.filter(
          (character) => character.id !== Number(characterId)
        ),
        import.meta.env.VITE_OTHER_CHARACTERS_PER_PAGE
      )
    );
  }, [normalizedData, characterId]);

  return (
    <div className="details">
      <div className="character-details">
        {loading ? (
          <MainCharacterSkeleton />
        ) : (
          <div className="character-details-main">
            <img
              src={
                normalizedData.find(
                  (character) => character.id === Number(characterId)
                )?.image
              }
              alt={`Image of ${
                normalizedData.find(
                  (character) => character.id === Number(characterId)
                )?.name
              }`}
              className="character-details-main-img"
            />
            <h1 className="character-details-main-name">
              {
                normalizedData.find(
                  (character) => character.id === Number(characterId)
                )?.name
              }
            </h1>
            <div className="character-details-main-texts">
              <div className="character-details-main-texts-left">
                <h3 className="character-details-main-texts-left-status">
                  <span
                    className={`character-details-main-texts-left-status-dot ${
                      normalizedData.find(
                        (character) => character.id === Number(characterId)
                      )?.status === 'Alive'
                        ? 'color-alive'
                        : normalizedData.find(
                            (character) => character.id === Number(characterId)
                          )?.status === 'Dead'
                        ? 'color-dead'
                        : 'color-unknown'
                    } `}
                  />
                  {
                    normalizedData.find(
                      (character) => character.id === Number(characterId)
                    )?.status
                  }{' '}
                  -{' '}
                  {
                    normalizedData.find(
                      (character) => character.id === Number(characterId)
                    )?.species
                  }
                </h3>
                <h3 className="character-details-main-texts-left-origin">
                  {
                    normalizedData.find(
                      (character) => character.id === Number(characterId)
                    )?.origin.name
                  }
                </h3>
              </div>
              <h3 className="character-details-main-texts-type">
                <i>
                  {normalizedData.find(
                    (character) => character.id === Number(characterId)
                  )?.type || 'unknown'}{' '}
                  -{' '}
                  {
                    normalizedData.find(
                      (character) => character.id === Number(characterId)
                    )?.gender
                  }
                </i>
              </h3>
            </div>
          </div>
        )}
        <div className="character-details-other">
          <h1 className="character-details-other-heading">Other Characters</h1>
          <div className="character-details-other-wrapper" ref={parent}>
            {loading && (
              <OtherCharacterSkeleton
                cards={Number(import.meta.env.VITE_OTHER_CHARACTERS_PER_PAGE)}
              />
            )}

            {paginatedData[activePage - 1]?.map((character) => (
              <OtherCharacters
                key={character.id}
                id={character.id}
                name={character.name}
                img={character.image}
                origin={character.origin?.name}
                type={character.type || 'unknown'}
                gender={character.gender}
                locationId={locationId}
              />
            ))}
          </div>
          {!paginatedData[0]?.length && !loading && (
            <NoResult text="There are no other characters." />
          )}
        </div>
      </div>
      {paginatedData.length > 1 && (
        <Pagination currentPage={activePage} totalPage={paginatedData.length} />
      )}
    </div>
  );
};

export default CharacterDetailsPage;
