import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import CharacterCard from '../components/CharacterCard';
import CharacterSkeleton from '../components/CharacterSkeleton';
import useFetch from '../hooks/useFetch';
import paginateArray from '../helpers/paginateArray';
import { Context } from '../Context';
import Skeleton from 'react-loading-skeleton';
import NoResult from '../components/NoResult';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const CharactersPage = () => {
  // If a filter's value is false, then the button it represents will be disabled.
  const [activeFilter, setActiveFilter] = useState({
    alive: false,
    dead: false,
    unknown: false,
  });

  // Incoming data could be an object, so I had to make it an array containing an object.
  const [normalizedData, setNormalizedData] = useState([]);

  // We're getting locationId for fetching the data
  const { locationId } = useParams();
  const { activePage, setActivePage } = useContext(Context);
  const [filtered, setFiltered] = useState([]);
  const [paginatedArr, setPaginatedArr] = useState([]);
  const [parent] = useAutoAnimate();
  const { data: locationData } = useFetch(
    `${import.meta.env.VITE_LOCATION_API}/${locationId}`
  );

  const lastIndexOfSlash = import.meta.env.VITE_CHARACTER_API.length;
  const [allIDs, setAllIDs] = useState('');

  useEffect(() => {
    // This returns => '12,13,14,16,23,26,42,55,76,79,...'
    setAllIDs(
      locationData?.residents
        ?.map((character) => character.slice(lastIndexOfSlash))
        .join(',')
    );
  }, [locationData]);

  const { data: characterData, loading } = useFetch(
    // We're getting all the character data with only one call.
    // 'https://rickandmortyapi.com/api/character/12,13,14,16,23,26,42,55,76,79,...'
    `${import.meta.env.VITE_CHARACTER_API}${allIDs}`
  );

  useEffect(() => {
    if (allIDs?.length === 0) {
      setNormalizedData([]);
    } else if (
      // Checking if data is an object({...}) and making it an array object ([{...}])
      !Array.isArray(characterData) &&
      typeof characterData === 'object' &&
      characterData !== null
    ) {
      setNormalizedData([characterData]);
    } else {
      setNormalizedData(characterData);
    }
  }, [characterData]);

  useEffect(() => {
    // When a filter changes, the filtered array will be updated.
    setFiltered(
      normalizedData.filter(
        (character) =>
          (activeFilter.alive && character.status === 'Alive') ||
          (activeFilter.dead && character.status === 'Dead') ||
          (activeFilter.unknown && character.status === 'unknown')
      )
    );
  }, [activeFilter]);

  useEffect(() => {
    setFiltered(normalizedData);
    setActiveFilter({
      alive: normalizedData.some((character) => character.status === 'Alive'),
      dead: normalizedData.some((character) => character.status === 'Dead'),
      unknown: normalizedData.some(
        (character) => character.status === 'unknown'
      ),
    });
  }, [normalizedData]);

  const handleFiltering = (btn) => {
    // To ignore the active page being stuck on an unachievable page after filtering, we're resetting it.
    setActivePage(1);
    setActiveFilter((prev) => ({
      ...prev,
      [btn]: !prev[btn],
    }));

    // Resets mobile slider
    parent.current.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    setPaginatedArr(
      paginateArray(filtered, import.meta.env.VITE_CHARACTERS_PER_PAGE)
    );
  }, [filtered]);

  return (
    <div className="characters">
      <div>
        <h3 className="characters-filter-text">Filter by status:</h3>
        {!loading ? (
          <div className="characters-buttons">
            <button
              className={`characters-buttons-btn btn-dead ${
                activeFilter.dead ? 'active' : ''
              }`}
              disabled={
                !normalizedData.some((character) => character.status === 'Dead')
              }
              onClick={() => handleFiltering('dead')}
            >
              <span className="characters-buttons-btn-dot color-dead" />
              Dead
            </button>
            <button
              className={`characters-buttons-btn btn-alive ${
                activeFilter.alive ? 'active' : ''
              }`}
              disabled={
                !normalizedData.some(
                  (character) => character.status === 'Alive'
                )
              }
              onClick={() => handleFiltering('alive')}
            >
              <span className="characters-buttons-btn-dot color-alive" />
              Alive
            </button>

            <button
              className={`characters-buttons-btn btn-unknown ${
                activeFilter.unknown ? 'active' : ''
              }`}
              disabled={
                !normalizedData.some(
                  (character) => character.status === 'unknown'
                )
              }
              onClick={() => handleFiltering('unknown')}
            >
              <span className="characters-buttons-btn-dot color-unknown" />
              Unknown
            </button>
          </div>
        ) : (
          <div className="characters-buttons-skeleton">
            <Skeleton className="characters-buttons-skeleton-item" />
            <Skeleton className="characters-buttons-skeleton-item" />
            <Skeleton className="characters-buttons-skeleton-item" />
          </div>
        )}

        <div className="characters-wrapper" ref={parent}>
          {loading && (
            <CharacterSkeleton
              cards={Number(import.meta.env.VITE_CHARACTERS_PER_PAGE)}
            />
          )}
          {paginatedArr[activePage - 1]?.map((character) => (
            <CharacterCard
              key={character.id}
              id={character.id}
              name={character.name}
              status={character.status}
              specie={character.species}
              img={character.image}
            />
          ))}
        </div>
        {!activeFilter.alive &&
          !activeFilter.dead &&
          !activeFilter.unknown &&
          !loading && <NoResult text="Sorry, we couldn't find any results." />}
      </div>
      {paginatedArr.length > 1 && (
        <Pagination
          currentPage={activePage}
          totalPage={paginatedArr.length}
          mobileSlide={parent.current}
        />
      )}
    </div>
  );
};

export default CharactersPage;
