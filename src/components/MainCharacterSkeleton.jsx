import Skeleton from 'react-loading-skeleton';

const MainCharacterSkeleton = () => {
  return (
    <div className="main-card-skeleton">
      <Skeleton className="main-card-skeleton-img" />
      <h1>
        <Skeleton
          borderRadius={'.6rem'}
          style={{ marginBottom: '.6rem' }}
          width="20rem"
        />
      </h1>
      <div
        className="character-card-skeleton-text"
        style={{ marginBottom: '.6rem' }}
      >
        <span>
          <Skeleton borderRadius={'50%'} height="16px" width="16px" />
        </span>
        <h4>
          <Skeleton borderRadius={'.5rem'} height="16px" />
        </h4>
      </div>
      <h4>
        <Skeleton borderRadius={'.5rem'} width="15rem" />
      </h4>
    </div>
  );
};

export default MainCharacterSkeleton;
