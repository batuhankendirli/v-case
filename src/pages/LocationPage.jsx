import LocationCard from '../components/LocationCard';
import Pagination from '../components/Pagination';
import useFetch from '../hooks/useFetch';
import { Context } from '../Context';
import { useContext } from 'react';
import LocationSkeleton from '../components/LocationSkeleton';

const LocationPage = () => {
  const { activePage } = useContext(Context);
  const { data: locationData, loading } = useFetch(
    `${import.meta.env.VITE_LOCATION_API}?page=${activePage}`
  );

  return (
    <div className="location">
      <div className="location-wrapper">
        {loading ? (
          <LocationSkeleton
            cards={activePage === locationData?.info?.pages ? 9 : 20}
          />
        ) : (
          <>
            {locationData?.results.map((item) => (
              <LocationCard
                id={item.id}
                name={item.name}
                type={item.type}
                residentCount={item.residents.length}
                dimension={item.dimension}
                key={item.id}
              />
            ))}
          </>
        )}
      </div>
      <Pagination
        currentPage={activePage}
        totalPage={locationData?.info?.pages}
      />
    </div>
  );
};

export default LocationPage;
