import Skeleton from 'react-loading-skeleton';

const LocationSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div className="location-card-skeleton" key={index}>
        <h2 className="location-card-skeleton-title">
          <Skeleton />
        </h2>

        <div className="location-card-skeleton-texts">
          <h4>
            <Skeleton count={3} />
          </h4>
          <h4>
            <Skeleton count={3} />
          </h4>
        </div>
      </div>
    ));
};

export default LocationSkeleton;
