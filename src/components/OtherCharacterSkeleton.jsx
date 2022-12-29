import Skeleton from 'react-loading-skeleton';

const OtherCharacterSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div className="other-card-skeleton" key={index}>
        <Skeleton width="90px" height="90px" borderRadius="15px" />
        <div
          style={{
            alignSelf: 'center',
          }}
        >
          <h1>
            <Skeleton borderRadius="6px" />
          </h1>
          <h3>
            <Skeleton borderRadius="5px" />
          </h3>
          <h3>
            <Skeleton borderRadius="5px" />
          </h3>
        </div>
      </div>
    ));
};

export default OtherCharacterSkeleton;
