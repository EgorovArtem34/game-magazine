import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import Loader from './Loader.jsx';
import { selectors, fetchGames } from '../slices/gamesSlice.js';

const EmptyGameList = () => (
  <div className="empty flex-container">
    No games are currently available. Please try again later
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
            id, name, rating, released, slug,
          } = game;
          return (
            <Link to={`/game/${slug}`} key={id} className="card">
              <div
                className="bg-img"
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
            </Link>
          );
        })}
      </div>
    </InfiniteScroll>
  );
};
export default GameLists;
