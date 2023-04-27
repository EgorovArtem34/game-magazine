import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BeatLoader } from 'react-spinners';
import { selectors, fetchGames } from '../slices/gamesSlice.js';

const EmptyGameList = () => (
  <div className="empty flex-container">
    No games are currently available. Please try again later
  </div>
);

const Loader = () => (
  <div className="loading flex-container">
    <span>Loading...</span>
    <BeatLoader color="#123abc" />
  </div>
);

const GameLists = () => {
  const dispatch = useDispatch();
  const games = useSelector(selectors.selectAll);
  const { hasMore, isLoading } = useSelector((state) => state.gamesSlice);
  useEffect(() => {
    if (games.length === 0 && hasMore) {
      dispatch(fetchGames());
    }
  }, [dispatch, games, hasMore]);
  if (games.length === 0 && !isLoading) {
    return <EmptyGameList />;
  }

  return (
    <InfiniteScroll
      dataLength={games.length}
      next={() => dispatch(fetchGames())}
      hasMore={hasMore}
      loader={Loader()}
    >
      <div className="cards">
        {games.map((game) => {
          const {
            background_image: backgroundImage,
            id, name, rating, released,
          } = game;
          return (
            <div className="card" key={id}>
              <div
                className="card-img"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              />
              <div className="card-info">
                <div className="card-name">
                  <p>{name}</p>
                  <div className="card-rating">{rating}</div>
                </div>
                <span>
                  Дата выхода:
                  {' '}
                  {released}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </InfiniteScroll>
  );
};
export default GameLists;
