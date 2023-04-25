import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import routes from '../routes';

const GameLists = () => {
  const [gameList, setGameList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchData = useCallback(async () => {
    const sizePage = 12;
    const { data: { results } } = await axios.get(routes.allGame(sizePage, page));
    if (results.length > 0) {
      if (!hasMore) {
        setHasMore(true);
      }
      setGameList([...gameList, ...results]);
      setPage(page + 1);
    } else {
      setHasMore(false);
    }
  }, [gameList, hasMore, page]);

  useEffect(() => {
    if (gameList.length === 0) {
      fetchData();
    }
  }, [fetchData, gameList.length]);

  return (
    <InfiniteScroll
      dataLength={gameList.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <div className="cards">
        {gameList.map((game) => {
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
