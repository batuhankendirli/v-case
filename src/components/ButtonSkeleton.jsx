import Skeleton from 'react-loading-skeleton';

const ButtonSkeleton = ({ buttons }) => {
  return Array(buttons)
    .fill(0)
    .map((_, index) => (
      <div className="location-card-skeleton" key={index}>
        <h2 className="location-card-skeleton-title">
          <Skeleton />
        </h2>

        <div className="location-card-skeleton-texts">
          <Skeleton />
        </div>
      </div>
    ));
};

export default ButtonSkeleton;
