import LocationCard from '../components/LocationCard';
import Pagination from '../components/Pagination';
import useFetch from '../hooks/useFetch';
import { Context } from '../Context';
import { useContext } from 'react';
import LocationSkeleton from '../components/LocationSkeleton';

const LocationPage = () => {
  const { activeLocationPage } = useContext(Context);
  const { data: locationData, loading } = useFetch(
    `${import.meta.env.VITE_LOCATION_API}?page=${activeLocationPage}`
  );

  return (
    <div className="location">
      <div className="location-wrapper">
        {loading ? (
          <LocationSkeleton
            cards={activeLocationPage === locationData?.info?.pages ? 9 : 20}
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
        currentPage={activeLocationPage}
        totalPage={locationData?.info?.pages}
      />
    </div>
  );
};

export default LocationPage;
