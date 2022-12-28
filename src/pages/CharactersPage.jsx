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
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState({
    alive: false,
    dead: false,
    unknown: false,
  });
  const { locationId } = useParams();
  const { activePage } = useContext(Context);
  const [filtered, setFiltered] = useState([]);
  const [parent] = useAutoAnimate();

  const { data: allCharacters } = useFetch(
    `${import.meta.env.VITE_LOCATION_API}/${locationId}`
  );

  const paginatedArr = paginateArray(
    allCharacters?.residents,
    import.meta.env.VITE_CHARACTERS_PER_PAGE
  );
  const getAllCharacters = async (pageNum) => {
    setLoading(true);
    let promises = [];
    paginatedArr?.[pageNum - 1]?.map((character) => {
      promises.push(fetch(character).then((response) => response.json()));
    });

    await Promise.all(promises).then((data) => {
      setCharacters(data);
      setFiltered(data);
      setActiveFilter({
        alive: data.some((character) => character.status === 'Alive'),
        dead: data.some((character) => character.status === 'Dead'),
        unknown: data.some((character) => character.status === 'unknown'),
      });
      setLoading(false);
    });
  };

  useEffect(() => {
    setFiltered([]);
    getAllCharacters(activePage);
  }, [allCharacters, activePage]);

  const handleFiltering = (btn) => {
    setActiveFilter((prev) => ({
      ...prev,
      [btn]: !prev[btn],
    }));
  };

  useEffect(() => {
    setFiltered(
      characters.filter(
        (character) =>
          (activeFilter.alive && character.status === 'Alive') ||
          (activeFilter.dead && character.status === 'Dead') ||
          (activeFilter.unknown && character.status === 'unknown')
      )
    );
  }, [activeFilter]);

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
                !characters.some((character) => character.status === 'Dead')
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
                !characters.some((character) => character.status === 'Alive')
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
                !characters.some((character) => character.status === 'unknown')
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
          {filtered.map((character) => (
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
          !loading && <NoResult />}
      </div>
      {paginatedArr.length > 1 && (
        <Pagination currentPage={activePage} totalPage={paginatedArr.length} />
      )}
    </div>
  );
};

export default CharactersPage;
