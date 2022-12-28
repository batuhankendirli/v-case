import Skeleton from 'react-loading-skeleton';

const CharacterSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div className="character-card-skeleton" key={index}>
        <Skeleton className="character-card-skeleton-img" />

        <h1>
          <Skeleton borderRadius={'.6rem'} />
        </h1>
        <div className="character-card-skeleton-text">
          <span>
            <Skeleton borderRadius={'50%'} height="16px" width="16px" />
          </span>
          <h4>
            <Skeleton borderRadius={'.5rem'} height="16px" />
          </h4>
        </div>
      </div>
    ));
};

export default CharacterSkeleton;
